/* 
* Panda Syntax Highlighter
* Created by LGforum @ AvacWeb (avacweb.com)
* AvacWeb Copyright 2011-2012
* All Right Reserved.
* No unauthorized distrubution or copying.
*/
(function(){
	var panda = {
		store: {comments:{}, strings:{}}, //stores things stripped out.
		code : null
	};
	
	panda.js = {
		reserved :  { 'var':1,'function':1,'return':1,'if':1,'else':1,'while':1,'do':1,'this':1,'new':1,'typeof':1, 'for':1},
		custom : {
			'document' : 'pandaOther',
			'window' : 'pandaOther',
			'null' : 'pandaOther',
			'false' : 'pandaOther',
			'true' : 'pandaOther',
			'Array' : 'pandaFunc',
			'RegExp' : 'pandaFunc',
			'Object' : 'pandaFunc'
		},
		addCustom: function(name, cn) { //public API for adding custom words. 
			this.custom[name] = cn;
		}
	};
	
	function spanWrap(cn, text) {
		return '<span class="'+cn+'">'+text+'</span>';
	};
	
	function swapInts(code) { //swaps all "safe-to-swap" ints in a code. Avoiding our replacement alias's.
		return code.replace(/\W(?!_\d+_)(\d+)(?!\d+#)/g, function(n, d) {
			return n.replace(d,  spanWrap('pandaInt', d) );
		});
	};
	
	function swapOperators(code) {
		return code.replace(/(&&|==|!==?|\|\|)/g, function(m) { return spanWrap('pandaOperator', m); });
	};
	
	//replaces special words such as 'var' and 'function' etc. Avoids it in variable names such as var myfunction;
	function parseSpecial(code, word, cn) {
		return code.replace(RegExp('(\\W)'+word+'(\\W)', 'g'), function(c) {
			return c.replace(word, spanWrap(cn, word) );
		});
	};
	
	//this ugly mess switches escaped quotes out of strings, so they aren't confused as the end of the string.
	function loseEscapes(code, uid) {
		return code.replace(/\\(['"])/g, function(s, c) {
   			var type = (c == '"') ? 'd' : 's'; //s = single, d = double. Used for when returning back into code.
   			return '#escape_'+type+'_'+uid+'#'; //ugly replacement, which can't be replicated in the code.
		});
	};
	
	function restoreEscapes(code, uid) {
		code = code.replace( new RegExp('#escape_d_'+uid+'#', 'g'), '\\"');
		code = code.replace( new RegExp('#escape_s_'+uid+'#', 'g'), "\\'");
		return code;
	};

	panda.start = function(node) {
		if(this.code) this.end();
		//use the time as a unique id. This way it can't be confused with anything in the actual code.
		this.uid = (new Date()).getTime();	
		this.code = node.innerHTML;
		this.node = node;
		return this;
	};
	
	panda.strip = function(code) {
		var uid = this.uid, count = 0, commentCount = 0;
		code = loseEscapes(code, uid);
		
		//first strip comments. Because comments can contain anything.
		code = code.replace( /([^:]|^)\/\/(?:.(?!\<br\s?\/?\>|\n))+./g, function(comment) {
			var key = '#comment_'+(commentCount++)+'_'+uid+'#';
			var firstChar = comment.charAt(0); //this prevents comments in URLs http://incorrect comment...
			if(firstChar != '/') {
				comment = comment.substr(1);
			}
			else {
				firstChar = '';
			}
			panda.store.comments[ key ] = comment;
			return firstChar + key;
		});
		
		code = code.replace( /\/\*(?:[\s\S](?!\*\/))*.\*\//g, function(comment) { 
			var key = '#comment_'+(commentCount++)+'_'+uid+'#';
			panda.store.comments[ key ] = comment;
			return key;
		});

		code = code.replace(/'[^']*'|"[^"]*"/g, function(string) {  //now strip out strings.
  			var key = '#string_'+(count++)+'_'+uid+'#';
  			panda.store.strings[ key ] = string;
  			return key;
		});
		return code;
	};
	
	//returns all stripped content.
	panda.returnStore = function(code) {
		var uid = this.uid, 
		store = this.store;
		
		for(var str in store.strings) {
			code = code.replace(str, spanWrap('pandaString', store.strings[str]) );
		}
		
		for(var com in store.comments) {
			var full = store.comments[com];
			full = full.split(/(?:\<br\s?\/?\>|\n)/).join('</span><br /><span class="pandaComment">'); //prevents invalid nesting
			code = code.replace(com, spanWrap('pandaComment', full) );
		}
		return restoreEscapes(code, uid);
	};
	
	panda.js.parse = function(node) {
		if(!this.code) panda.start(node);		
		var code = panda.code,
		reserved = panda.js.reserved,
		custom = panda.js.custom,
		uid = panda.uid; 

		code = panda.strip(code); //strip things.
		code = code.replace(/([=\.\[\]])/g, '<span class="pandaReserved">$1</span>'); //Nice to have = . [ and ] colored.
		code = swapInts(code); //swap all the ints
		code = swapOperators(code);
		for(var word in reserved) {
			code = parseSpecial(code, word, 'pandaReserved');
		}
				
		for(var word in custom) {
			code = parseSpecial( code, word, custom[word]);
		}
		return panda.returnStore(code);
	};
	
	//insert the colored html into the code block.
	panda.insert = function(code, node, lines) {
		if(lines) code = addLines(code);	
		node.innerHTML = code;
		panda.end(); 
	}
	
	function addLines(code, html) {
		return '<ol class="pandaCode"><li>'+code.split(/(?:\<br\s?\/?\>(?!\<\/span\>)|\n)/).join('</li><li>')+'</li></ol>';
	};
	
	panda.end = function() {
		this.code = null;
		this.node = null;
		this.store = {strings:{}, comments:{}};
	};
	
	panda.html = {
		parse : function(node) {
			if(!this.code) panda.start(node);		
			var code = panda.code,
			uid = panda.uid,
			comments = {},
			count = 0;
			
			code = loseEscapes(code, uid);
			code = code.replace(/&lt;!?--(?:.(?!--&gt;|--\>))*.(?:--&gt;|--\>)/g, function(comment) { //strip html comments.
				var key = '#comment_'+(count++)+'_'+uid+'#';
				comments[ key ] = comment;
				return key;
			});
			
			//tackle all tags.
			code = code.replace(/&lt;(?:.(?!&gt;|\>))+.(?:&gt;|\>)/g, function(tag) {
				if(/^&lt;\/?a(\s|\>|&gt;)/.test(tag)) {
					tag = tag.replace(/"[^"]+"|'[^']+'/g, function(attr) {
						return spanWrap('pandaTag', attr);
					});
					return spanWrap('pandaAnchor', tag);
				}
				return spanWrap('pandaTag', tag);
			});
			
			for(var c in comments) { //add back comments.
				code = code.replace(c, spanWrap('pandaComment', comments[c]) );
			}
			return restoreEscapes(code, uid);	
		}
	};
	
	panda.css = {
		parse : function(node) {
			if(!this.code) panda.start(node);		
			var code = panda.code,
			uid = panda.uid; 

			code = panda.strip(code); //strip things that shouldn't change
			code = code.replace(/[^\{\}]+\{/g, function(sel) { //colors selectors whilst maintaining valid nesting.
				return sel.replace(/(.*(?:\<br\s?\/?\>|\n))*(.+)/, '$1<span class="pandaOther">$2</span>');
			});

			code = code.replace(/([\{\}]|:(?!\w))/g, '<span class="pandaFunc">$1</span>');
			return panda.returnStore(code);	
		}
	};
	
	//general function used for parsing a code block. type = 'js|'html'|'css' node = code element, lines = bool lines or not.
	panda.parse = function(type, node, lines) {
		var code = panda[type].parse(node);
		panda.insert(code, node, lines);
		panda.end();
	};
	
	if (typeof module === 'object' && typeof module.exports === 'object') { 
		module.exports = panda; 
	}
	else {
		window.panda = panda;
	}
})();

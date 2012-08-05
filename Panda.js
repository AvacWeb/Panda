/**
 * Panda.js
 * Extendable Client side syntax highlighter core javascript and API. No languages included.
 *
 * Copyright 2011-2012 AvacWeb (avacweb.com)
 * Released under the MIT and GPL Licenses.
 */ 
(function(){
	var panda = {
		lineNumbering : true, //set to false to disable adding line numbers.
		//When a code box has been identified, it is saved as a property of the node
		//set this to false to disable that if your codeboxes are likely to change.
		cacheIdentity : true, 
		languages : [],
		regex : {
			comment1 : /\/\/[^\n]*/g,
			comment2 : /\/\*(.|[\n\r])*?\*\//gm,
			comment3 : /#[^\n]*(?=\n|$)/g,
			string : /(['"])(?:\\?.)*?\1/g,
			operators : /(?:(!|=)?==?)|(?:\|\|)|[\-\+\>\/\*%]|&(amp;)?&(amp;)?/g,
			extra : /[:\{\}\[\]\(\)]/g //can't include ';' because it can be in entity and we risk ruining the html.
		}
	};
	
	//swap all BR elements into new lines. Makes it easier imo. 
	function brSwap(code, dir) {
		return dir ? code.replace(/\n/g, '<br/>') : code.replace(/\<br\s?\/?\>/gi, '\n');
	};
	
	//wrap text in SPAN tags with a classname.
	function spanWrap(cn, text) {
		//clapanda? We give it this attribute, instead of 'class' because 'class' is a keyword in a lot of languages. 
		//clapanda is then replaced with class at the end.
		return '<span clapanda="' + cn + '">' + text + '</span>';
	};
	
	//replaces special words such as 'var' and 'function' etc. Avoids it in variable names such as var myfunction;
	function parseSpecials(code, arr, cn) {
		return code.replace(RegExp('\\b(?:' + arr.join('|') + ')\\b', 'g'), function(c) {
			return spanWrap(cn, c);
		});
	};
	
	//mini parse function for internal regexps.
	function quickParse(name, obj, code) {
		for(var r in obj) code = code.replace(obj[r], function(c) { return spanWrap(name + '-' + r, c); });
		return code;
	};
	
	//parse function parses a string of text for any of the set up languages above.
	panda.parse = function(type, code) {
		var codeObj = panda[type];
		if(!codeObj) return code;
		var matchers = codeObj['matchers']
		, keywords = codeObj['keywords']
		, specials = codeObj['specials']
		, uid = (new Date()).getTime() //unique ID for our replacements. 
		, store = {}
		, code = brSwap( code ).replace(/\</g, '&lt;').replace(/>/g, '&gt;');  //clean code
		
		for(var i = 0, m = matchers[0], count = 0; m; m = matchers[ ++i ]) {
			var r = this.regex[ m ]
			, key = '#' + m + '_' + uid + '_'
			, hold = store[ m ] = {}
			, innerRegex = false //internal parsing. Eg, parsing attributes inside html tags.
			if(!r) continue;
			if(r.inner) {
				innerRegex = r.inner;
				r = r.outer;
			}
			
			code = code.replace(r, function( c ) {
				var alias = key + count++ + '_' + (r.multiline ? 'm_' : '') + '#'; //creates a swap like #regex_uid_1#
				if(innerRegex) c = quickParse('panda-'+m, innerRegex, c);
				hold[ alias ] = c;
				return alias;
			});
		};
		
		if(keywords.length) code = parseSpecials(code, keywords, 'panda-keyword');
		if(specials.length) code = parseSpecials(code, specials, 'panda-special');
		
		for(i = matchers.length; i; i--) {
			var m = matchers[ i - 1 ], stripped = store[ m ];			
			for(var stripKey in stripped) {
				var s = stripped[ stripKey ];
				if(stripKey.indexOf('_m_#')) s = s.replace(/\n/g, '</span>\n<span clapanda="panda-' + m + '">');
				code = code.replace( stripKey, spanWrap('panda-'+m, s) );
			}
		};
		
		code = code.replace(/ /g, '&nbsp;').replace(/&nbsp;clapanda=/g, ' class='); //this is ugly, but it prevents class keyword messing things up.
		if(this.lineNumbering) code = '<ol class="pandaCode"><li>' + code.split(/\n/).join('</li><li>') + '</li></ol>';
		return brSwap( code.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;') , 1);
	};
	
	panda.colorNode = function(node) {
		var type = node.pandaType || panda.identify( node );
		if(!type) return;
		if(panda.cacheIdentity) node.pandaType = type;
		node.className = node.className ? node.className + ' panda-code' : 'panda-code';
		node.innerHTML = panda.parse(type, node.innerHTML);
	};
	
	panda.identify = function(node) {
		if(node.pandaType) return node.pandaType;
		var reg = /(?:\s|^)panda_(\w+)(?:\s|$)/;
		if( reg.test( node.className ) ) return reg.exec(node.className)[1]; //test classname for panda_lang class
		var scores = {}, regex = panda.regex, code = node.innerHTML, langs = panda.languages;
		
		for(var r in regex) {
			//skip these, they don't really help identify a language.
			if(r == 'extra' || r == 'operators' || r == 'string') continue; 
			scores[r] = (code.match( regex[r] ) || []).length; //find total matches for all the machers
		}
		
		for(var i = 0, l = langs.length, winner = 0, winning_lang = null; i<l; i++) {
			var total = 0, lang = panda[ langs[i] ];
			for(var j = 0, k = lang.matchers.length; j<k; j++) total += (scores[ lang.matchers[j] ] || 0);
			//total up occurences of keywords.
			total += (code.match(RegExp('\\b('+lang.keywords.join('|')+')\\b')) || []).length;
			if(total > winner) {
				winner = total;
				winning_lang = langs[i];
			} 
		};
		return winning_lang;
	};
	
	panda.addSpecials = function(lang, words) {
		this.addKeywords(lang, words, true);
	};
	
	panda.addKeywords = function(lang, words, specials) {
		if(lang in panda) {
			for(var i = 0, l = words.length; i<l; i++) panda[lang][ specials ? 'specials' : 'keywords' ].push( words[i] );
		}
	};
	
	panda.addLang = function(name, obj) {
		if('matchers' in obj) {
			var n = panda[name] = {};
			panda.languages.push( name );
			n.matchers = typeof obj.matchers == 'string' ? obj.matchers.split(' ') : obj.matchers;
			n.specials = (typeof obj.specials == 'string' ? obj.specials.split(' ') : obj.specials) || [];
			n.keywords = (typeof obj.keywords == 'string' ? obj.keywords.split(' ') : obj.keywords) || [];
			if(obj.regex && typeof obj.regex == 'object') {
				for(var i in obj.regex) panda.regex[ i ] = obj.regex[ i ];
			}
		}
	};
	
	if (typeof module === 'object' && typeof module.exports === 'object') { 
		module.exports = panda; 
	}
	else {
		window.panda = panda;
	}
})();
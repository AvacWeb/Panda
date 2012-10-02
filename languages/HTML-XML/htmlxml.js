//Panda Syntax Highlighter - HTML/XML Language Add On
(function(p) {
	if(!p) return;
	var obj = {
		matchers : 'xmlcomment htmltag',
		specials : [],
		keywords : [],
		regex : {
			xmlcomment : /&lt;!--.*?--(?:&gt;|>)/g,
			htmltag : {
				outer : /&lt;\/?.+?(?:&gt;|\>)/g,
				inner : {
					attribute : /(['"])(?:\\?.)+?\1/g
				}
			}
		}
	};
	p.addLang('xml', obj);
	obj.regex.htmltag.inner.special = /&lt;\/?(?:head|html|body|a|script|meta|link).*?&gt;/g;
	p.addLang('html',  obj);
})(window.panda);

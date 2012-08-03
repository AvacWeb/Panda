//Panda Syntax Highlighter - HTML/XML Language Add On
(function(p) {
	if(!p) return;
	var obj = {
		matchers : 'xmlcomment attribute attributevalue htmltag',
		specials : [],
		keywords : [],
		regex : {
			xmlcomment : /&lt;!--.*?--(?:&gt;|>)/g,
			htmltag : /&lt;\/?.+?(?:&gt;|\>)/g,
			attribute : /\b[\w\d\-]+(?==["'].*?['"])/g,
			attributevalue : /\B(["'])(?:\\?.)+\1(?=[^>]*?(?:>|&gt;))/g
		}
	}
	p.addLang('xml', obj);
	obj.regex.htmlspecial = /&lt;\/?(?:head|html|body|a|script|meta|link).*?(?:&gt;|\>)/g;
	obj.matchers = 'xmlcomment attribute attributevalue htmlspecial htmltag'
	p.addLang('html',  obj);
})(window.panda);
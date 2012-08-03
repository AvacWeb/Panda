//Panda Syntax Highlighter - CSS Language Add On
(function(p) {
	if(!p) return;
	p.addLang('css', {
		matchers : 'comment2 string selector cssproperty important',
		specials : [],
		keywords : [],
		regex : { 
			selector : /[^\{\}]+?(?=\s*?\{)/g,
			important : /!important(?=\s*(?:;|\}|\n))/gi,
			cssproperty : /\b[\w\d\-]+(?=\s*?:)/g
		}
	});
})(window.panda);
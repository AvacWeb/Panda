//Panda Syntax Highlighter - CSS Language Add On
(function(p) {
	if(!p) return;
	p.addLang('css', {
		matchers : 'comment2 string selector important extra',
		specials : [],
		keywords : [],
		regex : { 
			selector : /[^\{\}]+?(?=\s*\{)/g,
			important : /\B!important(?=\W)/g
		}
	});
})(window.panda);
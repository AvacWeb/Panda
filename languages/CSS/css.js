//Panda Syntax Highlighter - CSS Language Add On
(function(p) {
	if(!p) return;
	p.addLang('css', {
		matchers : 'comment2 string selector cssproperty cssunit important',
		specials : [],
		keywords : [],
		regex : { 
			selector : {
				outer: /[^\{\}]*?(?=\{)/gm,
				inner : {
					pseudo : /:[\w-]+(?:\(.*?\))?\b/g,
				}
			},			
			important : /!important(?=\s*(?:;|\}|\n))/gi,
			cssproperty : /\b[^\n]+(?=:)/g,
			cssunit : /\b\d+(?:\.\d+)?(ex|p[xct]|%|[cme]m|in)\b/gi
		}
	});
})(window.panda);

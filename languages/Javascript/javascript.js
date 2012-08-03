//Panda Syntax Highlighter - Javascript Language Add On
(function(p) {
	if(!p) return;
	p.addLang('js', {
		matchers : 'comment1 comment2 string regexp operators extra',
		specials : 'document window Array RegExp Object Math String Number Date Function Boolean',
		keywords : 'var function return if else while do this new typeof for null false true try catch break continue throw delete',
		regex : { 
			regexp : /\/(\\\/|.)*?\//g 
		}
	});
})(window.panda);
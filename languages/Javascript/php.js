// Panda Syntax Highlighter - PHP Language Add on
(function(p) {
	if(!p) return;
	p.addLang('php', {
		matchers : 'comment3 comment2 comment1 multiLineString phpvar phptag operators extra',
		specials : 'require include int array float list range floor ceil sqrt',
		keywords : 'global echo var function private public static if else elseif return while do this new class typeof for foreach as null false true',
		regex : {
			phptag : /(?:&lt;\?(?:php)?)|(?:\?(?:>|&gt;))/g,
			multiLineString : /(["'])(\\?.)*?\1/gm,
			phpvar : /\$+[\w\d_]+(?=\W)/g
		}
	});
})(window.panda);
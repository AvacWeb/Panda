//Panda Syntax Highlighter - SQL Language Add- on
(function(p){
	if(!p) return;
	p.addLang('sql', {
		keywords : 'select SELECT DELETE delete UPDATE update SET set FROM from WHERE where AND and OR or INSERT INTO insert into DROP CREATE INDEX drop create index ALTER alter AS as',
		specials : 'DISTINCT distinct ASC asc DESC desc DATABASE database TABLE table LIMIT',
		matchers : 'comment3 string sqlstring operators',
		regex : {
			sqlstring : /`[^`]+`/g
		}
	});
	p.addKeywords('sql', ['GROUP BY', 'group by', 'ORDER BY', 'order by']);
})(window.panda);

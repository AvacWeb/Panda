//Panda Syntax Highlighter - SQL Language Add- on
(function(p){
	if(!p) return;
	p.addLang('sql', {
		keywords : 'select SELECT DELETE delete UPDATE update SET set FROM from WHERE where AND and OR or INSERT INTO insert into DROP CREATE INDEX drop create index ALTER alter AS as',
		specials : 'DISTINCT distinct ASC asc DESC desc DATABASE database TABLE table',
		matchers : 'comment3 string sqlstring sqllimit operators',
		regex : {
			sqlstring : /`[^`]+`/g,
			sqllimit : {
				outer : /LIMIT\s+\d+(?:,\s*\d+)?/gi,
				inner : {
					int : /\d+/g
				}
			}
		}
	});
	p.addKeywords('sql', ['GROUP BY', 'group by', 'ORDER BY', 'order by']);
})(window.panda);
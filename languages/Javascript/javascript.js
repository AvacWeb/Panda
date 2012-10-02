//Panda Syntax Highlighter - Javascript Language Add On
(function(p) {
	if(!p) return;
	p.addLang('js', {
		matchers : 'string comment1 comment2 JSglobal regexp operators extra',
		specials : 'Array RegExp Object Math String Number Date Function Boolean charAt charCodeAt concat fromCharCode indexOf lastIndexOf match replace search slice split substr substring toLowerCase toUpperCase valueOf join pop push reverse shift slice sort splice toString unshift getDate getDay getFullYear getHours getMilliseconds getMinutes getMonth getSeconds getTime getTimezoneOffset getUTCDate getUTCDay getUTCFullYear getUTCHours getUTCMilliseconds getUTCMinutes getUTCMonth getUTCSeconds getYear parse setDate setFullYear setHours setMilliseconds setMinutes setMonth setSeconds setTime setUTCDate setUTCFullYear setUTCHours setUTCMilliseconds setUTCMinutes setUTCMonth setUTCSeconds setYear toDateString toGMTString toISOString toJSON toLocaleDateString toLocaleTimeString toLocaleString toString toTimeString toUTCString UTC abs acos asin atan atan2 ceil cos exp floor log max min pow random round sin sqrt tan toExponential toFixed toPrecision compile exec test decodeURI decodeURIComponent encodeURI encodeURIComponent escape eval isFinite isNaN parseFloat parseInt String unescape',
		keywords : 'break case catch continue default delete do else finally for function if in instanceof new return switch this throw try typeof var void while with null true false',
		regex : { 
			regexp : /\/(\\\/|.)*?\//g,
			JSglobal : /\b(?:document|window|navigator|screen)\b/gi
		}
	});
})(window.panda);



Panda Syntax Highlighter
===============================
According to Closure-Compiler: Size = 5KB, Compiled size = 3KB. Woop!

This is my first ever syntax highlighter, it seems to be working nicely. Panda will highlight Javascript, HTML or CSS and provide (optionally) line numbers too. Panda is simple to use and can be used as a jQuery plug-in too (see near bottom). 

```javascript
panda.parse('js', node, true);
```

API
-------------
The Panda object contains a lot of methods which you won't need, pretty much all you'll need are the parse method, the parse method within the sub-objects and also the insert method. 

First off, you'll need to grab a code block anyway you choose, either via jQuery, another selector engine or a variety of other methods. This code block can be passed to the parse methods of each sub-object of panda. 
```javascript
var code = panda.js.parse( code_element_node );
//or for html: panda.html.parse( node );
//or for css: panda.css.parse( node );
```
This will return the new HTML to go inside the code block which will be colored. You can then insert it using `panda.insert`
```javascript
panda.insert(code);
```
You should choose to use the insert method rather than node.innerHTML = result, because the insert method takes care of certain internal things which should be emptied before parsing the next code block. The insert method, takes an optional second parameter which should be true if you want to add line numbers to your code block. 
```panda.insert(code, true);```


#### The easy way - panda.parse
Next is the easy way that will take care of everything for you. The parse method. It takes three parameters, the first being a string, either 'html', 'css', or 'js'. The second parameter should be the code element to parse, and the third parameter is optional, and should be true if you wish to add line numbering.

Parsing Javascript with no line numbers:
```javascript
var code = document.getElementsByTagName('code')[0];
panda.parse('js', code);
```

Parsing CSS with line numbers:
```javascript
var code = document.getElementsByTagName('code')[0];
panda.parse('css', code, true);
```
__Simple eh?__

#### Adding more reserved words to the JS parser.
Panda does offer a simple method for adding more reserved words. The first parameter should be the word, and the second parameter should be the classname you wish to give it (SO you can color it).
```javascript
panda.addCustom('Array', 'pandaOther')
```

Panda CSS  
------------------------------------    
Obviously, for things to look colored, you'll need this bit of CSS. I didn't fancy making a new file for this, so here it is. This is obviously fully editable to match whatever colors you feel like. 
```css
/* panda Syntax Coloring */
.pandaReserved, .pandaTag {
  color: #00009E;
}
.pandaString, .pandaAnchor {
  color: green;
}
.pandaOther {
  color: #DA0034;
}
.pandaInt {
  color: red;
}
.pandaComment {
  color: #999;
}
.pandaFunc {
  color : #0CC;
}
```

Panda jQuery Plug-In
---------------------------------
For those that like things to be even easier, after adding Panda src to your site, you can also add it a jQuery plug in.
```javascript
$.fn.panda = function(lines) {
	var reg = /.*panda_(css|js|html).*/;
	this.each(function(elem) {
		if(elem.className && reg.test(elem.className) && elem.nodeName == 'code') {
			panda.parse(elem.className.replace(reg, '$1'), elem, lines);
		}
	});
	return this;
};
$(function(){ $('code').panda(true); });
```
Then its as simple as giving your code blocks either the classname of 'panda_css', 'panda_js' or 'panda_html' , pretty self explanatory. 

__Enjoy__



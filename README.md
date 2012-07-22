Panda Syntax Highlighter
===============================
According to Closure-Compiler: Size = 5KB, Compiled size = 3KB, GZipped = 1.5KB.

* [Using Panda](#using-panda)
* [Styling Panda](#styling-panda)
* [jQuery Panda](#jquery-panda)
* [Adding to Panda](#adding-to-panda)
* [Add SQL to Panda](#add-sql-to-panda)

Intro
----------------
__Panda is a tiny but powerful syntax highlighting tool with the ability to easily add new languages.__

This is my first ever syntax highlighter so any tips or improvements are welcome. 
**Panda** can be used for adding line numbers to code blocks and comes equipped with the ability to highlight Javascript, HTML, CSS and PHP. 

**Panda** can also be used with jQuery to let jQuery do everything for you. 

```javascript
panda.colorNode( codeElement );
```


Using Panda
----------------------------

#### Coloring a block of code.
To color a code block or element you should first give the element a classname in this format: 'panda_language'. 
* For Javascript: 'panda_js'
* For CSS : 'panda_css'
* For HTML : 'panda_html'
* For PHP : 'panda_php'
* For Custom : 'panda_customName'

This is recommended, but optional. This tells **Panda** what language is in the code box, however, if you do not specify one of these classnames __Panda can identify the code__.

The `colorNode` method will then color it for you, replacing the innerHTML property.

```javascript
panda.colorNode( codeElement );
```
Note: this will wrap code blocks in a PRE tag if it is not already to keep spacing and layout correct.

#### Parsing HTML
The `parse` method deals with parsing a string of HTML and adding the SPAN elements at the correct places. This method is used internally when coloring a code block, but it can also be used for external use too, for such things like parsing code in textboxes. 

The method takes two parameters, the language to parse, and the string of code. A new string of HTML will be returned with line numbers and span elements included. 

Parsing CSS:
```javascript
panda.parse('css', '#select { display: none }');
```
__Simple eh?__


Styling Panda
------------------------------------    
The SPAN tags inside the Panda'd code do not contain a color in a style attribute, in order to make them colored you will need to declare a color property for them in your CSS. This allows for much more freedom of how you would like your code to look and making it match your site.

Here's some default CSS to install to get going:
```css
/* panda Syntax Coloring */
.panda-string2, .panda-string1, .panda-multLineString1, .panda-multiLineString2, .panda-attribute {
	color: #C03;
}
.panda-special, .panda-htmlspecial, .panda-phptag, .panda-selector {
	color: #09F;
}
.panda-keyword, .panda-operators, .panda-htmltag, .panda-extra {
	color: #009;
}
.panda-regex, .panda-phpvar {
	color: #C09;	
}
.panda-comment1, .panda-comment2, .panda-comment3, .panda-comment4 {
	color: #666;
	font-style: italic;
}
ol.pandaCode li {
	padding: 1px;
	border-left: 1px solid green;
}
```

#### ClassNames to use
Here's a list of the classNames used and what they correspond to:
* panda-string1 - Strings wrapped with double quotes. "example"
* panda-string2 - Strings wrapped in single quotes. 'Example'
* panda-multiLineString1 - Strings wrapped in double quotes in languages that allow line breaks in strings. 
* panda-multiLineString2 - Strings wrapped in single quotes in languages that allow line breaks in strings. 
* panda-attribute - HTML attribute. Just the word. eg class, href. Not class="word"
* panda-special - Words considered "special", eg. document in JS
* panda-htmlspecial - special HTML tags. head, html, meta, script, a, body
* panda-phptag - PHP Tags <?php and ?> and <?
* panda-selector - The selector in CSS cod
* panda-keyword - Those considered keywords eg. if, else, for, while
* panda-operators - includes: !=, !==, ==, =, ===, ||, -, *, +, %, >, <, /
* panda-htmltag - HTML tags in HTML code.
* panda-extra - Includes: :, {, }, [, ], (, )
* panda-regex - A regular expression in the format /reg/
* panda-phpvar - A PHP style variable. $var
* panda-comment1 - A comment in the format: //comment
* panda-comment2 - A comment in the format: /* multiple line comment */
* panda-comment3 - A comment in the format: # comment
* panda-comment4 - A HTML/XML comment: <!-- comment -->

In addition, the OL element that creates the lines has a classname of 'pandaCode'. 


jQuery Panda
---------------------------------
For those that like things to be even easier, if you have jQuery, you can add this snippet to get things going automatically.
```javascript
$(function() {
	$('code').each(panda.colorNode);
});
```
Remember to give your codeblocks a `panda_lang` className to help speed things along.

__Enjoy__


Adding to Panda
---------------------------

#### Adding Keywords or Specials
You can add extra keywords and special words to a language using the `addKeyword` or `addSpecial` method.
```javascript
panda.addKeyword('js', 'in');
panda.addSpecial('js', 'indexOf');

panda.addSpecial('php', 'header');
```

#### Adding a new language
Panda is designed to make adding a new language very easy. Panda may be able to provide you with all you need but potentially you may need to have some knowledge of Javascript RegExp.

You add a new language using the `addLang` method. (Alternatively, developers can just as easily add one in the source very quickly, by following the comments in the code.)

It takes two parameters, the first should be a name for your language, for example: 'php', or 'sql' etc. This name should be your permanent reference to that language, for parsing, for classNames you give to code boxes (E.g if you name your new lang 'perl' then the code classname should be 'panda_perl'), and also for adding keywords and specials. 

The second should be an object containing at least 3 properties: matchers, keywords and specials. An optional 4th property, an object containing new needed RegExps. 

The keywords, matchers and specials property, should be either a string or an array. A string should have its values seperated by a space (eg. 'var if else' or ['var', 'if', 'else']).

The keywords property refers to keywords in the language, for Javascript this would be words such as 'if' 'else' 'var' 'for' etc. 

The specials property refers to special words in the language, not used as often as keywords, but should be highlighted. In JS this might be things like 'document' 'window' and native functions. 

The matchers property refers to which regex's from the following list below apply to this language and should be parsed.
For example, the matchers property for Javascript might be: `comment1 comment2 string1 string2 regex operators extra`. As these are all the things that apply to the Javascript language.

For languages that the multiLineString1 and multiLineString2 matchers apply to, I'd recommend not including string1 and string2, as the multiLine matchers include single line strings too.

The order can be important and may need to be altered at times. The order of the JS is as it is, because you want to parse comments before strings, so strings inside comments aren't colored. Strings are parsed before operators, to aviod operators inside strings being parsed, and so on.

The list of possible values:
* string1 - Strings wrapped with double quotes. "example"
* string2 - Strings wrapped in single quotes. 'Example'
* multiLineString1 - Strings wrapped in double quotes in languages that allow line breaks in strings. 
* multiLineString2 - Strings wrapped in single quotes in languages that allow line breaks in strings. 
* attribute - HTML attribute. Just the word. eg class, href. Not class="word"
* special - Words considered "special", eg. document in JS
* htmlspecial - special HTML tags. head, html, meta, script, a, body
* phptag - PHP Tags <?php and ?> and <?
* selector - The selector in CSS cod
* keyword - Those considered keywords eg. if, else, for, while
* operators - includes: !=, !==, ==, =, ===, ||, -, *, +, %, >, <, /
* htmltag - HTML tags in HTML code.
* extra - Includes: :, {, }, [, ], (, )
* regex - A regular expression in the format /reg/
* phpvar - A PHP style variable. $var
* comment1 - A comment in the format: //comment
* comment2 - A comment in the format: /* multiple line comment */
* comment3 - A comment in the format: # comment
* comment4 - A HTML/XML comment: <!-- comment -->

If the language your adding requires more Regular Expressions to be added to give yourself more of these "matcher" options, you should include a fourth property called 'regex', which should be an object containing a name for the key and a regex as the value. For example, if your adding ASP.net, you may need to add a RegExp for matching ASP tags. The key will be used to give the matching parts of the code a classname. In the example below a regex for asp tags is included with a key of 'aspTags', matching parts of the code will be given the className 'panda-aspTags', so you should remember to add this in the css. 

Now taking a look at the commented example below should help:
```javascript
panda.addLang('example', {
	matchers : 'comment1 string1 string 2 regex operators extra aspTags',
	keywords : 'dim for if else while to', //keywords in the language
	specials : ['server', 'write', 'response', 'request'] //could be array instead
	regex : {
		aspTags : /((<|&lt;)%)|(%(>|&gt;))/g
	}
});
```

Add SQL to Panda
----------------------------
Here's the necessary to call to `addLang` method to add SQL syntax highlighting to Panda:
```javascript
panda.addLang('sql', {
	keywords : 'select SELECT DELETE delete UPDATE update SET set FROM from WHERE where AND and OR or INSERT INTO insert into DROP CREATE INDEX drop create index ALTER alter AS as',
	specials : 'DISTINCT distinct ASC asc DESC desc DATABASE database TABLE table',
	matchers : 'comment3 string1 string2 operators'
});
panda.addKeyword('sql', 'GROUP BY');
panda.addKeyword('sql', 'group by');
panda.addKeyword('sql', 'ORDER BY');
panda.addKeyword('sql', 'order by');
```

Image Demo:
![Panda SQL](http://i40.servimg.com/u/f40/17/20/25/96/captur37.png)
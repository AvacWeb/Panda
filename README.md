Panda Syntax Highlighter
===============================
According to Closure-Compiler: Size = 5KB, Compiled size = 2.5KB, GZipped = 1.3KB.

* [Available Languages](#available-languages)   
* [Intro](#intro)
* [Installing Panda](#installing-panda)
* [Using Panda](#using-panda)
* [Styling Panda](#styling-panda)
* [Adding to Panda](#adding-to-panda)
* [Overview of the API](#an-overview-of-the-api)

Available Languages
-----------------------
* Javascript
* CSS
* HTML/XML
* PHP
* SQL
* Python
...and easily extendable


Intro
----------------
__Panda is a tiny but powerful syntax highlighting tool with the ability to easily add new languages and themes.__

This is my first ever syntax highlighter so any tips or improvements are welcome. 
It works best by giving your code block a classname of 'panda-lang', where 'lang' is the language name, for example: 'panda-html'.

```javascript
panda.onload(); //color all code blocks.

//OR

panda.colorNode( codeElement ); //color a single code element.
```

Installing Panda
---------------------------
To install Panda, simply include the Panda core Javascript on your site, and then add the languages you need from the languages directory.
Call the `panda.onload()` method in a DOMReady function, onload function or near the bottom of your page to color all code blocks. 

Be sure to include the default CSS, found ad `panda.css`, which is fully customizable to match your site. 


Using Panda
----------------------------

#### Specifying a Language
To specify to Panda what language is in a code block, you need to give that code element a classname of `panda-lang`, where "lang" is the name given to the language. 
* For a lanaguage given the name 'html' : 'panda-html'
* For a language named 'js' : 'panda-js' 
* etc etc...

This is recommended, but optional. The `colorNode` method will then color it for you, replacing the innerHTML property. 
Code blocks not given a classname to specify the language will be colored using the "default" language; strings, and keywords will be highlighted.

Example:
```javascript
var code = document.getElementsByTagName('code')[0];
code.className = 'panda-js';  //just assume we know it is javascript in the code box, and we named javascript 'js' to panda
panda.colorNode( code );
```

#### Parsing HTML
The `parse` method deals with parsing a string of HTML and adding the SPAN elements at the correct places. 
This method is used internally when coloring a code block, but it can also be used for external use too, for such things like parsing code in textboxes. 

The method takes two parameters, the language to parse, and the string of code. A new string of HTML will be returned with line numbers and span elements included. 

Parsing CSS:
```javascript
panda.parse('css', '#select { display: none }');
```

Styling Panda
------------------------------------    
The SPAN tags inside the Panda'd code do not contain a color in a style attribute, in order to make them colored you will need to declare a color property for them in your CSS. This allows for much more freedom of how you would like your code to look and making it match your site.

The classnames to use are dictated by the name of the regular expression which matches each item. When you look at languages in the language folder, the CSS file will be commented, so you know what each selector corresponds too. The Panda.css file is also commented like this too. 

In addition, the code block is given the classname `panda-code`, and if it does not have a `panda-lang` style classname it is given one of those too. Each LI element has the classname of `panda-line`.  


Adding to Panda
---------------------------

#### Adding Keywords or Specials to an existing language
__Keywords and Specials can only be "words", do not add symbols or operators using these methods. '_' and '-' are okay to use in these words.__

You can add extra keywords and special words to a language using the `addKeywords` or `addSpecials` methods.
```javascript
panda.addKeywords('js', ['in', 'for', 'var']);

panda.addSpecials('php', ['header', 'include', 'require']);
```

#### Adding a new language
Panda is designed to make adding a new language very easy. Panda may be able to provide you with all you need but potentially you may need to have some knowledge of Regular Expressions.
You add a new language using the `addLang` method.

It takes two parameters, the first should be a name for your language, for example: 'php', or 'sql' etc. This name should be your permanent reference to that language, for parsing, for classNames you give to code boxes (E.g if you name your new lang 'perl' then the code classname should be 'panda-perl'), and also for adding keywords and specials. 

The second should be an object containing at least 1 property: matchers. And optionally properties 'specials', 'keywords', and a 4th property, an object containing new needed RegExps. 

The keywords, matchers and specials property, should be either a string or an array. A string should have its values seperated by a space (eg. 'var if else' or ['var', 'if', 'else']). They should only contain word characters (A-Z) and underscore and hyphen.

The keywords property refers to keywords in the language, for Javascript this would be words such as 'if' 'else' 'var' 'for' etc. 

The specials property refers to special words in the language, not used as often as keywords, but should be highlighted. In JS this might be things like 'document' 'window' and native functions. 

The matchers property refers to which regex's from the following list below apply to this language and should be parsed.
For example, the matchers property for Javascript might be: `comment1 comment2 string operators extra`. As these are all the things that apply to the Javascript language and need to be used.

The order can be important and may need to be altered at times. The order of the JS is as it is, because you want to parse comments before strings, so strings inside comments aren't colored. Strings are parsed before operators, to aviod operators inside strings being parsed, and so on.

The list below shows what "matchers" are available in the panda core:
* string - Strings wrapped in either double or single quotes.
* multiLineString - Strings wrapped in quotes in languages that allow line breaks in strings. 
* operators 
* extra - Includes:  {, }, [, ], (, )
* comment1 - A comment in the format: //comment
* comment2 - A comment in the format: /* multiple line comment */
* comment3 - A comment in the format: # comment

If the language your adding requires more Regular Expressions to be added to give yourself more of these "matcher" options, you should include a property in the object called 'regex', which should be an object containing a name for the key and a regex as the value. For example, if your adding ASP.net, you may need to add a RegExp for matching ASP tags. The key will be used to give the matching parts of the code a classname. In the example below a regex for asp tags is included with a key of 'aspTags', matching parts of the code will be given the className 'panda-aspTags'.
```javascript
panda.addLang('asp', {
	matchers : 'comment1 string aspTags operators extra', //include aspTags in our matchers
	keywords : 'dim for if else while to', //keywords in the language
	specials : ['server', 'write', 'response', 'request'] //could be array instead
	regex : {
		aspTags : /((<|&lt;)%)|(%(>|&gt;))/g //our new regex and new matcher. 
	}
});
```

#### More specific Regexp's.
You can match more specific regex's by declaring some "internal" regular expressions. You do this, by making the property in the regex object an object containing 2 properties, outer and inner. For example if you want to match ID selectors inside of a CSS selector, you'd have your regex for matching a selector, and then some internal regular expressions which are matched against each selecotr match.
```javascript
regex : {
	selector : {
		outer : /[^\{\}]+?(?=\s*?\{)/g, //matches the selector part.
		inner : {
			id : /\b#[\w\d_-]+\b/g, //match an ID part inside the selector.
			class : /\b.[\d\w_-]+\b/g //match a class part inside the selector
		}
	}
}
```
These would be given the classname 'panda-selector-id' and 'panda-selector-class', while the selector part would still have the classname 'panda-selector'. 

An overview of the API 
---------------------------
#### panda.parse(string language, string code)
Returns new string of parsed HTML including the spans and line numbers. Can be insterted into any element, not just CODE elements.

#### panda.identify( DOMElement )
Identify a code block. Checks the classname of a code block and checks if a language has been specified, if not returns 'default'. 
```javascript
var code = document.getElementsByTagName('code')[0];
var newcode = panda.parse( panda.identify(code), code.innerHTML );
```
#### panda.colorNode( DOMElement )
Highlight a single DOMElement. Doesn't have to be a CODE block, can be anything. This method will replace the innerHTML property of the DOMElement and add the necessary classnames. 
```javascript
var code = document.getElementsByTagName('code')[0];
panda.colorNode( code );
```
#### panda.addSpecials(string language, array specials)
Used to add "specials" to an already installed language. You can use this to add to the default language. `panda.addSpecials('default', ['import']);`

#### panda.addKeywords(string language array keywords)
Use to add keywords to an already installed language. 

#### panda.addLang(string name, object configuration)
Used to extend Panda and add a new language. First parameter should be a name, second parameter an object literal, see "Adding to Panda". 

#### panda.onload()
Loops through and colors all code blocks. Should be called on DOMReady or window load and will sort everything for you. 

__The best way to learn how to add languages is looking at the JS in the languages folder__

![Panda SQL](http://i40.servimg.com/u/f40/17/20/25/96/captur37.png)

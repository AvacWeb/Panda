Panda Syntax Highlighter
===============================
According to Closure-Compiler: Size = 5KB, Compiled size = 3KB, GZipped = 1.5KB.

* [Available Languages](#available-languages)   
* [Intro](#intro)
* [Installing Panda](#installing-panda)
* [Using Panda](#using-panda)
* [Styling Panda](#styling-panda)
* [jQuery Panda](#jquery-panda)
* [Adding to Panda](#adding-to-panda)

Available Languages
-----------------------
* Javascript
* CSS
* HTML/XML
* PHP
* SQL


Intro
----------------
__Panda is a tiny but powerful syntax highlighting tool with the ability to easily add new languages.__

This is my first ever syntax highlighter so any tips or improvements are welcome. 

**Panda** can also be used with jQuery to let jQuery do everything for you. 

Panda is capable of identifying the language in a code block (limited to the languages you include) and parsing as needed. It works best by giving your code block a classname of 'panda-lang', where 'lang' is the language name, for example: 'panda-html'

```javascript
panda.colorNode( codeElement );
```

Installing Panda
---------------------------
To install Panda, simply make a Javascript file on your website, include the Panda core Javascript in that javascript file, and then after the Panda core add the languages you need from the languages directory. Include the script in the head of your page. If you require jQuery to take care of all your code blocks, then make sure you have jQuery installed on your site, and add the snippet from the 'jQuery Panda' section below.

Then you need to upload the CSS to your site, either add it to an existing stylesheet or download the one provided here and upload.


Using Panda
----------------------------

#### Coloring a block of code.
To color a code block or element you should first give the element a classname in this format: 'panda_language'. Where 'language' is the name given to the language. 
* For a lanaguage given the name 'html' : 'panda-html'
* For a language named 'js' : 'panda-js' 
* etc etc...

This is recommended, but optional. This tells Panda what language is in the code box so it does not have to identify it, this speeds up the process a lot, however, if you do not specify one of these classnames __Panda can identify the code__.

The `colorNode` method will then color it for you, replacing the innerHTML property.

```javascript
panda.colorNode( codeElement );
```

Example:
```javascript
var code = document.getElementsByTagName('code')[0];
//just assume we know it is javascript in the code box, and we named javascript 'js' to panda
code.className = 'panda-js';
panda.colorNode( code );
```

#### Parsing HTML
The `parse` method deals with parsing a string of HTML and adding the SPAN elements at the correct places. This method is used internally when coloring a code block, but it can also be used for external use too, for such things like parsing code in textboxes. 

The method takes two parameters, the language to parse, and the string of code. A new string of HTML will be returned with line numbers and span elements included. 

Parsing CSS:
```javascript
panda.parse('css', '#select { display: none }');
```

Styling Panda
------------------------------------    
The SPAN tags inside the Panda'd code do not contain a color in a style attribute, in order to make them colored you will need to declare a color property for them in your CSS. This allows for much more freedom of how you would like your code to look and making it match your site.

The classnames to use are dictated by the name of the regular expression with matches each item. When you look at languages in the language folder, the classnames and css will be provided and can be edited to your liking.

The Panda core does contain some regular expressions which will be used in most languages, here are the classnames you'll need for those:

Here's a list of the classNames used and what they correspond to:
* panda-string - A string in the code, either wrapped in single quotes or double.
* panda-special - Words declared as "specials" in a language.
* panda-keyword - Those considered keywords eg. if, else, for, while
* panda-operators - includes: !=, !==, ==, =, ===, ||, -, *, +, %, >, <, /, &&
* panda-extra - Includes: :, {, }, [, ], (, )
* panda-comment1 - A comment in the format: //comment
* panda-comment2 - A comment in the format: /* multiple line comment */
* panda-comment3 - A comment in the format: #comment

In addition, the OL element that creates the lines has a classname of 'pandaCode', and the colored node is given the classname of 'panda-code'.

jQuery Panda
---------------------------------
For those that like things to be even easier, if you have jQuery, you can add this snippet to get things going automatically.
```javascript
$(function() {
	$('code').each(function() { panda.colorNode(this); });
});
```
(why does jQuery pass the index first rather than DOMElement? ... Annoying. )

Remember to give your codeblocks a `panda_lang` className to help speed things along.

__Enjoy__


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
Panda is designed to make adding a new language very easy. Panda may be able to provide you with all you need but potentially you may need to have some knowledge of Javascript RegExp.

You add a new language using the `addLang` method.

It takes two parameters, the first should be a name for your language, for example: 'php', or 'sql' etc. This name should be your permanent reference to that language, for parsing, for classNames you give to code boxes (E.g if you name your new lang 'perl' then the code classname should be 'panda_perl'), and also for adding keywords and specials. 

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
* operators - includes: !=, !==, ==, =, ===, ||, -, *, +, %, >, <, /
* extra - Includes: :, {, }, [, ], (, )
* comment1 - A comment in the format: //comment
* comment2 - A comment in the format: /* multiple line comment */
* comment3 - A comment in the format: # comment

If the language your adding requires more Regular Expressions to be added to give yourself more of these "matcher" options, you should include a property in the object called 'regex', which should be an object containing a name for the key and a regex as the value. For example, if your adding ASP.net, you may need to add a RegExp for matching ASP tags. The key will be used to give the matching parts of the code a classname. In the example below a regex for asp tags is included with a key of 'aspTags', matching parts of the code will be given the className 'panda-aspTags'.

Now taking a look at the commented example below should help:
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

Example of Panda SQL:
--------------------------
![Panda SQL](http://i40.servimg.com/u/f40/17/20/25/96/captur37.png)
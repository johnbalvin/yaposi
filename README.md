# Yaposi, a markdown/LaTeX editor
### Online Example
* [normal](https://storage.googleapis.com/yaposi/example/online/normal/index.html)

* [module](https://storage.googleapis.com/yaposi/example/online/module/index.html)

### Installation
* If module:
```html
<head>
   <link rel="stylesheet" href="https://storage.googleapis.com/yaposi/release/0/yaposi.css">
 </head>
  <body>
  </body>
	<script type="module">
		import {Yaposi as Editor} from 'https://storage.googleapis.com/yaposi/release/0/yaposi.mjs'
		//continue in Usage
	</script>
 </body>
```
* If normal:
```html
<head>
   <link rel="stylesheet" href="https://storage.googleapis.com/yaposi/release/0/yaposi.css">
   <script defer src="https://storage.googleapis.com/yaposi/release/0/yaposi.js"></script>
  </head>
   <body>
  </body>
    <script>
		//continue in Usage
	</script>
 </body>
```

### Usage
```javascript
let editor=new Editor("katex","# hello world");
const domEditor=editor.getDom();
document.body.appendChild(domEditor);
```
* In this case instead of calling *Yaposi* we changed the name to be  *Editor*,  takes there parameters
  

   1. **LaTeX render name**: string
       * What LaTeX rendering to use, "katex" or "mathjax", for now it only works for katex, this is for   future compatibility.
	   
   2. **Initial markdown**: string
       * The initial markdown to use.

* Editor Dom element is at editor.me, but there is a issue with codemirror that you need to called refresh each time codemirror gets shown, you should see method **getDom()**

### New lines

* To add new lines you need to add icon &#128165;

💥💥💥💥


### Methods
 

* **GetMarkdown() → [string , string]**

 * GetMarkdown returns the markdown from editor, the first value is the raw markdown and the second one is the scaped markdown, it will scape &,<,>,",',`,/ and &#92; .

* **GetHTML() → [string , string]**

 * GetHTML returns the html rendered result of markdown, the first return value is the HTML and the the second one is the scaped HTML, it will scape &,<,>,",',`,/ and &#92; .

* **SetValue(string)**

 * SetValue sets the string value to the editor, the string should be the markdown.

* **getDom() → [Dom element]**

 * getDom returns the dom editor element, it is here only to fix codemirror issue, the most anoying for me was [issues/2469](https://github.com/codemirror/CodeMirror/issues/2469) , this method will be removed for future releases, when this issue gets solved.

### LaTeX

* You can add LaTeX by wrapping LaTeX content by  &#129370;{LaTeX}&#128036;,
  the LaTeX renderer is [katex](https://katex.org), in a future release
it will have suport for [mathjax](https://www.mathjax.org)

🥚
\displaystyle \frac{1}{\Bigl(\sqrt{\phi \sqrt{5}}-\phi\Bigr) e^{\frac25 \pi}} 
= 1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}} {1+\frac{e^{-6\pi}} {1+\frac{e^{-8\pi}} {1+\cdots} } } }
🐤

* To use it inline just write as inline 🥚x = {-b \pm \sqrt{b^2-4ac} \over 2a}🐤 as showed here.


* If you write it as new line, it will be in a new line.

🥚
f(x)=\int_{-\infty}^\infty
    \hat f(\xi)\,e^{2 \pi i \xi x}
    d\xi🐤
	
### Image
	
* for inline image just write as inline![Image 2][2]

* for a image to be in new line just put it in a new line. 

![Image 2][2]


![Image 1][1]

### License

Yaposi is licensed under the [MIT License](http://opensource.org/licenses/MIT)


[1]: https://images.unsplash.com/photo-1534653169071-4f036d137aca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=748&q=80 "random title" 

[2]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "random title" 
	
	

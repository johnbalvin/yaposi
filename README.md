# Yaposi, a markdown/LaTeX editor
### Online Example
* [normal](https://storage.googleapis.com/yaposi/example/fetching/normal/index.html)

* [module](https://storage.googleapis.com/yaposi/example/fetching/module/index.html)

### Installation
* If module:
```html
<head>
   <link rel="stylesheet" href="https://storage.googleapis.com/yaposi/release/1.1/yaposi.css">
 </head>
  <body>
  </body>
	<script type="module">
		import {Yaposi as Editor} from 'https://storage.googleapis.com/yaposi/release/1.1/yaposi.mjs'
		//continue in Usage
	</script>
 </body>
```
* If normal:
```html
<head>
   <link rel="stylesheet" href="https://storage.googleapis.com/yaposi/release/1.1/yaposi.css">
   <script defer src="https://storage.googleapis.com/yaposi/release/1.1/yaposi.js"></script>
  </head>
   <body>
  </body>
    <script>
		const Editor=Yaposi;
		//continue in Usage
	</script>
 </body>
```

### Usage
```javascript
const editor= new Editor("katex","# hello world");
let domEditor = editor.Start();
document.body.appendChild(domEditor);
```
* In this case instead of calling *Yaposi* we changed the name to be  *Editor*,  takes there parameters
  

   1. **LaTeX render name**: string
       * What LaTeX rendering to use, "katex" or "mathjax", for now it only works for katex, this is for   future compatibility.
	   
   2. **Initial markdown**: string
       * The initial markdown to use.

### Methods

 * **Start()**
  * builds dom element for editor; .

* **GetMarkdown() → [string , string]**
 * GetMarkdown returns the markdown from editor, the first value is the raw markdown and the second one is the scaped markdown, it will scape &,<,>,",',`,/ and &#92; .

* **GetHTML() → [string , string]**
 * GetHTML returns the html rendered result of markdown, the first return value is the HTML and the the second one is the scaped HTML, it will scape &,<,>,",',`,/ and &#92; .

* **SetValue(string)**

 * SetValue sets the string value to the editor, the string should be the markdown.

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

### New lines

* To add new lines you need to add icon &#128165;

💥💥💥

	
### Image
	
* for inline image just write as inline![Image 2][2]

* for a image to be in new line just put it in a new line. 

![Image 2][2]


![Image 1][1]

### License

Yaposi is licensed under the [MIT License](http://opensource.org/licenses/MIT)


[1]: https://images.unsplash.com/photo-1534653169071-4f036d137aca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=748&q=80 "random title" 

[2]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "random title" 
	
	

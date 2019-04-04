let Editor=Yaposi;

let textArea=document.querySelector("textarea");
let value=textArea.value.trimStart();//trim obligatory because spaces at beginning of text area may afect your result
let editor=new Editor("katex",value);  
textArea.remove()//no need text area anymore
document.body.appendChild(editor.getDom());
PR.prettyPrint(); //called if you have code in the markdown
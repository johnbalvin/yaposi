import {Yaposi as Editor} from '../../../../dist/yaposi.mjs';

let textArea=document.querySelector("textarea");
let value=textArea.value.trimStart();//trim obligatory because spaces at beginning of text area may afect your result
const editor=new Editor("katex",value);  
let domEditor = editor.Start();
textArea.remove()//no need text area anymore
document.body.appendChild(domEditor);
PR.prettyPrint(); //called if you have code in the markdown
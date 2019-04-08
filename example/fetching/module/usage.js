import {Yaposi as Editor} from 'https://storage.googleapis.com/yaposi/release/1/yaposi.mjs';


const editor=new Editor("katex","# fetching data.....");  
let domEditor= editor.Start();
document.body.appendChild(domEditor);


fetch("./README.md",{method:"GET"})
    .then((resp)=>{
        return resp.text()
    } )
    .then((markdown)=>{
        editor.SetValue(markdown);
    })
    .catch(err=>{
        console.log(err);
})
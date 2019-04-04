let Editor=Yaposi;
let editor=new Editor("katex","");  
document.body.appendChild(editor.getDom());

fetch("https://storage.googleapis.com/yaposi/README.md",{method:"GET"})
    .then((resp)=>{
        return resp.text()
    } )
    .then((markdown)=>{
        editor.SetValue(markdown);
    })
    .catch(err=>{
        console.log(err);
})
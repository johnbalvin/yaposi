//names should be in lower case becasue datasets atributes does not allow uppercase
export class Toolbar{
    constructor(codeMirrorTarget,editorWrapper){
        this.me ="";
        this.editorWrapper=editorWrapper;
        this.codeMirrorTarget=codeMirrorTarget;
        this.icons=this.iconsF();
        this.keyMaps= {
            "120" : {keyboard:"F9",handler:"watch"},
            "121" : {keyboard:"F10",handler:"preview"},
            "122" : {keyboard:"F11",handler:"fullscreen"}
        };
    }
    registerKeyMaps() {
        document.body.addEventListener("keydown",(event) =>{
            const key=event.keyCode;
            const item="";
            if(!(key in this.keyMaps)){
                return
            }
            const name=this.keyMaps[key].handler;
            for(let i=0,len=this.icons.length;i<len;i++){
                if(this.icons[i].Name==name){
                    item=this.icons[i];
                    break;
                }
            }
            if(item!=""){
                item.Func();
            }
        });
    }
    create(){     
        const lista=document.createElement("ul");
        lista.classList.add("yaposi-toolbar");
       for (let i=0,len=this.icons.length;i<len;i++){
            const icon = this.icons[i];
            const liTag=document.createElement("li");
            liTag.classList.add("icon");
            liTag.dataset.name=icon.Name;
            let add="";
            switch (icon.Img.Kind){
                case "text":
                    add=document.createElement("span");
                    add.textContent=icon.Img.Value;
                    add.classList.add("text");
                    break;
                case "svg":
                    let temp=document.createElement("template");
                    temp.innerHTML=icon.Img.Value;
                    add=temp.content.querySelector("svg");
                    add.classList.add("img");
                    break;
                case "img":
                    add=document.createElement("img");
                    add.src=icon.Img.Value;
                    add.classList.add("img");
                    break;    
                default:
                    console.log(`Error type: ${icon.Img.Kind}; Valid types: text, svg`);
                    continue       
            }
            if ("Title" in icon){
                liTag.setAttribute("title",icon.Title);
            }
            if ("Func" in icon){
                liTag.addEventListener("click",icon.Func);
            }
            liTag.appendChild(add);

            lista.appendChild(liTag);
        }
        this.me =lista;
        return lista
    }
    iconsF() {
        return [
            {
                Name:"undo",
                Title:"Undo",
                Img:{
                    Kind:"svg",
                    Value:`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0V0z"/>
                        <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L3.71 8.71C3.08 8.08 2 8.52 2 9.41V15c0 .55.45 1 1 1h5.59c.89 0 1.34-1.08.71-1.71l-1.91-1.91c1.39-1.16 3.16-1.88 5.12-1.88 3.16 0 5.89 1.84 7.19 4.5.27.56.91.84 1.5.64.71-.23 1.07-1.04.75-1.72C20.23 10.42 16.65 8 12.5 8z"/>
                        </svg>
                `},
                Func: ()=> {
                    this.codeMirrorTarget.undo();
                    this.codeMirrorTarget.focus();
                },
            },
            
            {
                Name:"redo",
                Title:"Redo",
                Img:{
                    Kind:"svg",
                    Value:`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0V0z"/>
                        <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.16 0-7.74 2.42-9.44 5.93-.32.67.04 1.47.75 1.71.59.2 1.23-.08 1.5-.64 1.3-2.66 4.03-4.5 7.19-4.5 1.95 0 3.73.72 5.12 1.88l-1.91 1.91c-.63.63-.19 1.71.7 1.71H21c.55 0 1-.45 1-1V9.41c0-.89-1.08-1.34-1.71-.71l-1.89 1.9z"/>
                        </svg>
                `},
                Func: ()=> {
                    this.codeMirrorTarget.redo();
                    this.codeMirrorTarget.focus();
                },
            },
           
            { 
                Name:"bold",
                Title:"Bold",
                Img:{
                    Kind:"svg",
                    Value:`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0V0z"/>
                        <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H8c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h5.78c2.07 0 3.96-1.69 3.97-3.77.01-1.53-.85-2.84-2.15-3.44zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>
                        </svg>
                `},
                Func: ()=> {
                    const cm        = this.codeMirrorTarget;
                    const cursor    = cm.getCursor();
                    const selection = cm.getSelection();
        
                    cm.replaceSelection("**" + selection + "**");
        
                    if(selection === "") {
                        cm.setCursor(cursor.line, cursor.ch + 2);
                    }
                    this.codeMirrorTarget.focus();
                },
            },
            
            { 
                Name:"del",
                Title:"Strikethrough",
                Img:{
                    Kind:"svg",
                    Value:`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M14.59 7.52c0-.31-.05-.59-.15-.85-.09-.27-.24-.49-.44-.68-.2-.19-.45-.33-.75-.44-.3-.1-.66-.16-1.06-.16-.39 0-.74.04-1.03.13s-.53.21-.72.36c-.19.16-.34.34-.44.55-.1.21-.15.43-.15.66 0 .48.25.88.74 1.21.38.25.77.48 1.41.7H7.39c-.05-.08-.11-.17-.15-.25-.26-.48-.39-1.03-.39-1.67 0-.61.13-1.16.4-1.67.26-.5.63-.93 1.11-1.29.48-.35 1.05-.63 1.7-.83.66-.19 1.39-.29 2.18-.29.81 0 1.54.11 2.21.34.66.22 1.23.54 1.69.94.47.4.83.88 1.08 1.43s.38 1.15.38 1.81h-3.01M20 10H4c-.55 0-1 .45-1 1s.45 1 1 1h8.62c.18.07.4.14.55.2.37.17.66.34.87.51s.35.36.43.57c.07.2.11.43.11.69 0 .23-.05.45-.14.66-.09.2-.23.38-.42.53-.19.15-.42.26-.71.35-.29.08-.63.13-1.01.13-.43 0-.83-.04-1.18-.13s-.66-.23-.91-.42c-.25-.19-.45-.44-.59-.75s-.25-.76-.25-1.21H6.4c0 .55.08 1.13.24 1.58s.37.85.65 1.21c.28.35.6.66.98.92.37.26.78.48 1.22.65.44.17.9.3 1.38.39.48.08.96.13 1.44.13.8 0 1.53-.09 2.18-.28s1.21-.45 1.67-.79c.46-.34.82-.77 1.07-1.27s.38-1.07.38-1.71c0-.6-.1-1.14-.31-1.61-.05-.11-.11-.23-.17-.33H20c.55 0 1-.45 1-1V11c0-.55-.45-1-1-1z"/>
                    </svg>
                `},
                Func: ()=> {
                    const cm        = this.codeMirrorTarget;
                    const cursor    = cm.getCursor();
                    const selection = cm.getSelection();
        
                    cm.replaceSelection("~~" + selection + "~~");
        
                    if(selection === "") {
                        cm.setCursor(cursor.line, cursor.ch + 2);
                    }
                    this.codeMirrorTarget.focus();
                }
            },
           
            {  
                Name:"italic",
                Title:"Italic",
                Img:{
                    Kind:"svg",
                    Value:`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0V0z"/>
                    <path d="M10 5.5c0 .83.67 1.5 1.5 1.5h.71l-3.42 8H7.5c-.83 0-1.5.67-1.5 1.5S6.67 18 7.5 18h5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-.71l3.42-8h1.29c.83 0 1.5-.67 1.5-1.5S17.33 4 16.5 4h-5c-.83 0-1.5.67-1.5 1.5z"/>
                    </svg>
                `},
                Func:()=> {
                    const cm        = this.codeMirrorTarget;
                    const cursor    = cm.getCursor();
                    const selection = cm.getSelection();
        
                    cm.replaceSelection("*" + selection + "*");
        
                    if(selection === "") {
                        cm.setCursor(cursor.line, cursor.ch + 1);
                    }
                    this.codeMirrorTarget.focus();
                }
            },
            
            {
                Name:"quote",
                Title:"Quote",
                Img:{
                    Kind:"svg",
                    Value:`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0V0z"/>
                    <path d="M7.17 17c.51 0 .98-.29 1.2-.74l1.42-2.84c.14-.28.21-.58.21-.89V8c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h2l-1.03 2.06c-.45.89.2 1.94 1.2 1.94zm10 0c.51 0 .98-.29 1.2-.74l1.42-2.84c.14-.28.21-.58.21-.89V8c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h2l-1.03 2.06c-.45.89.2 1.94 1.2 1.94z"/>
                    </svg>
                `},
                Func: ()=> {
                    const cm        = this.codeMirrorTarget;
                    const cursor    = cm.getCursor();
                    const selection = cm.getSelection();
        
                    if (cursor.ch !== 0){
                        cm.setCursor(cursor.line, 0);
                        cm.replaceSelection("> " + selection);
                        cm.setCursor(cursor.line, cursor.ch + 2);
                    }
                    else{
                        cm.replaceSelection("> " + selection);
                    }
        
                    this.codeMirrorTarget.focus();
                    //cm.replaceSelection("> " + selection);
                    //cm.setCursor(cursor.line, (selection === "") ? cursor.ch + 2 : cursor.ch + selection.length + 2);
                }
            },
            
            {
                Name:"ucfirst",
                Title:"First letter of each word to upper case, the remaning in lower case",
                Img:{
                    Kind:"text",
                    Value:"Aa"
                },
                Func:()=> {
                    const cm         = this.codeMirrorTarget;
                    const selection  = cm.getSelection();
                    const selections = cm.listSelections();

                    let str=  selection.toLowerCase().replace(/\b(\w)|\s(\w)/g, allLower => allLower.toUpperCase());
                    cm.replaceSelection(str);
                    cm.setSelections(selections);
                    this.codeMirrorTarget.focus();
                }
            },
           
            {
                Name:"uppercase",
                Title:"All selected text to upper case",
                Img:{
                    Kind:"text",
                    Value:"A"
                },
                Func:()=> {
                    const cm         = this.codeMirrorTarget;
                    const selection  = cm.getSelection();
                    const selections = cm.listSelections();
                    
                    cm.replaceSelection(selection.toUpperCase());
                    cm.setSelections(selections);
                    this.codeMirrorTarget.focus();
                }
            },

            {
                Name:"lowercase",
                Title:"All selected text to lower case",
                Img:{
                    Kind:"text",
                    Value:"a"
                },
                Func:()=> {
                    const cm         = this.codeMirrorTarget;
                    const selection  = cm.getSelection();
                    const selections = cm.listSelections();
                    
                    cm.replaceSelection(selection.toLowerCase());
                    cm.setSelections(selections);
                    this.codeMirrorTarget.focus();
                }
            },

            {
                Name:"h1",
                Title:"Heading 1",
                Img:{
                    Kind:"text",
                    Value:"H1"
                },
                Func:()=> {
                    const cm        = this.codeMirrorTarget;
                    const cursor    = cm.getCursor();
                    const selection = cm.getSelection();
        
                    if (cursor.ch === 0){
                        cm.replaceSelection("# " + selection);
                    }else{
                        cm.setCursor(cursor.line, 0);
                        cm.replaceSelection("# " + selection);
                        cm.setCursor(cursor.line, cursor.ch + 2);
                    }
                    this.codeMirrorTarget.focus();
                }
            } ,
           
            {
                Name:"h2",
                Title:"Heading 2",
                Img:{
                    Kind:"text",
                    Value:"H2"
                },
                Func:()=> {
                    const cm        = this.codeMirrorTarget;
                    const cursor    = cm.getCursor();
                    const selection = cm.getSelection();
        
                    if (cursor.ch === 0){
                        cm.replaceSelection("## " + selection);
                    }else{
                        cm.setCursor(cursor.line, 0);
                        cm.replaceSelection("## " + selection);
                        cm.setCursor(cursor.line, cursor.ch + 3);
                    }
                    this.codeMirrorTarget.focus();
                }
            } ,
           
            {
                Name:"h3",
                Title:"Heading 3",
                Img:{
                    Kind:"text",
                    Value:"H3"
                },
                Func:()=> {
                    const cm        = this.codeMirrorTarget;
                    const cursor    = cm.getCursor();
                    const selection = cm.getSelection();
        
                    if (cursor.ch === 0){
                        cm.replaceSelection("### " + selection);
                    }else{
                        cm.setCursor(cursor.line, 0);
                        cm.replaceSelection("### " + selection);
                        cm.setCursor(cursor.line, cursor.ch + 4);
                    }
                    this.codeMirrorTarget.focus();
                }
            } ,
            
            {
                Name:"h4",
                Title:"Heading 4",
                Img:{
                    Kind:"text",
                    Value:"H4"
                },
                Func:()=> {
                    const cm        = this.codeMirrorTarget;
                    const cursor    = cm.getCursor();
                    const selection = cm.getSelection();
        
                    if (cursor.ch === 0){
                        cm.replaceSelection("#### " + selection);
                    }else{
                        cm.setCursor(cursor.line, 0);
                        cm.replaceSelection("#### " + selection);
                        cm.setCursor(cursor.line, cursor.ch + 5);
                    }
                    this.codeMirrorTarget.focus();
                }
            } ,
    
            {
                Name:"h5",
                Title:"Heading 5",
                Img:{
                    Kind:"text",
                    Value:"H5"
                },
                Func:()=>{
                    const cm        = this.codeMirrorTarget;
                    const cursor    = cm.getCursor();
                    const selection = cm.getSelection();
        
                    if (cursor.ch === 0){
                        cm.replaceSelection("##### " + selection);
                    }else{
                        cm.setCursor(cursor.line, 0);
                        cm.replaceSelection("##### " + selection);
                        cm.setCursor(cursor.line, cursor.ch + 6);
                    }
                    this.codeMirrorTarget.focus();
                }
            } ,
            
            {
                Name:"h6",
                Title:"Heading 6",
                Img:{
                    Kind:"text",
                    Value:"H6"
                },
                Func:()=> {
                    const cm        = this.codeMirrorTarget;
                    const cursor    = cm.getCursor();
                    const selection = cm.getSelection();
        
                    if (cursor.ch === 0){
                        cm.replaceSelection("###### " + selection);
                    }else{
                        cm.setCursor(cursor.line, 0);
                        cm.replaceSelection("###### " + selection);
                        cm.setCursor(cursor.line, cursor.ch + 7);
                    }
                    this.codeMirrorTarget.focus();
                }
            } ,
            
            {
                Name:"list-ul",
                Title:"Unordered list",
                Img:{
                    Kind:"svg",
                    Value:`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0V0z"/><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM8 19h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zm0-6h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zM7 6c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1z"/>
                    </svg>
                `},
                Func:()=> {
                    const cm        = this.codeMirrorTarget;
                    const selection = cm.getSelection();
        
                    if (selection === "") {
                        cm.replaceSelection("- " + selection);
                    }else{
                        let selectionText = selection.split("\n");
                        for (let i = 0, len = selectionText.length; i < len; i++){
                            if(selectionText[i] != ""){
                                selectionText[i]="- " + selectionText[i];
                            }
                        }
                        cm.replaceSelection(selectionText.join("\n"));
                    }
                    this.codeMirrorTarget.focus();
                }
            } ,
            
            {
                Name:"list-ol",
                Title:"Ordered list",
                Img:{
                    Kind:"svg",
                    Value:`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0V0z"/>
                    <path d="M8 7h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zm12 10H8c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1zm0-6H8c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1zM4.5 16h-2c-.28 0-.5.22-.5.5s.22.5.5.5H4v.5h-.5c-.28 0-.5.22-.5.5s.22.5.5.5H4v.5H2.5c-.28 0-.5.22-.5.5s.22.5.5.5h2c.28 0 .5-.22.5-.5v-3c0-.28-.22-.5-.5-.5zm-2-11H3v2.5c0 .28.22.5.5.5s.5-.22.5-.5v-3c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5s.22.5.5.5zm2 5h-2c-.28 0-.5.22-.5.5s.22.5.5.5h1.3l-1.68 1.96c-.08.09-.12.21-.12.32v.22c0 .28.22.5.5.5h2c.28 0 .5-.22.5-.5s-.22-.5-.5-.5H3.2l1.68-1.96c.08-.09.12-.21.12-.32v-.22c0-.28-.22-.5-.5-.5z"/>
                    </svg>
                `},
                Func:()=> {
                    const cm        = this.codeMirrorTarget;
                    const selection = cm.getSelection();
        
                    if(selection == "") {
                        cm.replaceSelection("1. " + selection);
                    }else{
                        let selectionText = selection.split("\n");
                        for (let i = 0, len = selectionText.length; i < len; i++){
                            if(selectionText[i]!=""){
                                selectionText[i]=(i+1) + ". " + selectionText[i]
                            }
                        }
                        cm.replaceSelection(selectionText.join("\n"));
                    }
                    this.codeMirrorTarget.focus();
                }
            } ,
           
            {
                Name:"hr",
                Title:"Horizontal rule",
                Img:{
                    Kind:"svg",
                    Value:`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M19 13H5v-2h14v2z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                `},
                Func:()=> {
                    const cm        = this.codeMirrorTarget;
                    const cursor    = cm.getCursor();
                    let put="\n\n";
                    if(cursor.ch==0){
                        put="\n";
                    }
                    put+="------------\n";
                    cm.replaceSelection(put);
                    this.codeMirrorTarget.focus();
                }
            } ,
            {
                Name:"link",
                Title:"Link",
                Img:{
                    Kind:"svg",
                    Value:`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0V0z"/>
                    <path d="M17 7h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c1.65 0 3 1.35 3 3s-1.35 3-3 3h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-9 5c0 .55.45 1 1 1h6c.55 0 1-.45 1-1s-.45-1-1-1H9c-.55 0-1 .45-1 1zm2 3H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h3c.55 0 1-.45 1-1s-.45-1-1-1H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h3c.55 0 1-.45 1-1s-.45-1-1-1z"/>
                    </svg>
                `},
                Func:()=>{
                    const cm        = this.codeMirrorTarget;
                    let selection = cm.getSelection();
                    if(selection.trim()==""){
                        selection="title";
                    }
                    this.codeMirrorTarget.replaceSelection("["+selection+"](link)");
                    this.codeMirrorTarget.focus();
                }
            },
            {
                Name:"image",
                Title:"add image",
                Img:{
                    Kind:"svg",
                    Value:`
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path d="M29.996 4c0.001 0.001 0.003 0.002 0.004 0.004v23.993c-0.001 0.001-0.002 0.003-0.004 0.004h-27.993c-0.001-0.001-0.003-0.002-0.004-0.004v-23.993c0.001-0.001 0.002-0.003 0.004-0.004h27.993zM30 2h-28c-1.1 0-2 0.9-2 2v24c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-24c0-1.1-0.9-2-2-2v0z"></path>
                    <path d="M26 9c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"></path>
                    <path d="M28 26h-24v-4l7-12 8 10h2l7-6z"></path>
                    </svg>
                `}
            },
            
            {
                Name:"code",
                Title:"Lineal code",
                Img:{
                    Kind:"svg",
                    Value:`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0V0z"/>
                    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                    </svg>
                `},
                Func:()=> {
                    const cm        = this.codeMirrorTarget;
                    const cursor    = cm.getCursor();
                    const selection = cm.getSelection();
        
                    cm.replaceSelection("`" + selection + "`");
        
                    if (selection === "") {
                        cm.setCursor(cursor.line, cursor.ch + 1);
                    }
                }
            },
            
            {
                Name:"code-block",
                Title:"Code block",
                Img:{
                    Kind:"svg",
                    Value:`
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 32">
                    <path d="M26 23l3 3 10-10-10-10-3 3 7 7z"></path>
                    <path d="M14 9l-3-3-10 10 10 10 3-3-7-7z"></path>
                    <path d="M21.916 4.704l2.171 0.592-6 22.001-2.171-0.592 6-22.001z"></path>
                    </svg>
                `},          
            },
            {
                Name:"table",
                Title:"Tables",
                Img:{
                    Kind:"svg",
                    Value:`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/>
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"/>
                    </svg>
                `},       
            },
            {
                Name:"latex",
                Title:"Latex",
                Img:{
                    Kind:"text",
                    Value:"∰"
                }, 
                Func:()=> {
                    const cm        = this.codeMirrorTarget;
                    const cursor    = cm.getCursor();
                    const selection = cm.getSelection();
        
                    cm.replaceSelection("🥚" + selection + "🐤");
        
                    if (selection === "") {
                        cm.setCursor(cursor.line, cursor.ch + 1);
                    }
                }  
            },
             {
                Name:"fullscreen",
                Title:"Full screen",
                Img:{
                    Kind:"svg",
                    Value:`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                    </svg>
                `},
                Func:()=>{
                    if (!document.fullscreenElement) {
                        this.editorWrapper.requestFullscreen()
                        .then((me)=>{
                            console.log(me);
                        })
                        .catch((e)=>{
                            console.log(e);
                        });
                    } else {
                      if (document.exitFullscreen) {
                        document.exitFullscreen(); 
                      }
                    }
                    this.codeMirrorTarget.focus();
                }
            },
            
            {
                Name:"search",
                Title:"Search",
                Img:{
                    Kind:"svg",
                    Value:`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                `},
                Func:()=>{
                    this.codeMirrorTarget.execCommand("find");
                }
            },
            
            {
                Name:"nuevaLinea",
                Title:"New line",
                Img:{
                    Kind:"svg",
                    Value:`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                `},
                Func:()=> {
                    const cm        = this.codeMirrorTarget;
                    const cursor    = cm.getCursor();
                    let put="💥\r\n";
                    if(cursor.ch != 0){
                        put="\r\n"+put;
                    }
                    cm.replaceSelection(put);
                    this.codeMirrorTarget.focus();
                }
            },
            {
                Name:"withoutPreview",
                Title:"Watch only preview",
                Img:{
                    Kind:"svg",
                    Value:`
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                        <path d="M16 6c-6.979 0-13.028 4.064-16 10 2.972 5.936 9.021 10 16 10s13.027-4.064 16-10c-2.972-5.936-9.021-10-16-10zM23.889 11.303c1.88 1.199 3.473 2.805 4.67 4.697-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303s-5.527-0.796-7.889-2.303c-1.88-1.199-3.473-2.805-4.67-4.697 1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 4.418 3.582 8 8 8s8-3.582 8-8c0-0.962-0.17-1.883-0.482-2.737 0.124 0.074 0.248 0.15 0.371 0.228v0zM16 13c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"></path>
                    </svg>
                `},
                Func:()=>{
                    const preview=this.editorWrapper.querySelector(".yaposi-preview");
                    const cmWrapper=this.editorWrapper.querySelector(".codeMirrorWrapper");
                    const li=this.editorWrapper.querySelector(`.yaposi-toolbar li[data-name="withoutPreview"]`);
                    const img=li.querySelector(".img");
                     switch (preview.dataset.state){
                         case "both":
                            cmWrapper.style.display="none";
                            preview.dataset.state="preview";
                            this.editorWrapper.classList.add("modePreview");
                            li.setAttribute("title","Watch only editor");
                            img.innerHTML=`
                            <path d="M27 0h-24c-1.65 0-3 1.35-3 3v26c0 1.65 1.35 3 3 3h24c1.65 0 3-1.35 3-3v-26c0-1.65-1.35-3-3-3zM26 28h-22v-24h22v24zM8 14h14v2h-14zM8 18h14v2h-14zM8 22h14v2h-14zM8 10h14v2h-14z"/>
                            `;
                            break;
                         case "preview":
                            cmWrapper.style.display="flex";
                            preview.style.display="none";
                            preview.dataset.state="editor";
                            this.editorWrapper.classList.remove("modePreview");
                            this.editorWrapper.classList.add("modeEditor");
                            li.setAttribute("title","Watch both, editor and preview");
                            img.innerHTML=`
                            <path d="M20 8v-8h-14l-6 6v18h12v8h20v-24h-12zM6 2.828v3.172h-3.172l3.172-3.172zM2 22v-14h6v-6h10v6l-6 6v8h-10zM18 10.828v3.172h-3.172l3.172-3.172zM30 30h-16v-14h6v-6h10v20z"/>
                            `;
                            break;
                         case "editor":
                            preview.style.display="flex";
                            preview.dataset.state="both";
                            this.editorWrapper.classList.remove("modeEditor");
                            li.setAttribute("title","Watch only preview");
                            img.innerHTML=`
                            <path d="M16 6c-6.979 0-13.028 4.064-16 10 2.972 5.936 9.021 10 16 10s13.027-4.064 16-10c-2.972-5.936-9.021-10-16-10zM23.889 11.303c1.88 1.199 3.473 2.805 4.67 4.697-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303s-5.527-0.796-7.889-2.303c-1.88-1.199-3.473-2.805-4.67-4.697 1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 4.418 3.582 8 8 8s8-3.582 8-8c0-0.962-0.17-1.883-0.482-2.737 0.124 0.074 0.248 0.15 0.371 0.228v0zM16 13c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"></path>
                            `;
                            break;
                     }
                     this.codeMirrorTarget.refresh(); 
                }
            },
        ]
    }
}
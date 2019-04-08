/*If you are debugging the code you may wonder why sometimes I call CodeMirror.refresh();
  There are weird behaviors with CodeMirror, when the CodeMirror changes it's size, or when 
  goes from hiding to showing.
  Behaviors: 
        - not selecting text correctly.
        - CodeMirror not showing
  not showing any text until clicked, when clicked on an area .. etc
    //https://github.com/CodeMirror/CodeMirror/issues/4997
    //https://github.com/CodeMirror/CodeMirror/issues/2469
    For this reason I called it whenever it's size change or when I'm showing it
*/
import {Toolbar} from './toolBar.js';
import {Img} from '../addon/img.js';
import {Table} from '../addon/table.js';
import {CodeBlock} from '../addon/codeBlock.js';
import {marked} from '../lib/marked.js';
import {PR} from '../lib/prettify/src/prettify.js';
import katex from '../lib/katex/katexmj.js';
import {CodeMirror} from '../lib/codemirror/codemirror.js';

export class Yaposi{
    constructor(mdRendererName,markdownInitial){
        this.Me="";
        this.CodeBlock={Module: CodeBlock, Handler: "" , Dom:""};
        this.Img={Module: Img, Handler: "" , Dom:""};
        this.Table={Module: Table, Handler: "" , Dom: ""};
        this.Toolbar={Module: Toolbar, Handler: "" , Dom: ""};
        this.CodeMirror={Module: CodeMirror, Handler: "" , Dom: ""};
        this.GetHTML=this.GetHTML.bind(this);
        this.GetMarkdown=this.GetMarkdown.bind(this);
        this.markdownRender = new MarkdownRender(mdRendererName);
        this.mdInitial=markdownInitial;
    }
    GetMarkdown(){//it returns markdown value, and scaped version of it
        const cm                = this.CodeMirror.Handler;    
        const cmValue           = cm.getValue();//-------------------------markdown value
        const scaped            = this.sanitize(cmValue);
        return [cmValue,scaped]
    }
    GetHTML(){//it returns the markdown html result and scaped version of it
        const cm                = this.CodeMirror.Handler;    
        const cmValueRaw           = cm.getValue();//-------------------------markdown value
        const cmValue=cmValueRaw.replace(/</g, "&lt;").replace(/💥/g, "<br>");
        const htmlValue         = this.markdownRender.getHTML(cmValue);
        const scapedHTML        = this.sanitize(htmlValue);
        return [htmlValue,scapedHTML]
    }
    SetValue(markdown){//set a markdown value to editor
        this.CodeMirror.Handler.setValue(markdown);
    }
    creatPreview(){
        const preview=document.createElement("div");
        const wrapper =document.createElement("div");
        wrapper.appendChild(preview);  
        wrapper.classList.add("yaposi-preview");
        wrapper.dataset.state="both";
        return [preview,wrapper]
    }
    Start(){
        const wrapper=document.createElement("div");
        wrapper.classList.add("yaposi");
        const cmWrapper=document.createElement("div");
        cmWrapper.classList.add("codeMirrorWrapper");
        wrapper.appendChild(cmWrapper);

        const cmModule = this.CodeMirror.Module;
        const cmConfig=    this.CodeMirrorConfig(this.mdInitial);
        const cmHandler = cmModule(cmWrapper, cmConfig);
        this.CodeMirror.Handler= cmHandler;

        /*creat preview */
        const [preview,wrapperPreview]=this.creatPreview();
        wrapper.appendChild(wrapperPreview); 
        this.previewContainer=preview;
        /*----------------------------*/ 
        /* Creat toolbar with it's listener */
        const tobModule  =  this.Toolbar.Module;
        const tobHandler =  new tobModule(cmHandler,wrapper);
        const tobDom     =  tobHandler.create();
        wrapper.prepend(tobDom);
        tobHandler.registerKeyMaps();

        this.Toolbar.Dom = tobDom;
        this.Toolbar.Handler= tobHandler;
        /*---------------------------- */
    
        /* creat the code full handler*/
        const cbModule  = this.CodeBlock.Module;
        const cbHandler = new cbModule(cmHandler);
        const cbDom     = cbHandler.create();
        wrapper.appendChild(cbDom);
        const cbIcon=tobDom.querySelector(`[data-name="code-block"]`);
        cbIcon.addEventListener("click",cbHandler.show);

        this.CodeBlock.Dom= cbDom;
        this.CodeBlock.Handler=cbHandler;
        /*----------------------------- */

        /* creat the upload image handler*/
        const imgModule = this.Img.Module;
        const imgHandler=new imgModule(cmHandler);
        const imgDom= imgHandler.create();
        wrapper.appendChild(imgDom);
        const imIcon=tobDom.querySelector(`[data-name="image"]`);
        imIcon.addEventListener("click",imgHandler.handle);

        this.Img.Dom= imgDom;
        this.Img.Handler= imgHandler;
        /*----------------------------- */

        /*creat table handler*/
        const tbModule  = this.Table.Module; 
        const tbHandler = new tbModule(cmHandler);
        const tbDom = tbHandler.create();
        wrapper.appendChild(tbDom);
        const tbIcon=tobDom.querySelector(`[data-name="table"]`);
        tbIcon.addEventListener("click",this.Table.show);

        this.Table.Dom = tbDom;
        this.Table.Handler= tbHandler;
        /*--------------------------- */
        this.render();
        cmHandler.on("change",()=>{this.render();});
       
        this.Me=wrapper;
        setTimeout(()=>{
            this.CodeMirror.Handler.focus();
            this.CodeMirror.Handler.refresh();
        },300);
        return wrapper
    }
    render() {
        const previewContainer      = this.previewContainer;
        const cm                    = this.CodeMirror.Handler;    
        let cmValue               = cm.getValue();//-------------------------markdown value
        cmValue= cmValue.replace(/</g, "&lt;").replace(/💥/g, "<br>");
        const htmlValue             = this.markdownRender.getHTML(cmValue);
        previewContainer.innerHTML  = htmlValue;
        PR.prettyPrint();
    }
    sanitize(unSafeString){
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
            "`": '&#96;',
            "/": '&#47;',
            "\\": '&#92;',
        };
        return unSafeString.replace(/[&<>"'`/\\]/g, (match)=>(map[match]));
    }
    CodeMirrorConfig(markdownInitial){
        const me={
            value                     : markdownInitial,
            mode                      : "gfm",
            autofocus                 : true,
            autoCloseTags             : true,
            indentUnit                : 4,
            lineWrapping              : true,
            matchBrackets             : true,
            indentWithTabs            : true,
            styleActiveLine           : true,
            styleSelectedText         : true,
            autoCloseBrackets         : true,
            showTrailingSpace         : true,
            autoRefresh               : true,
            styleActiveLine           : true,
            lineNumbers               : true,
        }
        return me
    }
}

export class MarkdownRender{
    constructor(rendererName){
        this.rendererName=rendererName;
        this.regexLatex=/🥚[\s\S]*?🐤/g;//match latext sintax, pattern:  🥚{latext}🐤
        this.options="";
        this.start();
    }
    start(){
        let renderer="";
        const type=this.rendererName.toLowerCase();
        switch (type){
            case "katex":
                renderer=new katexRederer();
                break;
            case "mathjax": //for future compatibily with mathjax, for now it's the same as katex
                renderer=new katexRederer();
                break; 
            default:
                renderer=new katexRederer();
                break;  
        }
        this.options={renderer: this.getMarkedRender(renderer)};
    }
    getHTML(markdownValue){
        return marked(markdownValue,this.options);
    }
    renderText(render,html){
        html=html.replace(/\\\s/g,"\\\\");//marked replace all "\\" for "\", but latex uses "\\" so I need to reverted, taking take not to replace for example \begin, that is why I match \{blank space}
        html=html.replace(/&amp;/g,"&");//marked replace all "&" for "&amp", but latex uses "&" so I need to reverted
        html=html.replace(this.regexLatex,function(me){
            const latex=me.replace("🥚",'').replace("🐤",'');//removing 🥚,🐤
            return render.getHTML(latex);
        });
        return html
    }
    getMarkedRender(render){
        let renderer = new marked.Renderer();
        renderer.paragraph =  (text) =>{
            let containsLatex=false;
            let html=text.replace(/^\s+/, '').replace(/\s+$/, '');//remove all \s(regex) at the beginning and at the end  so I can check check if the user wants an inline latex or a new line
            const first=html[0];
            const last=html[html.length-1];
            html=html.replace(/&amp;/g,"&");//marked replace all "&" for "&amp", but latex uses "&" so I need to reverted
            html=html.replace(/\\\s/g,"\\\\");//marked replace all "\\" for "\", but latex uses "\\" so I need to reverted, taking take not to replace for example \begin, that is why I match \{blank space}
            html=html.replace(this.regexLatex,function(me){
                const latex=me.replace("🥚",'').replace("🐤",'');//removing 🥚,🐤
                containsLatex=true;
                return render.getHTML(latex);
            });
            if(containsLatex){
                if(first.match(/\w/) || last.match(/\w/)){//here I check if user wants inline or in a new line
                    return `<p class="inlineKatex">${html}</p>`
                }
                return `<p class="alone">${html}</p>`
            }
            if(html.includes("<img src")){
                if(first=="<" && last==">"){//here I check if user wants inline or in a new line
                    return `<p class="alone">${html}</p>`
                }
                return `<p class="inlineImage">${html}</p>`
            }
            return `<p>${html}</p>`
        }
        renderer.code = function (code,infostring,escaped){
            return `
            <pre class="prettyprint linenums"><code class="language-${infostring}">${code}</code></pre>
            `
        };
        renderer.list = (body, ordered, start)=> {
            const redered=this.renderText(render, body);
            if(ordered){
                return `<ol>${redered}</ol>`
            }
            return `<ul>${redered}</ul>`
        }
        renderer.table = (header, body)=> {
            header=this.renderText(render, header);
            body=this.renderText(render, body);
            return `<table><thead>${header}</thead><tbody>${body}</tbody></table>`
        }
        return renderer 
    }
}

class katexRederer{
    constructor(){
        this.getHTML=this.getHTML.bind(this);
        this.options={displayMode: true,throwOnError: false,strict: "warn"};
    }
    getHTML(latex){
        return katex.renderToString(latex, this.options)
    }
}



import {marked} from '../lib/marked.js';
import katex from '../lib/katex/katexmj.js';
import {Sanitize} from './sanitizer.js'
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
        markdownValue= markdownValue.replace(/</g, "&lt;").replace(/💥/g, "<br>");
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
            code=Sanitize(code);
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

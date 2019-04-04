import {CodeMirror} from '../lib/codemirror/codemirror.js';
export class CodeBlock{
    constructor(codeMirrorTarget){
        this.insert=this.insert.bind(this);
        this.show=this.show.bind(this);
        this.hide=this.hide.bind(this);
        this.codeLanguages = this.codeLanguagesF();
        this.codeMirrorConfig=this.codeMirrorConfigF();
        this.langSelect="";
        this.codeMirrorTarget=codeMirrorTarget;
        this.me="";
        this.codeMirror="";
    }
    codeMirrorConfigF(){
        return {
            mode                      : {name: "python",version: 3},
            tabSize                   : 4,
            lineNumbers               : true,
            lineWrapping              : true,
            styleActiveLine: true,
            matchBrackets: true
        }
    }
    create() {
        let html = `
            <div class="yaposi_CB">
                <div class="yaposi-code-toolbar">
                    <label>Pick language</label> 
                    <select>
                        <option value="other" data-mode="other">other</option>
                    </select>
                </div>
                <div class="yaposi_CB_cm">
                </div>
                <div class="yaposi_CB_actions">
                    <button class="cancel">cancel</button>
                    <button class="insert">insert</button>
                </div>
            </div>
        `;
        const temp=document.createElement("template");
        temp.innerHTML=html;
        let me=temp.content.querySelector(".yaposi_CB");
        this.codeMirror=CodeMirror(me.querySelector(".yaposi_CB_cm"), this.codeMirrorConfig);
        
        let insert=me.querySelector(".insert");
        insert.addEventListener("click",this.insert);

        let cancel=me.querySelector(".cancel");
        cancel.addEventListener("click",this.hide);
        this.langSelect = me.querySelector("select");
        
        for (let key in this.codeLanguages){
            let codeLang = this.codeLanguages[key];
            let agregar=document.createElement("option");
            if (key=="python"){
                agregar.setAttribute("selected","");
            }
            agregar.value=key;
            agregar.dataset.mode=codeLang[1];
            agregar.textContent=codeLang[0];
            this.langSelect.appendChild(agregar);
        }
        this.langSelect.addEventListener("change",(e)=>{
            let selected=this.langSelect.options[this.langSelect.selectedIndex];
            this.codeMirror.setOption("mode", selected.dataset.mode);
        });
        this.me=me;  
        this.codeMirror.refresh();
        return me
    }
    hide(){
        this.me.addEventListener("transitionend",()=>{
            this.me.style.display="none";
        },{once:true});
        this.me.style.transform="translate(-50%,-730px)";
    }
    show() {
        this.me.style.display="grid";
        setTimeout(()=>{this.me.style.transform="translate(-50%,-50%)";},0);
        let selection   = this.codeMirrorTarget.getSelection();
        this.codeMirror.setValue(selection);
        this.codeMirror.focus();    
    }
    insert(){
        this.hide();
        const codeTexts=this.codeMirror.getValue();
        if (codeTexts === ""){
            alert(dialogLang.emptyAlert);
            return false;
        }
        const langName   = this.langSelect.value;

        //check if cursor, in principal editor, it's at the beginning, if does it jumps to new line.
        let atBeggining="```" + langName;
        const cursor    = this.codeMirrorTarget.getCursor();
        if (cursor.ch !== 0) {
            atBeggining = "\r\n\r\n" + atBeggining;
        }
           
        this.codeMirrorTarget.replaceSelection([atBeggining, codeTexts, "```\r\n"].join("\n"));
        if (langName === "") {
            this.codeMirrorTarget.setCursor(cursor.line, cursor.ch + 3);
        }
    }
    
    codeLanguagesF(){
        return  {
			asp           : ["ASP", "vbscript"],
			actionscript  : ["ActionScript(3.0)/Flash/Flex", "clike"],
			bash          : ["Bash/Bat", "shell"],
			css           : ["CSS", "css"],
			c             : ["C", "clike"],
			cpp           : ["C++", "clike"],
			csharp        : ["C#", "clike"],
			coffeescript  : ["CoffeeScript", "coffeescript"],
			d             : ["D", "d"],
			dart          : ["Dart", "dart"],
			delphi        : ["Delphi/Pascal", "pascal"],
			erlang        : ["Erlang", "erlang"],
			go            : ["Golang", "go"],
			groovy        : ["Groovy", "groovy"],
			html          : ["HTML", "text/html"],
			java          : ["Java", "clike"],
			json          : ["JSON", "text/json"],
			javascript    : ["Javascript", "javascript"],
			lua           : ["Lua", "lua"],
			less          : ["LESS", "css"],
			markdown      : ["Markdown", "gfm"],
			"objective-c" : ["Objective-C", "clike"],
			php           : ["PHP", "php"],
			perl          : ["Perl", "perl"],
			python        : ["Python", "python"],
			r             : ["R", "r"],
			rst           : ["reStructedText", "rst"],
			ruby          : ["Ruby", "ruby"],
			sql           : ["SQL", "sql"],
			sass          : ["SASS/SCSS", "sass"],
			shell         : ["Shell", "shell"],
			scala         : ["Scala", "clike"],
			swift         : ["Swift", "clike"],
			vb            : ["VB/VBScript", "vb"],
			xml           : ["XML", "text/xml"],
			yaml          : ["YAML", "yaml"]
        }
    }
}    
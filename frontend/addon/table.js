export class Table{
    constructor(codeMirrorTarget){
        this.insert=this.insert.bind(this);
        this.show=this.show.bind(this);
        this.hide=this.hide.bind(this);
        this.me="";
        this.codeMirrorTarget=codeMirrorTarget;
        this.cols="";
        this.rows="";
        this.valueRandom=Math.floor((Math.random() * 10000) + 1);//this fixes a bug when two editor are created, as input with name yaposi-alineation, get override the default 
        
        this.create();
    }
    create() {
        let html = `
            <div class="yaposi_Tb">
                <div class="yaposi_Tb-number">
                    <h3>Cells</h3>
                    <ul>
                        <li><h2>Rows</h2><input type="number" value="2" min="1"></li>
                        <li><h2>Columns</h2><input type="number" value="2" min="1"></li>
                    </ul>
                </div>
                <div class="yaposi_Tb-alineation">
                    <h3>Alignment</h3>
                    <ul>
                        <li><label>Default </label><input type="radio" name="yaposi-alineation${this.valueRandom}" value="default" checked></li>
                        <li><label>left </label><input type="radio" name="yaposi-alineation${this.valueRandom}" value="left"></li>
                        <li><label>center </label><input type="radio" name="yaposi-alineation${this.valueRandom}" value="center"></li>
                        <li><label>right </label><input type="radio" name="yaposi-alineation${this.valueRandom}" value="right"></li>
                    </ul>
                </div>
                <div class="yaposi_Tb-actions">
                    <button class="cancel">Cancelar</button>
                    <button class="insert">Insert</button>
                </div>
            </div>
        `;
        let temp=document.createElement("template");
        temp.innerHTML=html;
        let me=temp.content.querySelector(".yaposi_Tb");
        let insert=me.querySelector(".insert");
        insert.addEventListener("click",this.insert);
        let cancel=me.querySelector(".cancel");
        cancel.addEventListener("click",this.hide);

        let numbers=me.querySelectorAll(".yaposi_Tb-number li input");
        this.cols=numbers[0];
        this.rows=numbers[1];
        this.me=me
        return me
    }
    hide(){
        this.me.addEventListener("transitionend",()=>{
            this.me.style.display="none";
        },{once:true});
        this.me.style.transform="translate(-50%,-730px)";
    }
    show() {
        this.me.style.display="flex";
        setTimeout(()=>{this.me.style.transform="translate(-50%,-50%)";},0);
    }
    insert(){
        this.hide();
        let rows=parseInt(this.rows.value);
        let colums=parseInt(this.cols.value);
        let alineation=this.me.querySelector(`.yaposi_Tb-alineation input:checked`).value;
        let putInside="---";
        switch (alineation){
            case "left":
                putInside=":---";
                break;
            case "right":
                putInside="---:";
                break;
            case "center":
                putInside=":---:";
                break;
        }
        let putAlineation="";
        let putAnyWhereElse="|";
        for(let i=0;i<colums;i++){
            putAlineation+="|"+putInside;
            putAnyWhereElse+="   |"
        }
        putAlineation+="|";
        let putGeneral=putAnyWhereElse+"\r\n"+putAlineation;
        for(let i=1;i<rows;i++){
            putGeneral+="\r\n"+putAnyWhereElse;
        }

        //check if cursor, in principal editor, it's at the beginning, if does it jumps to new line.
        let cursor    = this.codeMirrorTarget.getCursor();
        if (cursor.ch !== 0) {
            putGeneral = "\r\n\r\n" + putGeneral;
        }
        this.codeMirrorTarget.replaceSelection(putGeneral);
    }
}    
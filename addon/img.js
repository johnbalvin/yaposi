export class Img{
    constructor(codeMirrorTarget){
        this.insert=this.insert.bind(this);
        this.hide=this.hide.bind(this);
        this.show=this.show.bind(this);
        this.handle=this.handle.bind(this);
        this.dragover=this.dragover.bind(this);
        this.dragleave=this.dragleave.bind(this);
        this.drop=this.drop.bind(this);
        this.putFile=this.putFile.bind(this);
        this.insertBtn="";
        this.codeMirrorTarget=codeMirrorTarget;
        this.droppperWrapper="";
        this.spinningWrapper="";
        this.imgPreviewWrapper="";
        this.droppperImg="";
        this.counting=1;
        this.me="";
        this.imgURL="";
        this.img="";
    }
    create() {
        let html = `
            <div class="yaposi-img">
                <div class="yaposi-dropper"> 
                    <input type="file" accept="image/*">
                    <svg class="yaposi-upload" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M0 0h24v24H0z" fill="none"/>
                      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                    </svg>
                </div>
                <div class="yaposi-uploading">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="yaposi-spinning" viewBox="25 25 50 50" >
                        <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#70c542" stroke-width="10" />
                    </svg>
                </div>
                <div class="yaposi-imgPreview">
                    <img src="">
                </div>
                <div class="yaposi-img-actions">
                    <button class="cancel">Cancel</button>
                    <button class="insert">Insert</button>
                </div>
            </div>
        `;
        let temp=document.createElement("template");
        temp.innerHTML=html;
        let wrapper=temp.content.querySelector(".yaposi-img");
        this.droppperWrapper=wrapper.querySelector(".yaposi-dropper");
        this.droppperImg=this.droppperWrapper.querySelector(".yaposi-upload");
        this.me=wrapper;

        this.droppperWrapper.addEventListener("dragover",this.dragover);
        this.droppperWrapper.addEventListener("dragleave",this.dragleave);
        this.droppperWrapper.addEventListener("drop",this.drop);

        let input=this.droppperWrapper.querySelector("input");
        input.addEventListener("change",this.putFile);

        this.droppperImg.addEventListener("click",()=>{input.click()});
        let cancel=this.me.querySelector(".yaposi-img-actions .cancel");
        cancel.addEventListener("click",this.hide);

        this.insertBtn=wrapper.querySelector(".insert");
        this.insertBtn.addEventListener("click",this.insert);

        this.spinningWrapper=wrapper.querySelector(".yaposi-uploading");
        this.imgPreviewWrapper=wrapper.querySelector(".yaposi-imgPreview");
        return wrapper
    }
    handle(){
        let cm        = this.codeMirrorTarget;
        let selection = cm.getSelection();
        if (selection==""){
            //this.show(); there is implemented how to upload the image, use it if you know to do it
            return
        }
        if(selection.includes("http")){
            let cursor    = this.codeMirrorTarget.getCursor();
            let put=`![Image ${this.counting}][${this.counting}]\n`;
    
            //check if cursor, in principal editor, it's at the beginning, if not it jumps to new line.
            if (cursor.ch !== 0) {
                put = "\r\n\r\n" + put;
            }
            this.codeMirrorTarget.replaceSelection(put);
    
            let before=this.codeMirrorTarget.getValue();
            before+=`\r\n[${this.counting}]: ${selection} "random title" \n`;
            this.codeMirrorTarget.setValue(before);
            this.counting++;
            return
        }
    }
    show() {
        this.me.style.display="grid";
        setTimeout(()=>{this.me.style.transform="translate(-50%,-50%)";},0);
    }
    async insert(){
        await this.uploadFile();
        if(this.imgURL==""){
            return
        }
        let put=`![Image ${this.counting}][${this.counting}]\n`;

        //check if cursor, in principal editor, it's at the beginning, if not it jumps to new line.
        let cursor    = this.codeMirrorTarget.getCursor();
        if (cursor.ch !== 0) {
            put = "\r\n\r\n" + put;
        }
        this.codeMirrorTarget.replaceSelection(put);

        let before=this.codeMirrorTarget.getValue();
        before+=`\r\n[${this.counting}]: ${this.imgURL} "random title" \n`;
        this.codeMirrorTarget.setValue(before);

        this.counting++;
        this.hide();
    }
    hide(){
        this.imgURL="";
        this.me.style.transform="translate(-50%,-730px)";
        this.me.addEventListener("transitionend",()=>{this.me.style.display="none";},{once:true});

        this.imgPreviewWrapper.style.display="none";
        this.droppperWrapper.style.display="flex";
        this.insertBtn.style.visibility="hidden";
        this.spinningWrapper.style.display="none";
    }
    dragover(e){
        e.preventDefault();e.stopPropagation();
        e.dataTransfer.dropEffect='copy';
        this.droppperImg.classList.add("dragover");
        this.droppperWrapper.classList.add("dragover");
    }
    dragleave(e){
        e.preventDefault();e.stopPropagation();
        this.droppperImg.classList.remove("dragover");
        this.droppperWrapper.classList.remove("dragover");
    }
    drop(e){
        e.preventDefault();e.stopPropagation();
        this.file=e.dataTransfer.files[0];
        this.droppperImg.classList.remove("dragover");
        this.droppperWrapper.classList.remove("dragover");
        this.prepareImg();

    }
    putFile(e){
        e.preventDefault();e.stopPropagation();
        this.file=e.currentTarget.files[0];
        this.prepareImg();
    }
    prepareImg(){
        let img=this.imgPreviewWrapper.querySelector("img");
        img.onload=()=>{
            this.imgPreviewWrapper.style.display="flex";
            this.droppperWrapper.style.display="none";
            this.insertBtn.style.visibility="visible";
        },{once:true};
        img.onerror=(e)=>{
            console.log(e);
        },{once:true};
        img.src=window.URL.createObjectURL(this.file);
    }
    async uploadFile(){
        this.imgPreviewWrapper.style.display="none";
        this.insertBtn.style.visibility="hidden";
        this.spinningWrapper.style.display="flex";

        let body= new FormData();
        body.append("c","6");
        body.append("img",this.file);
        await fetch("",{credentials:"include",method:"post",body:body})
        .then((resp)=>{
            if(resp.status==200){
                return resp.text()
            }else{
                //handle the error
                return Promise.reject("server")
            }
        })
        .then((url)=>{
            this.imgURL=url;
            this.hide();
        })
        .catch((error)=>{
            if(error=="server"){
                return
            }
            //handle the error
            console.log(error);
        })
    }
}    
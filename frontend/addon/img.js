export  class Img{
    constructor(codeMirrorTarget){
        this.insert=this.insert.bind(this);
        this.hide=this.hide.bind(this);
        this.show=this.show.bind(this);
        this.handle=this.handle.bind(this);
        this.dragover=this.dragover.bind(this);
        this.dragleave=this.dragleave.bind(this);
        this.drop=this.drop.bind(this);
        this.putFile=this.putFile.bind(this);
        this.uploadFile=this.uploadFile.bind(this);
        this.generateFetch=this.generateFetch.bind(this);
        this.addURL=this.addURL.bind(this);
        this.uploadImg=false;
        this.urlToUpload="";
        this.insertBtn="";
        this.codeMirrorTarget=codeMirrorTarget;
        this.droppperWrapper="";
        this.stateWrapper="";
        this.stateUp="";
        this.stateCross="";
        this.imgPreviewWrapper="";
        this.droppperImg="";
        this.me="";
        this.imgURL="";
        this.img="";
    }
    getNumber(){//see where image number is starting
        const regex = /\[\d{1,3}]: http/g;//macth all "[number]: http"
        const regexN = /\d{1,3}/g;//macth all numbers from 1 digit to there
        const cmValueRaw = this.codeMirrorTarget.getValue();
        const firtMatch = cmValueRaw.match(regex);//macth all "[number]: http"
        if(firtMatch==null){//no image inside
          return 0
        }
        const secondMatch = firtMatch.join("").match(regexN);//macth all numbers from 1 digit to there
        return  Math.max(...secondMatch) + 1  //spread operator ....
    }
    create() {
        let html = `
        <div class="yaposi-img">
            <div class="yaposi-img-dropper"> 
                <input type="file" accept="image/*">
                <svg class="yaposi-upload" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                </svg>
            </div>
            <div class="yaposi-img-state">
                <svg class="yaposi-img-uploading" class="yaposi-spinning" viewBox="25 25 50 50" >
                    <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#70c542" stroke-width="10" />
                </svg>
                <svg class="yaposi-img-cross" viewBox="0 0 32 32">
                   <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z" fill="red"/>
                </svg>
            </div>
            <div class="yaposi-img-preview">
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
        this.droppperWrapper=wrapper.querySelector(".yaposi-img-dropper");
        this.droppperImg=this.droppperWrapper.querySelector(".yaposi-upload");
        this.me=wrapper;

        this.droppperWrapper.addEventListener("dragover",this.dragover);
        this.droppperWrapper.addEventListener("dragleave",this.dragleave);
        this.droppperWrapper.addEventListener("drop",this.drop);

        let input=this.droppperWrapper.querySelector("input");
        input.addEventListener("change",this.putFile);

        this.droppperImg.addEventListener("click",()=>{input.click();});
        let cancel=this.me.querySelector(".yaposi-img-actions .cancel");
        cancel.addEventListener("click",this.hide);

        this.insertBtn=wrapper.querySelector(".insert");
        this.insertBtn.addEventListener("click",this.insert);
        
        this.stateWrapper=wrapper.querySelector(".yaposi-img-state");
        this.stateUp=this.stateWrapper.querySelector(".yaposi-img-uploading");
        this.stateCross=this.stateWrapper.querySelector(".yaposi-img-cross");

        this.imgPreviewWrapper=wrapper.querySelector(".yaposi-img-preview");
        return wrapper
    }
    handle(){
        let cm        = this.codeMirrorTarget;
        let selection = cm.getSelection();
        if (selection=="" && this.uploadImg){
            this.show(); //there is implemented how to upload the image, use it if you know to do it
            return
        }
        if(selection.includes("http")){
            this.addURL(selection);
            return
        }
        console.log("Your selection must include an url");
    }
    show() {
        this.me.style.display="grid";
        setTimeout(()=>{this.me.style.transform="translate(-50%,-50%)";},0);
    }
    addURL(url){
        const number = this.getNumber();
        let cursor    = this.codeMirrorTarget.getCursor();
        let put=`![Image ${number}][${number}]\n`;

        //check if cursor, in principal editor, it's at the beginning, if not it jumps to new line.
        if (cursor.ch !== 0) {
            put = "\r\n\r\n" + put;
        }
        this.codeMirrorTarget.replaceSelection(put);

        let before=this.codeMirrorTarget.getValue();
        before+=`\r\n[${number}]: ${url} "random title" \n`;
        this.codeMirrorTarget.setValue(before);
        this.counting++;
    }
    async insert(){
        await this.uploadFile();
        const urlImg=this.imgURL;
        if(urlImg==""){
            console.log("No URL");
            return
        }
        this.addURL(urlImg);
        this.hide();
    }
    hide(){
        this.imgURL="";
        this.me.style.transform="translate(-50%,-730px)";
        this.me.addEventListener("transitionend",()=>{this.me.style.display="none";},{once:true});

        this.imgPreviewWrapper.style.display="none";
        this.droppperWrapper.style.display="flex";
        this.insertBtn.style.visibility="hidden";
        this.stateWrapper.style.display="none";
        this.stateUp.style.display="flex";
        this.stateCross.style.display="none";
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
    generateFetch(img){//this fits my needs, you should change it by your needs :D.
        const body= new FormData();
        body.append("c","1");
        body.append("img",img);
        return body
    }
    async uploadFile(){
        this.imgPreviewWrapper.style.display="none";
        this.insertBtn.style.visibility="hidden";
        this.stateWrapper.style.display="flex";
        this.stateUp.style.display="flex";
        
        const body = this.generateFetch(this.file);
        await fetch(this.urlToUpload,{credentials:"include",method:"post",body:body})
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
        })
        .catch((error)=>{
            this.stateCross.style.display="flex";
            this.stateUp.style.display="none";
            if(error=="server"){
                return
            }
            //handle the error
            console.log(error);
        });
    }
}
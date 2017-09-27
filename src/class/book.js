import { accessIndexDB } from '../util/indexDB'

export class Book {
    constructor(obj) {
        if(obj.url){
            Object.keys(obj).map((item)=>{this[item]=obj[item]})
            this.initMeta()
            this.userDefine = {}
            this.meta = {
            }
        }
        else{
            throw new Error("居然没有设置电子书的路径？")
        }
    }

    initReader() {
        this.reader = ePub({bookPath:this.url, restore:true})
    }

    async initMeta(){
        var epub = ePub({restore:true})
        if(!this.url){
            throw new Error("居然没有设置电子书的路径？")
        }
        epub.open(this.url)
        var meta = await epub.getMetadata()
        this.meta = meta
        this.meta.cover = await this.readCover(epub)
        

        return new Promise((resolve,reject)=>{
            resolve(meta)
        })
    }

    async readCover(epub,fileName){
        window.a = epub
        var imageUrl =  epub.contents.cover || epub.contents.manifest.cover.url
        var imageBlob = await epub.store.getUrl(imageUrl) || ""
        return new Promise((resolve,reject)=>{
            resolve(imageBlob)
        })
    }

    get title(){
        if(this.userDefine.title){
            return this.userDefine.title
        }
        else if(this.meta){
            return this.meta.bookTitle
        }
        return ""
    }

    set title(title){
        this.userDefine.title = title
    }

    get cover(){
        if(this.userDefine.cover){
            return this.userDefine.cover
        }
        else if(this.meta){
            return this.meta.cover
        }
        return ""
    }

    set cover(coverUrl){
        this.userDefine.cover = coverUrl
    }

    async updateUserData(){
        
    }

    async sendToLib(){

    }

    async sendToHistory(){
        var _this = this
        accessIndexDB().then(function(db){
            var transaction = db.transaction(['recentBooks'],'readwrite')
            transaction.oncomplete = (event)=>{}
            transaction.onerror = (event)=>{}
            var objectStore = transaction.objectStore("recentBooks")
            objectStore.add({url:_this.url,userDefine:_this.userDefine})
        })
    }
}
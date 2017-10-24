<template>
    <div class="reader-container">
        <div class="reader" ref="reader">
        </div>
    </div>
</template>
<style>
    .reader-container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 6em;
        box-sizing: border-box;
    }

    @media screen and (max-width: 580px) {
        .reader-container {
            padding: 0 2em;
        }
    }

    /* .buttonlist{
                flex: 0;
                bottom: 2em;
                left: 2em;
                -webkit-app-region: no-drag;
            } */

    .reader {
        max-width: 100%;
        width: 1400px;
        height: 80%;
        flex-shrink: 0;
        -webkit-app-region: no-drag;
        font-family: "default";
        user-select: none;
        pointer-events: none;
    }

    .reader>* {
        pointer-events: none;
    }
</style>

<script>
    import { updateBook, getBookMeta } from "../BookOps"
    import Rx from '@reactivex/rxjs'
    // import { do } from '@reactivex/rxjs/operator/do'
    export default {
        components: {

        },
        data() {
            return {
                book: null
            }
        },
        beforeDestroy(){
            document.removeEventListener('keydown', this.keyEvent, false)
            this.book = null
            this.$store._subscriber = []
        },
        async mounted() {
            var _this = this
            await this.loadBook()

            //初始化样式
            this.book.setStyle("font-family", "defaultText")

            if(this.book){
                this.setStyle(this.$store.state.reader.book)
            }

            //开始渲染
            
            let reader = this.$el.querySelector('.reader')
            this.book.renderTo(reader)           

            //初始化按键事件，在对应方法里处理
            //准备把按键改为主进程监听

            this.$el.addEventListener('wheel', this.keyEvent, false)
            this.$el.addEventListener('keydown', this.keyEvent, false)
            this.book.on("renderer:keydown", _this.keyEvent.bind(_this))

            //初始化store监听
            this.$store.subscribe((mutation, state)=>{
                if(this.$route.path == "/reader"){   
                    if(mutation.type == "SET_STYLE"){
                        let book = state.reader.book
                        this.setStyle(book)
                        updateBook(book)
                    }
                    else if(mutation.type == "SET_LASTREAD"){
                        let book = state.reader.book
                        updateBook(book)
                    }
                }
            })
            
            
            const boundSomeFunction = Rx.Observable.bindCallback(this.$store.subscribe)
            boundSomeFunction.call(this.$store)
            .do((mut) => console.log('I was sync!',mut))


            // 初始化阅读位置自动保存
            this.book.on('renderer:locationChanged',(location)=>{
                this.$store.commit("SET_LASTREAD",{cfi:location})
            })

        },
        methods: {
            setStyle(book){
                if(book.config && this.book){            
                    if(book.config["font-size"]){
                        this.book.setStyle("font-size", book.config["font-size"])
                    }
                    if(book.config["line-height"]){                    
                        this.book.setStyle("line-height", book.config["line-height"])
                    }
                }
            },
            keyEvent(event) {
                if (event.key == "ArrowDown" || event.key == "ArrowRight" || event.deltaX > 0 || event.deltaY > 0) {
                    console.log("下")
                    this.pageNext()
                }
                else if (event.key == "ArrowUp" || event.key == "ArrowLeft" || event.deltaX < 0 || event.deltaY < 0) {
                    console.log("上")
                    this.pagePrev()
                }
            },
            pageNext() {
                this.book.nextPage()

            },
            pagePrev() {
                this.book.prevPage()
            },
            async loadBook() {
                let bookData = this.$store.state.reader.book
                if (bookData) {
                    let cfi = bookData.lastRead
                    this.book = ePub(bookData.url)   
                    let meta = await getBookMeta(bookData.url)
                    document.title = meta.bookTitle  
                    if(cfi){
                        this.book.gotoCfi(cfi)
                    }     
                }
                else {
                    this.$router.push("/")
                }
            }
        },
        watch: {

        }
    }
</script>
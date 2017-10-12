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
        font-family: "思源宋体";
    }

    .reader>* {
        pointer-events: none;
    }
</style>

<script>
    import { updateBook } from "../BookOps"
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
            document.removeEventListener('mousewheel', this.keyEvent, false)
            this.book = null
            this.$store._subscriber = []
        },
        async mounted() {
            var _this = this
            await this.loadBook()
            if(this.book){
                this.setStyle(this.$store.state.reader.book)
            }
            //初始化按键事件，在对应方法里处理
            this.book.on("renderer:keydown", _this.keyEvent.bind(_this))
            this.book.on("renderer:mousewheel", _this.keyEvent.bind(_this))
            document.addEventListener('keydown', this.keyEvent, false)
            document.addEventListener('mousewheel', this.keyEvent, false)
            this.book.setStyle("font-family", "defaultText")
            this.$store.subscribe((mutation, state)=>{
                if(this.$route.path == "/reader"){   
                    if(mutation.type == "SET_STYLE"){
                        let book = state.reader.book
                        this.setStyle(book)
                        updateBook(book)
                    }
                }
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
                console.log("当前页", this.book)
                if (event.keyCode == 39 || event.keyCode == 40 || event.wheelDelta < 0) {
                    console.log("up")
                    this.pageNext()
                }
                else if (event.keyCode == 37 || event.keyCode == 38 || event.wheelDelta > 0) {
                    console.log("down")
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
                    this.book = await new ePub(bookData.url)
                    var reader = this.$el.querySelector('.reader')
                    this.book.renderTo(reader)
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
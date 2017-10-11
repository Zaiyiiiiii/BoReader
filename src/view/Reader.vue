<template>
    <div class="reader-container">
        <div class="reader" ref="reader">
        </div>
        <!-- <div class="buttonlist">
            <button @click="pagePrev">上一页</button>
            <button @click="pageNext">下一页</button>
        </div> -->
    </div>
</template>
<style>
    .reader-container{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding:0 6em;
        box-sizing: border-box;
    }
    /* .buttonlist{
        flex: 0;
        bottom: 2em;
        left: 2em;
        -webkit-app-region: no-drag;
    } */
    .reader{
        max-width: 100%;
        width:1400px;
        height: 80%;
        flex-shrink: 0;
        -webkit-app-region: no-drag;
        font-family: "思源宋体";
    }

    .reader > *{        
         pointer-events: none; 
    }
</style>

<script>
    import { Book } from '../class/book'
    export default {
        components:{
            
        },
        data () {
            return {
            }
        },
        mounted(){
            var _this = this
            this.loadBook()

            //初始化按键事件，在对应方法里处理
            this.$store.state.reader.book.reader.on("renderer:keydown",_this.keyEvent.bind(_this))
            this.$store.state.reader.book.reader.on("renderer:mousewheel",_this.keyEvent.bind(_this))
            document.addEventListener('keydown', this.keyEvent, false);
            document.addEventListener('mousewheel', this.keyEvent, false);

            this.$store.state.reader.book.reader.setStyle("font-family","defaultText")
            this.$store.state.reader.book.reader.setStyle("font-size","22px")
            //如果没有用户定义的样式：
            this.$store.state.reader.book.reader.setStyle("line-height","2.75em!important")
        },
        methods:{
            keyEvent(event){
                console.log("当前页",this.$store.state.reader.book.reader)
                if(event.keyCode == 39||event.keyCode == 40||event.wheelDelta < 0){
                    console.log("up")
                    this.pageNext()
                }
                else if(event.keyCode == 37||event.keyCode == 38||event.wheelDelta > 0){
                    console.log("down")
                    this.pagePrev()
                }
            },
            pageNext(){
                this.$store.state.reader.book.reader.nextPage()

            },
            pagePrev(){
                this.$store.state.reader.book.reader.prevPage()
            },
            loadBook(){
                if(this.$store.state.reader.book){      
                    this.$store.state.reader.book.initReader()
                    console.log(this.$store.state.reader.book)
                    var reader = document.querySelector('.reader')
                    this.$store.state.reader.book.reader.renderTo(reader)
                    this.$store.state.reader.book.reader
                    this.$store.state.reader.book.sendToHistory()
                }
                else{
                    this.$router.push("/")
                }
            }
        },
        watch:{

        }
    }
</script>
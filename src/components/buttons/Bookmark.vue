<template>
    <hovershow-button icon="../static/bookmark.svg" :hideIcon="false" @hoverin="getToc">
        <div class="content smooth-scrollbar">
            <!-- <toc-item @tocclick="sendRedirectRequest" v-for="(item,index) in toc" :toc="item" :key="index"></toc-item> -->
            <div class="bookmark-add"></div>
        </div>
    </hovershow-button>
</template>
<script>
    import TocItem from '../TocItem.vue'
    import HoverShowButton from '../HoverShowButton.vue'
    import SmoothScroll from "../../mixins/SmoothScroll.vue"
    export default {
        data() {
            return {
                toc: []
            }
        },
        mixins: [SmoothScroll],
        created() {
            this.$bus.on("tocMessage", (e) => {
                console.log(e)
                if (e) {
                    this.toc = e.toc
                }
            })
        },
        activated() {
            console.log("书签组件激活")
        },
        destroy() {
            this.$bus.off()
        },
        components: {
            "hovershow-button": HoverShowButton,
            "toc-item": TocItem
        },
        methods: {
            getToc() {
                this.$bus.emit("requestBookmarks")
            },
            sendRedirectRequest(cfi) {
                this.$bus.emit("redirectReaderByCFI", { cfi: cfi })
            }
        }
    }    
</script>
<style>
    .content {
        position: fixed;
        right: 60px;
        top: 1px;
        height: calc(100% - 2px);
        width: 320px;
        opacity: 1;
        -webkit-app-region: no-drag;
        padding: 2em 0 0 2em;
        overflow-x: hidden;
        overflow-y: auto;
        background: linear-gradient(
            to left,
            rgba(250, 250, 250, 0),
            rgba(240, 240, 235, 0.95) 30px,
            rgba(240, 240, 235, 0.95)
        );
        box-shadow: -2px 0 1px 1px rgba(100, 100, 100, 0.05);
    }
    .bookmark-add{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background: red
    }
</style>


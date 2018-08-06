<template>
    <hovershow-button icon="../static/bookmark.svg" :hideIcon="false" @hoverin="getBookmarks">
        <div class="bookmark-content">
            <div class="bookmark-items smooth-scrollbar">
                <bookmark-item @bookmarkdelete="deleteBookmark(item.time)" @bookmarkclick="sendRedirectRequest" v-for="(item,index) in bookmarks" :bookmark="item" :key="index"></bookmark-item>
            </div>
            <div class="bookmark-add" @click="addBookmark">
                <div>添加书签</div>
            </div>
        </div>
    </hovershow-button>
</template>
<script>
    import BookmarkItem from '../BookmarkItem.vue'
    import HoverShowButton from '../HoverShowButton.vue'
    import SmoothScroll from "../../mixins/SmoothScroll.vue"
    export default {
        data() {
            return {
                bookmarks: []
            }
        },
        mixins: [SmoothScroll],
        created() {
            this.$bus.on("bookmarkMessage", (e) => {
                console.log(e)
                if (e) {
                    this.bookmarks = e.bookmarks
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
            "bookmark-item": BookmarkItem
        },
        methods: {
            getBookmarks() {
                this.$bus.emit("requestBookmarks")
            },
            addBookmark() {
                this.$bus.emit("addBookmark")
            },
            deleteBookmark(time) {
                this.$bus.emit("deleteBookmark", { time: time })
            },
            sendRedirectRequest(cfi) {
                this.$bus.emit("redirectReaderByCFI", { cfi: cfi })
            }
        }
    }    
</script>
<style>
    .bookmark-content {
        position: fixed;
        right: 60px;
        top: 1px;
        height: calc(100% - 2px);
        width: 240px;
        opacity: 1;
        -webkit-app-region: no-drag;
        padding: 2em 0 0 2em;
        overflow: hidden;
        background: linear-gradient(
            to left,
            rgba(250, 250, 250, 0),
            rgba(240, 240, 235, 0.95) 30px,
            rgba(240, 240, 235, 0.95)
        );
        box-shadow: -2px 0 1px 1px rgba(100, 100, 100, 0.05);
    }
    .bookmark-items {
        overflow-x: hidden;
        overflow-y: auto;
        width: 100%;
        height: calc(100% - 74px - 2em);
        padding-bottom: 1.5em;
    }
    .bookmark-add {
        position: absolute;
        bottom: 40px;
        left: 0;
        width: calc(100% - 4px);
        height: 40px;
        text-align: center;
        line-height: 48px;
        font-family: "default";
        color: rgba(0, 0, 0, 0.6);
        cursor: pointer;
        text-align: center
    }
    .bookmark-add>div{
        border-top: 1px solid hsla(0, 0%, 20%, 0.06);
        display: inline-block;
        height: 100%;
        font-family: "default";
        width: 90%
    }
</style>


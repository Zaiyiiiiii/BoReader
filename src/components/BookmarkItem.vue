<template>
    <div class="bookmark-item" v-if="bookmark">
        <span @click="$emit('bookmarkdelete')" style="background: url('../static/deletebookmark.svg') center no-repeat;background-size:contain;" class="bookmark-delete"></span>
        <span @click="BookmarkClickHandler(bookmark.cfi)">{{new Date(bookmark.time).toLocaleString()}}</span>
    </div>
</template>
<style>
    .bookmark-item {
        height: 2.5em;
        color: rgba(28, 28, 26, 0.9);
        display: flex;
        align-items: center;
        user-select: none;
        font-size: 1.08em;
        color: rgba(0, 0, 0, 0.6)
    }
    .bookmark-item > span {
        font-family: "default";
        cursor: pointer;
    }
    .bookmark-delete {
        height: 1.2em;
        width: 1.2em;
        margin-right: 1.5em;
        filter: opacity(0.5);
        transition: all 0.2s;
    }
    .bookmark-delete:hover{
        filter: opacity(1);
    }
</style>
<script>
    export default {
        props: {
            bookmark: {
                default: undefined
            }
        },
        methods: {
            BookmarkClickHandler(cfi) {
                if (cfi) {
                    this.$emit('bookmarkclick', cfi)
                }
                else {
                    console.log("没找到对应的CFI")
                }
            }
        }
    }
</script>

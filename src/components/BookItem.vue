<template>
    <div v-if="meta" :class="{'book-hover':true}" class="bookitem-container" @click="click">
         <div v-if="meta.cover" class="bookitem-cover" :style="'background-image:url('+ meta.cover +')'"></div>
         <div v-else class="bookitem-cover bookitem-no-cover"><div class="bookitem-cover-title">{{meta.bookTitle}}</div></div>
         <div class="book-name">{{meta.title || meta.bookTitle}}</div>
    </div>
</template>
<style>
    .bookitem-container{
        width: 111px;
        height: 156px;
        position: relative;
    }
    .bookitem-cover{
        position: relative;
        z-index: 1;
        transition: transform 0.5s;
        width: 100%;
        height: 100%;
        background-size: cover;
        box-shadow: 1px 2px 3px 1px rgba(110, 110, 90, 0.1);
    }
    .book-hover:hover > .bookitem-cover{
        transform: translateY(-1em)
    }
    .book-hover:hover > .book-name{
        opacity: 1;
    }

    .bookitem-no-cover{
        box-sizing: border-box;
        font-size: 22px;
        padding: 1em 0 1em 1em;
        background: -webkit-linear-gradient(left, #f1f1f2 0%, #fffbf6 100%);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: bolder;
        text-transform: capitalize;
        overflow: visible;
    }

    .bookitem-cover-title{       
        width: 100%;
        height: 100%; 
        overflow: visible;
        background-image:  linear-gradient(to left, rgba(253, 13, 13, 0), rgba(103, 103, 103, 0.41));
        color: transparent;
        font-family: "default";
        -webkit-background-clip: text;
        background-clip: text;
        cursor: default;
        user-select: none;
    }

    .book-name{
        color:rgba(153, 153, 153, 1);
        transition: opacity 0.5s;
        position: absolute;
        display: inline-block;
        opacity: 0;
        bottom: -2em;
        line-height: 1.25em;
        height: 2.5em;
        font-size: 14px;
        width: 100%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical; 
        -webkit-box-align: center;
        /* -webkit-line-clamp: 1; */
        /* word-break: break-all; */
        font-family: "default";
        font-weight: lighter;
        cursor: default;
        user-select: none;
    }
</style>
<script>
import {bookIdMeta} from "../BookOps"
export default {
    props:{
        book:{
            default: undefined
        }
    },
    data(){
        return {
            meta: null
        }
    },
    methods:{
        click(){
            this.$emit('click')
        }
    },
    async mounted(){
        this.meta = await bookIdMeta(this.book._id)
    },
    computed:{

    }
}
</script>



<template>
    <div :class="{'book-hover':meta.cover}" class="bookitem-container" @click="click">
         <div v-if="meta.cover" class="bookitem-cover" :style="'background-image:url('+ meta.cover +')'"></div>
         <div class="book-name" v-if="meta.cover">{{meta.title || meta.bookTitle}}</div>
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
    .book-name{
        color:rgba(153, 153, 153, 1);
        transition: opacity 0.5s;
        position: absolute;
        opacity: 0;
        bottom: -2em;
        line-height: 1.25em;
        height: 2.5em;
        font-size: 14px;
        width: 100%;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical; 
        -webkit-box-align: center;
        -webkit-line-clamp: 2;
        word-break: break-all;
        font-family: "思源黑体";
        font-weight: lighter;
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



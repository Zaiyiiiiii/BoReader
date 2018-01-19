<template>
    <div class="tocitem-left" v-if="toc">
        <span @click="TocClickHandler(toc.cfi)">{{toc.label}}</span>
        <toc-item @tocclick="TocClickHandler" v-if="toc.subitems && toc.subitems.length>0" v-for="(subitem, index) in toc.subitems" :key="index" :toc="subitem">
        </toc-item>
    </div>
</template>
<style>
    .tocitem-left {
        padding-left: 1em;
        line-height: 2.5em;
        color: rgba(28, 28, 26, 0.9);
        user-select: none;
    }
    .tocitem-left > span {
        font-family: "default";
        cursor: pointer;
    }
</style>
<script>
    export default {
        name: "toc-item",
        props: {
            toc: {
                default: undefined
            }
        },
        methods: {
            TocClickHandler(cfi) {
                if(cfi){
                    this.$emit('tocclick', cfi)
                }
                else{
                    console.log("没找到对应的CFI")
                }
            }
        }
    }
</script>

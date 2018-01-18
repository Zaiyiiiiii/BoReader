<template>
    <base-button icon="../static/content.svg">
        <div @mouseover="setHover(true)" @mouseout="setHover(false)" style="height:100%;width:100%;">
            <div class="content" v-if="isHover">
                是的浪费空间谁动了附加费
            </div>
        </div>
    </base-button>
</template>
<script>
    import BaseButton from '../StandardButton.vue'
    export default {
        data() {
            return {
                isHover: false
            }
        },
        components: {
            "base-button": BaseButton
        },
        methods: {
            setHover(hover) {
                this.isHover = hover
                console.log(isHover ? "在！" : "不在！")
            }
        }
    }    
</script>
<style>
    .content {
        position: fixed;
        right: 20px;
        top: 0;
        height: 100%;
        width: 120px;
        background: red;
        opacity: 1;
    }
</style>


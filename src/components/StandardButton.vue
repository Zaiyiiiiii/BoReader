<template>
    <div @click="submitClick" class="button-standard" :style="'backgroundImage:'+iconStyleUrl">
        <slot></slot>
    </div>
</template>
<style>
    .button-standard{
        position: relative;
        border: 1.25em solid transparent;
        height: 1.5em;
        width: 1.5em;
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>

<script>
    export default {
        props:{
            icon:{
                default:""
            }
        },
        computed:{
            iconStyleUrl(){
                return "url('"+ this.icon +"')"
            }
        },
        methods:{
            submitClick(){
                this.$emit("click")
            }
        }
    }
</script>


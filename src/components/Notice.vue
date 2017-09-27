<template>
    <div class="notice-item" @click="eventHandler">
        {{text}}
    </div>
</template>
<script>
export default {
    props:{
        text:{
            type:String,
            default:"",
        },
        position:{
            default:""
        },
        type:{
            default:""
        },
        autoHide:{
            type:Number,
            default:0
        },
        index:{
            default:undefined
        }
    },
    methods:{
        eventHandler(){
            this.$emit('click')
            this.$emit('removeNotice',this.index)
        }
    },
    mounted(){
        if(this.autoHide){
            var _this = this
            setTimeout(function(){
                _this.$emit('removeNotice',_this.index)
            },this.autoHide)
        }
    }
}
</script>
<style>
    .notice-item{
        text-align: center;
        display: inline-block;
        background: rgba(255, 255, 255, 0.9);
        box-sizing: border-box;
        padding: 0.5em;
        height: 2em;
        border-radius: 5px;
        pointer-events: auto;
    }
</style>



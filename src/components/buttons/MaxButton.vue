<template>
    <base-button @click="setMax()" :icon="icon"></base-button>
</template>
<script>
import baseButton from '../StandardButton.vue'
export default {
    data(){
        return {
            max:false,
            window:{},
            maxicon:'../static/max.svg',
            restoreicon:'../static/restore.svg'
        }
    },
    components:{
        "base-button":baseButton 
    },
    computed:{
        icon(){
            return this.max?this.restoreicon:this.maxicon
        }
    },
    mounted(){
        const electron = require('electron')
        this.window = electron.remote.getCurrentWindow()
        this.window.on("enter-full-screen",()=>{this.max = true})
        this.window.on("leave-full-screen",()=>{this.max = false})
    },
    methods:{
        setMax(){
            this.window.setFullScreen(!this.max)
        }
    }
}
</script>


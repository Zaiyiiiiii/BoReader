<template>
    <base-button @click="exit" icon="../static/close-window.svg"></base-button>
</template>
<script>
import baseButton from '../StandardButton.vue'
export default {
    components:{
        "base-button":baseButton
    },
    methods:{
        exit(){
            console.log("sss")
            const { app } = require('electron').remote
            app.quit()
        }
    }
}
</script>


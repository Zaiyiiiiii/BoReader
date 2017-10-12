<template>
    <base-button @click="toLib" icon="../static/lib.svg"></base-button>
</template>
<script>
import baseButton from '../StandardButton.vue'
export default {
    components:{
        "base-button":baseButton
    },
    methods:{
        toLib(){
            this.$router.push("/")
        }
    }
}
</script>


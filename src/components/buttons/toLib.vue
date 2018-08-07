<template>
    <hovershow-button icon="../static/lib.svg" :hideIcon="false">
        <div @click="toLib" class="tolib">
            书架
        </div>
    </hovershow-button>
</template>
<style>
    .tolib {
        color: #7e8282;
        font-family: "default";
        font-weight: lighter;
        height: 100%;
        line-height: 64px;
        font-size: 1.25em;
        width: 80px;
        opacity: 1;
        overflow-x: hidden;
        overflow-y: auto;
        background: linear-gradient(
            to left,
            rgba(250, 250, 250, 0),
            rgba(240, 240, 235, 0.95) 30px,
            rgba(240, 240, 235, 0.95)
        );
        -webkit-app-region: no-drag;
        overflow: visible;
        box-sizing: border-box;
        background: linear-gradient(
            to right,
            rgba(250, 250, 250, 0),
            rgba(250, 250, 250, 0.6) 18%,
            rgba(250, 250, 250, 0.9) 40%,
            rgba(250, 250, 250, 0)
        );
        position: absolute;
        top: 0;
        right: 1em;
    }
</style>
<script>
    import HoverShowButton from '../HoverShowButton.vue'
    export default {
        components: {
            "hovershow-button": HoverShowButton
        },
        methods: {
            toLib() {
                this.$router.push("/")
            }
        }
    }
</script>


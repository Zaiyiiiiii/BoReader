<template>
    <hovershow-button icon="../static/lineheight.svg" :hideIcon="true">
        <div class="lineheight-selector">
            <span>行距</span>
            <input type="number" min="0" step="0.05" v-model="lineHeight" @change="changeLineHeight()">
        </div>
    </hovershow-button>
</template>
<style>
    .lineheight-selector {
        -webkit-app-region: no-drag;
        height: 100%;
        width: 140px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        overflow: visible;
        padding-right: 20px;
        box-sizing: border-box;
        background: linear-gradient(
            to right,
            rgba(250, 250, 250, 0),
            rgba(250, 250, 250, 0.6) 18%,
            rgba(250, 250, 250, 0.9) 60%,
            rgba(250, 250, 250, 1)
        );
        position: absolute;
        top: 0;
        right: 0;
    }

    .lineheight-selector>* {
        color: #7E8282;
        font-family: "default";
        font-weight: lighter;
    }

    .lineheight-selector>input {
        font-size: 1.15em;
        height: 100%;
        width: 1.85em;
        outline: none;
        border: none;
        padding: 0;
        margin: 0;
        background: none;
        text-align: right;
        /* text-decoration-line: underline; */
    }

    .lineheight-selector>span {
        font-size: 1.25em;
        white-space: nowrap;
        padding-right: 0.35em;
        user-select: none;
        cursor: default;
    }

    .lineheight-selector>input[type=number]::-webkit-inner-spin-button {
        /* background: none;
        opacity: 1; */
        -webkit-appearance: none;
    }
</style>

<script>
    import hoverShowButton from '../HoverShowButton.vue'
    export default {
        data() {
            return {
                lineHeight: 0
            }
        },
        components: {
            "hovershow-button": hoverShowButton
        },
        methods: {
            changeLineHeight() {
                this.$store.commit("SET_STYLE",{styleName: "line-height", value: this.lineHeight})
            },
            async initLineHeight(){
                return await this.$store.dispatch("getStyles", {styleName:"line-height", comp:this})
            }
        },
        async mounted() {
            //应该改成异步获取事件来修改值，暂时先循环检查
            this.lineHeight = await this.initLineHeight() || 1.8
            this.changeLineHeight()
        }
    }
</script>


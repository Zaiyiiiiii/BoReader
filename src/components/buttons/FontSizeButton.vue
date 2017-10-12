<template>
    <hovershow-button icon="../static/font-size.svg">
        <div class="fontsize-selector">
            <span>字号</span>
            <input type="number" min="0" step="1" v-model="fontSize" @change="changeFontSize()">
        </div>
    </hovershow-button>
</template>
<style>
    .fontsize-selector {
        height: 100%;
        width: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        overflow: visible;
    }

    .fontsize-selector>* {
        color: #7E8282;
        font-family: "default";
        font-weight: lighter;
    }

    .fontsize-selector>input {
        font-size: 1.15em;
        height: 100%;
        width: 1.85em;
        outline: none;
        border: none;
        padding: 0;
        margin: 0;
        background: none;
        text-align: center;
        /* text-decoration-line: underline; */
    }

    .fontsize-selector>span {
        font-size: 1.25em;
        white-space: nowrap;
        padding-right: 0.3em;
        text-shadow: 20px 0px rgba(246, 246, 241, 1);
    }

    .fontsize-selector>input[type=number]::-webkit-inner-spin-button {
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
                fontSize: 0
            }
        },
        components: {
            "hovershow-button": hoverShowButton
        },
        methods: {
            changeFontSize() {
                this.$store.commit("SET_STYLE",{styleName: "font-size", value: this.fontSize})
            },
            async initFontSize(){
                return await this.$store.dispatch("getStyles", {styleName:"font-size", comp:this})
            }
        },
        async mounted() {
            //应该改成异步获取事件来修改值，暂时先循环检查
            this.fontSize = await this.initFontSize() || 16
            this.changeFontSize()
        }
    }
</script>


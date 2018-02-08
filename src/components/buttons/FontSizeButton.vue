<template>
    <hovershow-button icon="../static/font-size.svg" :hideIcon="true">
        <div class="fontsize-selector">
            <span>字号</span>
            <input type="number" min="0" step="1" v-model="fontSize" @change="changeFontSize()">
        </div>
    </hovershow-button>
</template>
<style>
    .fontsize-selector {
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
            hsla(0, 0, 98%, 0),
            hsla(0, 0, 98%, 0.6) 18%,
            hsla(0, 0, 98%, 0.9) 60%,
            hsla(0, 0, 98%, 1)
        );
        position: absolute;
        top: 0;
        right: 0;
    }

    .fontsize-selector > * {
        color: #7e8282;
        font-family: "default";
        font-weight: lighter;
    }

    .fontsize-selector > input {
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

    .fontsize-selector > span {
        font-size: 1.25em;
        white-space: nowrap;
        padding-right: 0.35em;
        text-shadow: 20px 0px rgba(246, 246, 241, 1);
        user-select: none;
        cursor: default;
    }

    .fontsize-selector > input[type="number"]::-webkit-inner-spin-button {
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
                this.$store.commit("SET_STYLE", { styleName: "font-size", value: this.fontSize })
            },
            async initFontSize() {
                return await this.$store.dispatch("getStyles", { styleName: "font-size", comp: this })
            }
        },
        async mounted() {
            //应该改成异步获取事件来修改值，暂时先循环检查
            this.fontSize = await this.initFontSize() || 16
            this.changeFontSize()
        }
    }
</script>


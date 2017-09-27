<template>
    <hovershow-button icon="../static/lineheight.svg">
        <div class="lineheight-selector">
            <span>行距</span>
            <input type="number" min="0" step="0.05" v-model="lineHeight" @change="changeLineHeight()">
        </div>
    </hovershow-button>
</template>
<style>
    .lineheight-selector {
        height: 100%;
        width: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        overflow: visible;
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
        text-align: center;
        /* text-decoration-line: underline; */
    }

    .lineheight-selector>span {
        font-size: 1.25em;
        white-space: nowrap;
        padding-right: 0.3em;
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
                this.$store.state.reader.book.reader.setStyle("line-height", this.lineHeight + "em")
            }
        },
        mounted() {
            //应该改成异步获取事件来修改值，暂时先循环检查
            var initlineHeight = () => {
                console.log("get font size")
                if (this.$store.state.reader.book.reader) {
                    setTimeout(() => {
                        var lineHeight = this.$store.state.reader.book.reader.renderer.doc.body.style.lineHeight
                        console.log(lineHeight)
                        this.lineHeight = lineHeight.slice(0, lineHeight.length - 2)
                    }, 300)
                }
                else {
                    setTimeout(() => {
                        initlineHeight()
                    }, 300)
                }
            }
            initlineHeight()
        }
    }
</script>


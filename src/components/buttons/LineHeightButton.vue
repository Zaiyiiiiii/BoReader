<template>
    <hovershow-button icon="../static/lineheight.svg" :hideIcon="true">
        <div class="hovershow-selector">
            <span>行距</span>
            <input type="number" min="0" step="0.05" v-model="lineHeight" @change="changeLineHeight()">
        </div>
    </hovershow-button>
</template>
<style>
</style>

<script>
    import hoverShowButton from '../HoverShowButton.vue'
    import hoverShow from '../../mixins/hovershow.vue'
    export default {
        data() {
            return {
                lineHeight: 0
            }
        },
        mixins:[hoverShow],
        components: {
            "hovershow-button": hoverShowButton
        },
        methods: {
            changeLineHeight() {
                this.$store.commit("SET_STYLE", { styleName: "line-height", value: this.lineHeight })
            },
            async initLineHeight() {
                return await this.$store.dispatch("getStyles", { styleName: "line-height", comp: this })
            }
        },
        async mounted() {
            //应该改成异步获取事件来修改值，暂时先循环检查
            this.lineHeight = await this.initLineHeight() || 1.8
            this.changeLineHeight()
        }
    }
</script>


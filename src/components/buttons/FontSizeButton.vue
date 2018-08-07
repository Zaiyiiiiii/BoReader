<template>
    <hovershow-button icon="../static/font-size.svg" :hideIcon="true">
        <div class="hovershow-selector">
            <span>字号</span>
            <input type="number" min="0" step="1" v-model="fontSize" @change="changeFontSize()">
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
                fontSize: 0
            }
        },
        mixins:[hoverShow],
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


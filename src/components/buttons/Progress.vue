<template>
    <hovershow-button icon="../static/progress.svg" :hideIcon="true">
        <div class="hovershow-selector" style="padding-right:0.5em">
            <input style="width:auto;font-size: 1.25em;padding-right:0.5em" v-if="current" type="number" min="1" :max="total" step="1" v-model="current" @change="changeFontSize()">
            <span v-else>…</span>
            <span>{{"/ "+(total||"…")}}</span>
        </div>
    </hovershow-button>
</template>
<style>
</style>
<script>
    import hoverShowButton from '../HoverShowButton.vue'
    import hoverShow from '../../mixins/hovershow.vue'
    import { setTimeout } from 'timers';
    export default {
        data() {
            return {
                total: undefined,
                current: undefined,
                bookLoaded: false
            }
        },
        mixins: [hoverShow],
        components: {
            "hovershow-button": hoverShowButton
        },
        methods: {
            changeFontSize() {
                this.$bus.emit("changePage",this.current)
            }
        },
        mounted() {
            //应该改成异步获取事件来修改值，暂时先循环检查
            // this.changeFontSize()
            this.$bus.on("currentProgress", ({ total, current }) => {
                this.bookLoaded = true
                if (total && current) {
                    this.total = total
                    this.current = current
                }
                else {
                    console.log("进度读取错误")
                    this.total = undefined
                    this.current = undefined
                }
            })
        }
    }
</script>


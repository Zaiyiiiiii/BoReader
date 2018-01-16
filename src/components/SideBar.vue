<template>
    <div class="sidebar-container">
        <div class="sidebar-button" v-for="button in staticButtons" :key="button">
            <component :is="button"></component>
        </div>
        <div class="sidebar-button" v-for="button in routeButtons" :key="button">
            <component :is="button"></component>
        </div>
        <slot name="buttons">
        </slot>
    </div>
</template>
<style>
    /*三种状态 unhover hover(hover-show：hover时出现,hover-unshow：默认) 展开状态 */

    .sidebar-container {
        z-index: 100;
        -webkit-app-region: no-drag;
        min-width: 4em;
        height: 100%;
        opacity: 0;
        transition: opacity 0.5s;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 30%, rgba(210, 210, 200, 0.3) 65%, rgba(210, 210, 200, 0.8)); */
        background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(246, 246, 241, 0.8) 30%, rgba(230, 230, 220, 0.9) 65%, rgba(220, 220, 210, 0.9));
        overflow-y: visible
    }
    .sidebar-container:hover {
        opacity: 1;
    }

    .sidebar-container>button:hover {
        color: red
    }

    .sidebar-container>button {
        flex-shrink: 0;
    }
    .sidebar-button{
        padding: 0;
        align-self: stretch;
        transition: all 0.2s;
        opacity: 0.5;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        min-width: 0;
    }
    .sidebar-button:hover {
        box-shadow: 20px 0px 30px 0px rgba(0, 0, 0, 0.2);
        opacity: 1;
        background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2) 30%, rgba(255, 255, 255, 0.55) 65%, rgba(255, 255, 255, 0.9));
    }
</style>
<script>
    import exitButton from './buttons/ExitButton.vue'
    import maxButton from './buttons/MaxButton.vue'
    import fontSizeButton from './buttons/FontSizeButton.vue'
    import lineHeightButton from './buttons/LineHeightButton.vue'
    import toLib from './buttons/toLib.vue'

    export default {
        data() {
            return {
                height: 0,
                staticButtons: ["exit", "max"]
            }
        },
        computed: {
            routeButtons() {
                return this.$route.meta.sideBarButtons
            },
            maxButton() {
                return this.height
            }
        },
        methods: {
            computeHeight() {
                this.height = this.$el.offsetHeight
            }
        },
        components: {
            "exit": exitButton,
            "max": maxButton,
            "font-size": fontSizeButton,
            "line-height": lineHeightButton,
            "to-lib": toLib
        },
        mounted() {
            this.computeHeight()
            window.addEventListener("resize", this.computeHeight)
            //傻逼浏览器，不支持单个DOM元素的resize事件，还是IE好
        }
    }
</script>



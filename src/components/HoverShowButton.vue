<template>
    <base-button class="hovershow-button" :icon="icon" :style="(isHover && hideIcon)?'background: transparent !important;':''">
        <div class="hovershow-content" ref="hovercontent" :class="{'hovershow-content-hover':isHover}" @mouseover="setHover(true)" @mouseleave="setHover(false)">
            <transition name="hoverbutton" mode="out-in">
                <slot v-if="isHover"></slot>
            </transition>
        </div>
    </base-button>
</template>
<style>
    .hovershow-button:hover {
    }

    .hovershow-content {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        -webkit-app-region: no-drag;
        /* overflow-y: visible; */
    }
    .hovershow-content-hover {
        transition: all 0.3s;
        background: linear-gradient(
            to right,
            rgba(250, 250, 250, 0),
            rgba(250, 250, 250, 0.6) 20%,
            rgba(250, 250, 250, 0.9) 65%,
            rgba(250, 250, 250, 1)
        );
    }
    .hoverbutton-enter-active,
    .hoverbutton-leave-active {
        transition: all 0.3s;
        filter: opacity(1);
    }
    .hoverbutton-enter,
    .hoverbutton-leave-to {
        transform: translateX(1em);
        filter: opacity(0);
    }
</style>
<script>
    import baseButton from './StandardButton.vue'
    import Hover from '../mixins/hover.vue'
    export default {
        props: {
            icon: {
                default: ""
            },
            hideIcon: {
                default: true
            }
        },
        mixins: [Hover],
        components: {
            "base-button": baseButton
        },
        methods: {
            stopMouseEvent(e) {
                e.stopPropagation()
                return false
            }
        },
        mounted() {
            var element = this.$refs.hovercontent
            element.addEventListener("mousewheel", this.stopMouseEvent, false)
        }
    }
</script>


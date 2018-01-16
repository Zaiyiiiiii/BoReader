<template>
    <base-button class="hovershow-button" :icon="icon">
        <div class="hovershow-content" ref="hovercontent">
            <slot></slot>
        </div>
    </base-button>
</template>
<style>
    .hovershow-button:hover {
        background: transparent !important;
    }
    .hovershow-button:hover > .hovershow-content {
        opacity: 1;
        transition: all 0.2s;
        pointer-events: auto;
        background: linear-gradient(
            to right,
            rgba(250, 250, 250, 0),
            rgba(250, 250, 250, 0.6) 20%,
            rgba(250, 250, 250, 0.9) 65%,
            rgba(250, 250, 250, 1)
        );
    }
    .hovershow-content {
        opacity: 0;
        pointer-events: none;
        position: absolute;
        top: 0;
        right: 0;
        padding-right: 20px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow-y: visible;
    }
</style>

<script>
    import baseButton from './StandardButton.vue'
    export default {
        props: {
            icon: {
                default: ""
            }
        },
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


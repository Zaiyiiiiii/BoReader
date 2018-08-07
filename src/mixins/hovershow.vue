<template>

</template>

<style>
    .hovershow-selector {
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

    .hovershow-selector > * {
        color: #7e8282;
        font-family: "default";
        font-weight: lighter;
    }

    .hovershow-selector > input {
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

    .hovershow-selector > span {
        font-size: 1.25em;
        white-space: nowrap;
        padding-right: 0.35em;
        user-select: none;
        cursor: default;
    }

    .hovershow-selector > input[type="number"]::-webkit-inner-spin-button {
        /* background: none;
                opacity: 1; */
        -webkit-appearance: none;
    }
</style>

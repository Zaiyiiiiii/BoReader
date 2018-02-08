<style>
    .smooth-scrollbar::-webkit-scrollbar {
        height: 2px;
        width: 2px;
    }

    .smooth-scrollbar::-webkit-scrollbar-track {
        border-radius: 2px;
        background-color: hsla(0°, 0%, 78.4%, 0);
        transition: all 0.5s;
    }

    .smooth-scrollbar:hover::-webkit-scrollbar-track {
        border-radius: 2px;
        background-color: hsla(0, 0%, 78.4%, 0.4);
    }

    .smooth-scrollbar::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background-color: rgba(136, 136, 136, 0.2);
        transition: all 0.5s;
    }

    .smooth-scrollbar:hover::-webkit-scrollbar-thumb {
        background-color: rgba(136, 136, 136, 0.8);
    }

    .smooth-scrollbar:window-inactive::-webkit-scrollbar-thumb {
        background-color: rgba(100, 100, 100, 0.4);
    }
</style>

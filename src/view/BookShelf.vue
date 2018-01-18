<template>
    <div class="library">
        <section class="shelf-recent">
            <h1>最近阅读</h1>
            <div class="shelf-recent-list">
                <div class="bookitem-container shelf-newbook" @click="open()" style="background-image:url('../static/addbook.svg')">
                </div>
                <div class="shelf-recent-items-container smooth-scrollbar">
                    <div class="shelf-recent-items">
                        <book-item class="shelf-recent-item" v-for="(book,index) in bookList" :book="book" @click="open(book)" :key="index"></book-item>
                    </div>
                </div>
            </div>
        </section>
        <div class="version" @click="versionClick" :style="playing?'opacity:1;bottom:3.5em;':''">
            {{packageInfo.current_version}}
        </div>
        <transition name="versionmusic" mode="out-in">
            <div class="version version-music" style="opacity:1;" @click="versionClick" v-if="playing && versionMusicMeta">
                ► {{versionMusicMeta.title}} - {{versionMusicMeta.artist}}
            </div>
        </transition>
    </div>
</template>
<style>
    .library {
        box-sizing: border-box;
        padding-top: 3.5em;
        width: 100%;
        height: 100%;
        overflow: hidden;
        -webkit-app-region: drag;
    }

    .version {
        -webkit-app-region: no-drag;
        position: fixed;
        left: 2em;
        bottom: 1.5em;
        color: rgba(180, 180, 160, 0.8);
        cursor: pointer;
        opacity: 0;
        user-select: none;
        transition: all 0.6s;
    }

    .version-music {
        font-family: "default";
        font-size: 14px;
        text-indent: 0.6em;
        padding-right: 0.6em;
        border-right: 2px solid currentColor;
    }

    .version:hover {
        opacity: 1;
    }

    .version-playing {
        opacity: 1;
    }

    .versionmusic-enter-active,
    .versionmusic-leave-active {
        transition: all 0.6s;
        opacity: 1;
    }
    .versionmusic-enter,
    .versionmusic-leave-to {
        transform: translateX(5em);
        color: rgba(0, 0, 0, 0);
    }

    .shelf-recent {
        width: 100%;
        position: relative;
        background: rgba(255, 255, 249, 1);
        padding: 0.3em 2em 0 2em;
        box-sizing: border-box;
        -webkit-app-region: no-drag;
    }

    .shelf-recent > h1 {
        font-family: "default";
        font-weight: lighter;
        user-select: none;
        cursor: default;
    }

    .shelf-recent-list {
        width: 100%;
        display: flex;
    }

    .shelf-newbook {
        box-sizing: border-box;
        border: 4px dashed rgba(220, 220, 210, 1);
        color: rgba(220, 220, 210, 1);
        margin-right: 2em;
        background-position: center center;
        background-size: 2.5em;
        background-repeat: no-repeat;
        flex-shrink: 0;
        width: 111px;
        height: 156px;
    }

    .shelf-recent-items {
        display: flex;
        flex: auto;
        overflow: visible;
        height: calc(165px + 2em);
    }
    .shelf-recent-items-container {
        position: relative;
        padding-top: 2em;
        top: -2em;
        overflow-x: auto;
    }

    .shelf-recent-item {
        margin-right: 2em;
        flex-shrink: 0;
    }
    .shelf-recent-item:last-child {
        margin-right: 10em;
    }

    .smooth-scrollbar::-webkit-scrollbar {
        height: 2px;
    }

    .smooth-scrollbar::-webkit-scrollbar-track {
        border-radius: 2px;
        background-color: rgba(200, 200, 200, 0);
        transition: all 0.5s;
    }

    .smooth-scrollbar:hover::-webkit-scrollbar-track {
        border-radius: 2px;
        background-color: rgba(200, 200, 200, 0.4);
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
<script>
    import { mapGetters } from "vuex"
    import bookItem from "../components/BookItem.vue"
    import { getHistory } from "../util/indexDB"
    import { openBook, getRecentBooks, idToBook, updateBook } from "../BookOps"
    import packageInfo from "../../package.json"
    import { resolve } from 'url';
    import jsmediatags from "jsmediatags"
    export default {
        computed: {},
        components: {
            "book-item": bookItem
        },
        data() {
            return {
                msg: "打开",
                bookList: [],
                packageInfo: packageInfo,
                playing: false,
                versionMusic: null,
                versionMusicMeta: null
            }
        },
        mounted: async function () {
            console.log(packageInfo)
            this.bookList = await getRecentBooks()
        },
        beforeDestroy() {
            if (this.playing) {
                this.playing = false
                this.versionMusic.pause()
                this.versionMusic = null
            }
        },
        methods: {
            bufferToArrayBuffer(buffer) {
                var arrayBuffer = new ArrayBuffer(buffer.length)
                var view = new Uint8Array(arrayBuffer)
                for (var i = 0; i < buffer.length; ++i) {
                    view[i] = buffer[i]
                }
                return arrayBuffer
            },
            readMusicMeta() {
                return new Promise((resolve, reject) => {
                    jsmediatags.read("./resources/app.asar/static/sound/RubberBand - 发现号.mp3", {
                        onSuccess: (tag) => {
                            resolve({
                                title: tag.tags.title,
                                artist: tag.tags.artist
                            })
                        },
                        onError: function (error) {
                            console.log(':(', error.type, error.info);
                        }
                    })
                })
            },
            versionClick() {
                if (this.playing) {
                    this.playing = false
                    this.versionMusic.pause()
                }
                else {
                    this.playing = true
                    if (!this.versionMusic) {
                        this.versionMusic = new Audio()
                        this.versionMusic.src =
                            "../static/sound/RubberBand - 发现号.mp3"
                    }
                    if (!this.versionMusicMeta) {
                        this.readMusicMeta().then((meta) => {
                            this.versionMusicMeta = meta
                        })
                    }
                    this.versionMusic.play()
                }
            },
            openBookFile() {
                return new Promise((resolve, reject) => {
                    const { dialog } = require("electron").remote
                    dialog.showOpenDialog(
                        {
                            properties: ["openFile"],
                            filters: [
                                {
                                    name: "Epub格式",
                                    extensions: ["epub"]
                                }
                            ]
                        },
                        function (files) {
                            resolve(files[0])
                        }
                    )
                })
            },
            async open(book) {
                let url =
                    (book ? await idToBook(book._id) : false) ||
                    (await this.openBookFile())
                let bookData = await openBook(url)
                console.log(this.$store)
                this.$store.commit("SET_BOOK", { book: bookData })
                this.$router.push("reader")
            }
        }
    }
</script>

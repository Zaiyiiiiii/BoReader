<template>
    <div class="library">
        <section class="shelf-recent">
            <h1>最近阅读</h1>
            <div class="shelf-recent-list">
                <div class="bookitem-container shelf-newbook" @click="open()" style="background-image:url('../static/addbook.svg')">
                </div>
                <book-item class="shelf-recent-item" v-for="(book,index) in bookList" :book="book" @click="open(book)" :key="index"></book-item>
            </div>
        </section>
        <router-link to="reader">fff</router-link>
    </div>
</template>
<style>
    .library {
        box-sizing: border-box;
        margin-top: 3.5em;
        width: 100%;
        overflow: hidden;
        -webkit-app-region: no-drag;
    }

    .shelf-recent {
        width: 100%;
        position: relative;
        background: rgba(255, 255, 249, 1);
        padding: 0.3em 2em 3em 2em;
    }

    .shelf-recent>h1 {
        font-family: "default";
        font-weight: lighter;
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

    .shelf-recent-item {
        margin-right: 2em;
        flex-shrink: 0;
    }
</style>
<script>

    import { mapGetters } from 'vuex'
    import bookItem from '../components/BookItem.vue'
    import { getHistory } from '../util/indexDB'
    import { openBook, getRecentBooks, idToBook, updateBook } from '../BookOps'
    export default {
        computed: {
        },
        components: {
            "book-item": bookItem
        },
        data() {
            return {
                msg: '打开',
                bookList: []
            }
        },
        mounted: async function() {
            this.bookList = await getRecentBooks()
        },
        methods: {
            openBookFile() {
                return new Promise((resolve, reject) => {
                    const { dialog } = require('electron').remote
                    dialog.showOpenDialog({
                        properties: ['openFile'],
                        filters: [
                            {
                                name: 'Epub格式',
                                extensions: ['epub']
                            }
                        ]
                    }, function(files) {
                        resolve(files[0])
                    })
                })
            },
            async open(book) {
                let url = (book ? await idToBook(book._id) : false) || await this.openBookFile()
                let bookData = await openBook(url)
                console.log(this.$store)
                this.$store.commit("SET_BOOK", { book: bookData })
                this.$router.push("reader")
            }
        }
    }
</script>
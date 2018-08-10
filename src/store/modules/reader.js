const state = {
    book: null
}

const getters = {
    bookmarks() {
        return state.book.bookmark ? state.book.bookmark : []
    }
}

const actions = {
    // getPage
    getStyles({ state }, { styleName, comp }) {
        if (state.book.config && state.book.config[styleName]) {
            return state.book.config[styleName]
        }
        else {
            // 电子书的制作质量参差不齐，样式表的写法也大相径庭，Body的Style提出不出正确的信息。。。
            // 所以暂时不用
            // console.log(comp)
            // let reader = comp.$root.$children[0].$refs.router.book
            // let readerStyle = reader.renderer.doc.body.style[styleName]
            // let result = readerStyle.match(/^\d+(\.\d+)?/g) //提取数字部分
            // if (result) {
            //     return result
            // }
            // else {
            return false
            // 导入默认值
            // }
        }
    }

}

const mutations = {
    SET_BOOK(state, { book }) {
        state.book = book
        Object.assign(state.book, {})
    },
    SET_STYLE(state, { styleName, value }) {
        if (!state.book.config) {
            state.book.config = {}
        }
        state.book.config[styleName] = value
        Object.assign(state.book.config, {})
    },
    SET_LASTREAD(state, { cfi }) {
        state.book.lastRead = cfi
    },
    ADD_BOOKMARK(state, { cfi }) {
        state.book.bookmark.push({ cfi: cfi, time: new Date() })
    },
    DELETE_BOOKMARK(state, { time }) {
        let index = state.book.bookmark.findIndex((item) => {
            item.time = time
        })
        state.book.bookmark.splice(index, 1)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
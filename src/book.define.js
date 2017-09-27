const book = {
    config:{
        fontSize: 12,
        lineHeight: 1.1
    },
    url:"",
    urlhash:"",
    bookmark:[],
    lastRead:""
}


const history = []

const library = []

const store = {
    currentBook: ePub(),    

}

// 书架界面：初始化History和Lib
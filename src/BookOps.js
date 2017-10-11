//初始化PouchDB
// const PouchDB = require('electron').remote.require('pouchdb');
import PouchDB from 'pouchdb-browser'
import PouchDBFind from 'pouchdb-find'
PouchDB.plugin(PouchDBFind)

export const DB = {
    lib: new PouchDB('lib'),
    recent: new PouchDB('recent'),
    books: new PouchDB('books'),
    init: () => {
        console.log(DB.books)
        DB.books.createIndex({
            index: {
                fields: ['url']
            }
        }).then(function (result) {
            console.log(result)
        }).catch(function (err) {
            console.log(err)
        });
    }
}

export const openBook = (url) => {
    //先看数据库里有没有 如果有 直接读取书籍信息 如果没有先添加到数据库，然后读取信息
    //
    let hasBook = ifBookExist(url)
    if(!hasBook){
        writeNewBookData(url)
    }
    return readBookData()
}

const ifBookExist = async (url) => {
    let result = await DB.books.find({
        selector: { url: 'url' },
        fields: ['name']
    });
    return result.length > 0 ? true : false
}

export const writeNewBookData = (url) => {
    return new Promise((resolve, reject) => {
        DB.book.put({
            url: url,
            // urlhash:"",
            bookmark: [],
            addTime: new Date(),
            lastRead: ""
        }).then(function (response) {
            resolve(response)
        }).catch(function (err) {
            reject(err)
        });
    })
}

export const readBookData = async (url) => {
    let result = await DB.books.find({
        selector: { url: 'url' },
        fields: ['name']
    });
    return result.doc[0]
}
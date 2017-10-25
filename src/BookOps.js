//初始化PouchDB
// const PouchDB = require('electron').remote.require('pouchdb');
import PouchDB from 'pouchdb-browser'
import PouchDBFind from 'pouchdb-find'
import MD5 from 'md5'

export const defaultName = "Bo"

PouchDB.plugin(PouchDBFind)

export const DB = {
    lib: new PouchDB('lib'),
    recent: new PouchDB('recent'),
    books: new PouchDB('books'),
    init: () => {
        DB.books.createIndex({
            index: {
                fields: ['url']
            }
        }).then(function (result) {
            console.log(result.result == "exists" ? "已初始化数据库" : result)
        }).catch(function (err) {
            console.log(err)
        });

        DB.recent.createIndex({
            index: {
                fields: ['order']
            }
        }).then(function (result) {
            console.log(result.result == "exists" ? "已初始化最近阅读信息" : result)

        }).catch(function (err) {
            console.log(err)
        });
    }
}

export const openBook = async (url) => {
    //先看数据库里有没有 如果有 直接读取书籍信息 如果没有先添加到数据库，然后读取信息

    let hasBook = await ifBookExist(url)
    console.log(await hasBook ? "书籍已添加过" : "书籍不存在")
    if (!hasBook) {
        writeNewBookData(url)
        console.info("新的书籍信息已添加")
    }

    // 添加到最近阅读过的书里
    let bookData = await readBookData(url)
    saveToRecent(bookData)
    return bookData
}

const ifBookExist = async (url) => {
    let result = await DB.books.find({
        selector: { url: url }
    });
    return result.docs.length > 0 ? true : false
}

export const writeNewBookData = (url) => {
    return new Promise((resolve, reject) => {
        DB.books.put({
            _id: MD5(url),
            url: url,
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
        selector: { url: url }
    })
    return result.docs[0]
}

export const getRecentBooks = async (count) => {
    let recentBooks = await DB.recent.find({
        selector: {
            order: { '$gt': null }
        },
        sort: [{ order: 'desc' }],
        limit: count || 10
    })
    return recentBooks.docs
}

const saveToRecent = async (book) => {
    let query = await DB.recent.find({
        selector: {
            _id: book._id
        }
    })
    let exist = query.docs.length == 0 ? false : true
    let maxIdItem = await DB.recent.find({
        selector: {
            order: { '$gt': null }
        },
        sort: [{ order: 'desc' }],
        limit: 1
    })
    let maxId = maxIdItem.docs.length > 0 ? maxIdItem.docs[0].order : 0

    if (exist) {
        if (maxIdItem.docs[0]._id == book._id) {
            console.log("已经是最新状态")
        }
        else {
            var doc = await DB.recent.get(book._id)
            var response = await DB.recent.put({
                _id: doc._id,
                _rev: doc._rev,
                order: maxId + 1
            })
            console.log("更新OK")
        }
    }
    else {
        var response = await DB.recent.put({
            _id: book._id,
            order: maxId + 1
        })
        console.log("添加OK")
    }
}



const readCover = async (epub) => {
    var imageUrl = epub.contents.cover || (epub.contents.manifest.cover ? epub.contents.manifest.cover.url : false) || (epub.contents.manifest["cover-image"] ? epub.contents.manifest["cover-image"].url : false) || null
    var imageBlob = imageUrl ? (await epub.store.getUrl(imageUrl) || "") : null
    return new Promise((resolve, reject) => {
        resolve(imageBlob)
    })
}

export const getBookMeta = async (url) => {
    return new Promise(async (resolve, reject) => {
        let epub = ePub({ restore: true })
        if (!url) {
            throw new Error("没路径读个JB！")
        }
        epub.open(url)
        let meta = await epub.getMetadata()
        meta.cover = await readCover(epub)
        epub = null
        resolve(meta)
    })
}

export const bookIdMeta = async (id) => {
    let book = await DB.books.get(id)
    return getBookMeta(book.url)
}

export const idToBook = async (id) => {
    let book = await DB.books.get(id)
    return book.url
}

export const updateBook = async (book) => {
    let doc = await DB.books.get(book._id)
    book._rev = doc._rev
    DB.books.put(book)
    console.log("书籍信息已更新",doc)
}
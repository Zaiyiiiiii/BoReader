const dbname = "epubReader"
const dbversion = 2

function initLibDB(event){
    var db = event.target.result
    
    Object.keys(storeObject).map(function(item){
        if(!db.objectStoreNames.contains(item)){
            var objectStore = db.createObjectStore(item,{ autoIncrement:true })            
        }
        else{
            event.currentTarget.transaction.objectStore(item).createIndex('url','url',{ unique:true })
        }
        // Object.keys(storeObject[item]).map(function(subItem){
        //     storeObject[item][subItem]
        // })
    })

}

export async function accessIndexDB(){
    return new Promise((resolve,reject)=>{
        let request = window.indexedDB.open(dbname,dbversion)
        request.onupgradeneeded = function(event){
            initLibDB(event)
        }
        request.onsuccess = async function(event){
            resolve(event.target.result)
        }
        request.onerror = function(event){
            console.log("数据读取错误")
        }
    })
}


var storeObject ={
    libBooks: {
    },
    recentBooks: {
    }
} 


export async function getHistory(){
    return new Promise((resolve,reject)=>{        
        var bookHistroy = []
        accessIndexDB().then(function(db){
            var objectStore = db.transaction(['recentBooks'],'readwrite').objectStore("recentBooks")
            objectStore.openCursor().onsuccess = function(event){
                var cursor = event.target.result
                if(cursor){
                    bookHistroy.push(cursor.value)
                    cursor.continue()
                }
                else{
                    resolve(bookHistroy)
                }
            }
        })
    })
}

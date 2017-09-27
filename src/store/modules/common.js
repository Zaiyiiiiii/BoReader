import { Book } from '../../class/book'

const state = {
}

const getters = {

}

const actions = {
    openBook( compStore, obj ){  
        console.log(obj)  
        if( obj.book ){
            obj.comp.$store.commit('SET_BOOK',{ book: obj.book })
            obj.comp.$router.push('reader')
        }
        else{
            openBookFile(obj.comp,function(files,component){   
                if(files){   
                    var book = new Book( {url:files[0]} )
                    component.$store.commit('SET_BOOK',{ book: book })
                    component.$router.push('reader')
                }
            })
        }
    }
}

const mutations = {
}

export default {
    state,
    getters,
    actions,
    mutations
}


function openBookFile(comp, func){
    const { dialog } = require('electron').remote
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters:[
            {
                name:'Epub格式',
                extensions:['epub']
            }
        ]
        },function(files){
            func(files, comp)
    })
}
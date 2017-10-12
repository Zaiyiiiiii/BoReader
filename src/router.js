import BookShelf from './view/BookShelf.vue'
import Reader from './view/Reader.vue'
import VueRouter from 'vue-router'

export default new VueRouter({
  mode:'hash',
  routes: [
      {
        path:'',
        component: BookShelf,
        meta:{
          sideBarButtons:[
          ]
        }
      },
      {
        path: '/reader',
        component: Reader,
        meta:{
          sideBarButtons:[
            "font-size","line-height","to-lib"
          ]
        }
      }
    ]
})
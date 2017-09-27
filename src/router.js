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
          keepAlive: true,
          sideBarButtons:[
          ]
        }
      },
      {
        path: '/reader',
        component: Reader,
        meta:{
          keepAlive: true,
          sideBarButtons:[
            "font-size","line-height"
          ]
        }
      }
    ]
})
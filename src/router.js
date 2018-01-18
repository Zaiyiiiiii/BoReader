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
          title: "请严肃一点。",
          sideBarButtons:[
          ]
        }
      },
      {
        path: '/reader',
        component: Reader,
        meta:{
          title:"加载中...",
          sideBarButtons:[
            "font-size","line-height","to-lib","toc"
          ]
        }
      }
    ]
})
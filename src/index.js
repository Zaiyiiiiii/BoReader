import './style.css';

import Vue from 'vue/dist/vue.common.js'
import VueRouter from 'vue-router'
import router from './router'
import store from './store/index.js'
import App from './app.vue'
import { DB, defaultName } from './BookOps'

DB.init()

Vue.use(VueRouter)

// 每次切换路由的时候，更改标题的名称
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})

// 初始化事件总线
// 用事件总线处理部分问题
import VueBus from 'vue-bus';
Vue.use(VueBus);

// 初始化UI字体
var UIFont = new FontFace("default", "url(../static/fonts/SourceHanSansSC-Light.otf)", {});
UIFont.load().then(function (loadedFace) {
  document.fonts.add(loadedFace);
  new Vue({
    el: '#app',
    components: { app: App },
    router,
    store
  })
})





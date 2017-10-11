import './style.css';

import Vue from 'vue/dist/vue.common.js'
import VueRouter from 'vue-router'
import router from './router'
import store from './store/index.js'
import App from './app.vue'
import { DB } from './BookOps'

DB.init()

Vue.use(VueRouter)


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





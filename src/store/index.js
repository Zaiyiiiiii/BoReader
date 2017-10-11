import Vue from 'vue/dist/vue.common.js'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import reader from './modules/reader'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  actions,
  getters,
  modules: {
      reader
  },
  // strict: debug
})
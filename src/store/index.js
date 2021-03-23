import { createStore } from 'vuex'
import global from './modules/global'
import vdom2fs from './modules/vdom2fs'

export default new createStore({
  modules: {
      global,
      vdom2fs
  },
})
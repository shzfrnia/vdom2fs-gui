import { createStore } from 'vuex'
import global from './modules/global'
import vdom2fs from './modules/vdom2fs'
import logs from './modules/logs'

export default createStore({
  modules: {
    global,
    vdom2fs,
    logs,
  },
})

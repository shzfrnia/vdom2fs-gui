import { createStore } from 'vuex'
import global from './modules/global'

export default new createStore({
  modules: {
      global
  },
})
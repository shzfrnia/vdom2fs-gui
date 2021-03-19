import { createStore } from 'vuex'
// import account from './modules/account'
// import friends from './modules/friends'
// import errors from "./modules/errors";

export default new createStore({
  modules: {
    // account,
    // friends,
    // errors
  },
  state: {
    loading: false
  },
  mutations: {
    setLoading(state, boolean) {
      state.loading = boolean
    },
  }
})
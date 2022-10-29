import notification from '@/store/modules/notification'
import configs from '@/store/modules/configs'

const state = () => ({
  loading: false,
  packageVersion: process.env.PACKAGE_VERSION || '0',
})

const mutations = {
  setLoading(state, boolean) {
    state.loading = boolean
  },
}

const getters = {
  appVersion(state) {
    return state.packageVersion
  },
  loading(state) {
    return state.loading
  },
}

const actions = {
  async runWithLoader({ commit }, func) {
    commit('setLoading', true)
    await func.call()
    commit('setLoading', false)
  },
}

export default {
  modules: { notification, configs },
  state,
  mutations,
  getters,
  actions,
}

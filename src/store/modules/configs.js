import router from '@/router/index'
import { h } from 'vue'
import { ElProgress } from 'element-plus'
import { ipcRenderer } from 'electron'
import { Python } from '@/api'
import FileManager from '@/api/file-manager'

// config
// {
//   id: -1,
//   name: "",
//   appId: "",
//   url: "",
//   user: "",
//   passMd5: "",
//   favorite: true,
// }

const localStorageKey = 'configs'

const updateLocalSotrage = (configs) => {
  localStorage.setItem(localStorageKey, JSON.stringify(configs))
}

const generateNextId = async (configs, newConfig) => {
  newConfig.id = configs.slice(-1)[0]?.id + 1 || 1
}

const state = () => ({
  configs: JSON.parse(localStorage.getItem(localStorageKey) || '[]'),
})

const mutations = {
  addConfig(state, config) {
    // TODO add validation on uniq
    generateNextId(state.configs, config)
    state.configs.push(config)
    updateLocalSotrage(state.configs)
  },
  removeConfig(state, id) {
    const currentRoute = router.currentRoute.value
    if (currentRoute.name === 'Config' && currentRoute.params.id === id) {
      router.push({ name: 'Home' })
    }
    state.configs = state.configs.filter((el) => el.id !== id)
    updateLocalSotrage(state.configs)
  },
  setFavorites(state, { id, bool }) {
    state.configs.filter((el) => el.id === id)[0].favorite = bool
    updateLocalSotrage(state.configs)
  },
  updateConfigs(state, configs) {
    state.configs = configs
    updateLocalSotrage(state.configs)
  },
  updateConfig(state, newConfig) {
    for (let i = 0; i < state.configs.length; i++) {
      if (state.configs[i].id === newConfig.id) {
        state.configs[i] = newConfig
      }
    }
    updateLocalSotrage(state.configs)
  },
}

const getters = {
  configs(state) {
    return state.configs
  },
  favoritesConfigs(state, getters) {
    return getters.configs.filter((el) => el.favorite)
  },
  notFavoritesConfigs(state, getters) {
    return getters.configs.filter((el) => !el.favorite)
  },
  getConfigById: (state, getters) => (id) => {
    const config = getters.configs.filter((e) => e.id === parseInt(id))
    return config ? { ...config[0] } : null
  },
  getConfigTextRepresentation: () => (config) => {
    return [
      `url = "https://${config.url}"`,
      `user = "${config.user}"`,
      `pass_md5 = '${config.passMd5}'`,
      `app_id = "${config.appId}"`,
    ].join('\n')
  },
}

const actions = {
  addConfig({ commit }, config) {
    commit('addConfig', config)
  },
  async updateConfig({ commit, dispatch, getters }, newConfig) {
    const configIsNew = newConfig.id < 0
    const oldConfig = getters.getConfigById(newConfig.id)
    commit(configIsNew ? 'addConfig' : 'updateConfig', newConfig)
    if (configIsNew) return

    const vNodeElProgress = h(ElProgress, { percentage: 0 })
    const message = {
      title: 'Updating config...',
      duration: 0,
      message: vNodeElProgress,
      type: 'info',
    }
    const notification = await dispatch('notify', message, { root: true })
    vNodeElProgress.el.style.width = '285px'
    await dispatch(
      'vdom2fs/migrateExportedApps',
      {
        oldConfig,
        newConfig,
        callback: ({ percentage }) => {
          vNodeElProgress.el.getElementsByClassName(
            'el-progress-bar__inner'
          )[0].style.width = `${percentage}%`
          vNodeElProgress.el.getElementsByClassName(
            'el-progress__text'
          )[0].innerHTML = `<span>${percentage}%</span>`
        },
      },
      { root: true }
    )
    setTimeout(notification.close, 1000)
  },
  async removeConfig({ commit, dispatch, getters }, id) {
    dispatch('vdom2fs/removeConfigFolder', getters.getConfigById(id), {
      root: true,
    })
    commit('removeConfig', id)
  },
  exportConfig({ getters }, config) {
    FileManager.saveAs(config.name, getters.getConfigTextRepresentation(config))
  },
  openConfigDialog(context, config) {
    ipcRenderer.send('open-config-dialog', config)
  },
  openCreateConfigDialog({ dispatch }, config) {
    dispatch('openConfigDialog', { ...config, id: -1 })
  },
  openCreateDialogConfigFromFile({ dispatch }, file) {
    const rows = [
      'import sys',
      'import imp',
      'import json',
      'sys.dont_write_bytecode = True',
      `config = imp.load_source("config", "${file.raw.path}")`,
      'print(json.dumps({"url": config.url, "user": config.user, "pass_md5": config.pass_md5, "app_id": config.app_id}))',
    ]
    Python.runString(rows.join('\n'), (m) => {
      const config = JSON.parse(m)
      dispatch('openCreateConfigDialog', {
        name: file.name,
        url: config.url.replace('https://', ''),
        appId: config.app_id,
        user: config.user,
        passMd5: config.pass_md5,
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}

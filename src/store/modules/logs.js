const state = () => ({
  logsRows: [],
  show: false,
})

const mutations = {
  showLogs(state) {
    state.show = true
  },
  hideLogs(state) {
    state.show = false
  },
  toggleLogsVisible(state) {
    state.show = !state.show
  },
  addLog(state, logRow) {
    if (Array.isArray(logRow.content)) {
      logRow.content = logRow.content.join('\n')
    }
    logRow.type = logRow.type || 'info'
    const color = {
      success: '#67C23A',
      warning: '#E6A23C',
      danger: '#F56C6C',
      info: '#909399',
      primary: '#409eff',
    }[logRow.type]
    state.logsRows.push({ ...logRow, timestamp: Date.now(), color })
  },
}

const getters = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}

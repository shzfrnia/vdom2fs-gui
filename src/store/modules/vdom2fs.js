const state = {
  pathToScripts: localStorage.getItem('vdom2fs_path') || ""
};

const mutations = {
  setPath(state, path) {
    state.pathToScripts = path;
  },
  clearPath(state) {
    state.pathToScripts = '';
  }
};

const getters = {
  pathIsSetted(state) {
    return state.pathToScripts !== "";
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};

import { FileManager } from "@/api/index";

const vdom2fs_path = "vdom2fs_path";
const vdom2fs_path_is_valid = "vdom2fs_path_is_valid";

const state = () => ({
  pathToScripts: localStorage.getItem(vdom2fs_path) || "",
  pathIsValid: localStorage.getItem(vdom2fs_path_is_valid) || false,
  pathErrors: [],
  scripts: {
    exporter: "exporter.py",
    parse: "parse.py",
  },
});

const mutations = {
  setPath(state, path) {
    state.pathToScripts = path;
    localStorage.setItem(vdom2fs_path, state.pathToScripts);
  },
  clearPath(state) {
    state.pathToScripts = "";
    localStorage.setItem(vdom2fs_path, "");
  },
  setPathValidState(state, _state) {
    state.pathIsValid = _state;
    localStorage.setItem(vdom2fs_path_is_valid, state.pathIsValid);
  },
  setPathErrors(state, errors) {
    state.pathErrors = errors;
  },
};

const getters = {
  pathIsSetted(state) {
    return state.pathToScripts !== "";
  },
  currentPath(state) {
    return state.pathToScripts;
  },
  pathIsValid(state) {
    return state.pathIsValid === "true" || state.pathIsValid === true;
  },
  pathErrors(state) {
    return state.pathErrors;
  },
};

const actions = {
  async checkVdom2fsFolderOnValid({ commit, state }, path) {
    const {
      pathIsValid,
      errors,
    } = await FileManager.checkFolderOnValidVdom2fsScripts(path, {
      exporter: state.scripts.exporter,
      parse: state.scripts.parse,
    });
    commit("setPathValidState", pathIsValid);
    commit("setPathErrors", errors);
    commit("setPath", path);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};

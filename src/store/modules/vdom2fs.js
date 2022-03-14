import { FileManager } from "@/api/index";
import { remote } from "electron";
import router from "./../../router/index";
const { net, dialog } = remote;

const localStorageKeys = {
  vdom2fsPath: "vdom2fs_path",
  vdom2fsPathIsValid: "vdom2fs_path_is_valid",
};

const connectionErrors = {
  "net::ERR_INTERNET_DISCONNECTED": "Please, check internet connection.",
};

const state = () => ({
  pathToScripts: localStorage.getItem(localStorageKeys.vdom2fsPath) || "",
  pathIsValid: localStorage.getItem(localStorageKeys.vdom2fsPathIsValid) || false,
  pathErrors: [],
  scripts: {
    exporter: "exporter.py",
    parse: "parse.py",
  },
});

const mutations = {
  setPath(state, path) {
    state.pathToScripts = path;
    localStorage.setItem(localStorageKeys.vdom2fsPath, state.pathToScripts);
  },
  clearPath(state) {
    state.pathToScripts = "";
    localStorage.setItem(localStorageKeys.vdom2fsPath, "");
  },
  setPathValidState(state, _state) {
    state.pathIsValid = _state;
    localStorage.setItem(
      localStorageKeys.vdom2fsPathIsValid,
      state.pathIsValid
    );
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
    commit("setLoading", true, { root: true });
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
    commit("setLoading", false, { root: true });
  },
  async checkApplicationUrl(context, url) {
    return new Promise((resolve, reject) => {
      const request = net.request(`https://${url}`);
      request.on("response", (response) => {
        resolve(response.statusCode == 200);
      });
      request.on("error", (error) => {
        reject(connectionErrors[error.message] || error.message);
      });
      request.end();
    });
  },
  async chooseFolder({ dispatch, getters }) {
    dialog
      .showOpenDialog({ properties: ["openDirectory"] })
      .then(async (result) => {
        if (!result.canceled) {
          await dispatch("checkVdom2fsFolderOnValid", result.filePaths[0]);
          if (getters.pathIsValid) {
            router.push({ name: "Home" });
          } else {
            router.push({ name: "Setup" });
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};

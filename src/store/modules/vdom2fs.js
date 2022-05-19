import { FileManager } from "@/api/index";
import { Python } from "@/api/index";
import router from "@/router/index";
import { remote } from "electron";
import path from "path";
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
  pathIsValid:
    localStorage.getItem(localStorageKeys.vdom2fsPathIsValid) || false,
  pathErrors: [],
});

const mutations = {
  setPath(state, _path) {
    state.pathToScripts = _path;
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
  scripts() {
    return {
      exporter: "exporter.py",
      parse: "parse.py",
    };
  },
};

const actions = {
  async checkVdom2fsFolderOnValid({ commit, getters, dispatch }, _path) {
    commit("setLoading", true, { root: true });
    let errors = [];
    try {
      await FileManager.filesExists(_path, { ...getters.scripts });
      await dispatch("checkScripts", _path);
    } catch (error) {
      errors = error;
    }
    dispatch("setPath", { _path, errors });
    commit("setLoading", false, { root: true });
  },
  async setPath({ commit }, payload) {
    const { _path, errors } = payload;
    commit("setPathValidState", errors.length == 0);
    commit("setPathErrors", errors);
    commit("setPath", _path);
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
  async checkScripts({ getters }, _path) {
    const errors = [];
    try {
      await Python.execute(path.join(_path, getters.scripts.exporter), {
        args: ["-h"],
      });
    } catch (error) {
      const errorMessage = error.toString();
      if (!errorMessage.includes("conf_file is required")) {
        errors.push({
          file: getters.scripts.exporter,
          message: errorMessage.slice(0),
        });
      }
    }
    try {
      await Python.execute(path.join(_path, getters.scripts.parse), {
        args: ["-h"],
      });
    } catch (error) {
      errors.push({
        file: getters.scripts.parse,
        message: error.toString().slice(0),
      });
    }
    if (errors.length > 0) {
      throw errors;
    }
  },
  // async exportApplication() {
  //   Python.execute(state.scripts.exporter, 1)
  // }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};

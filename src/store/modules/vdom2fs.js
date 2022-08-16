import { cwd } from "process";
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

const exportedAppsFolder = "exported_apps";

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

  scriptsFullPath(state, getters) {
    const result = {};
    for (const [key, value] of Object.entries(getters.scripts)) {
      result[key] = path.join(getters.currentPath, value);
    }
    return result;
  },

  getConfigExportedAppsFolderPath: (state, getters) => (config) => {
    return path.join(getters.currentPath, exportedAppsFolder, config.url);
  },

  getExportedAppFilePath: (state, getters) => (config, folder) => {
    return path.join(
      getters.getConfigExportedAppsFolderPath(config),
      folder,
      `${config.name}.xml`
    );
  },

  getExportedApp: (state, getters) => (config, folder) => {
    const appXml = getters.getExportedAppFilePath(config, folder);
    const appXmlSizeBytes = FileManager.getFileStatSync(appXml).size;
    const parsedAppPath = path.join(
      getters.getConfigExportedAppsFolderPath(config),
      folder,
      config.name
    );
    const isParsed = FileManager.fileExistsSync(parsedAppPath);
    const parsedFolderSizeBytes = isParsed
      ? 1
      : null;

    return {
      appXml,
      appXmlName: `${config.name}.xml`,
      appXmlSizeBytes,
      appXmlSizeFormatted: FileManager.formatBytes(appXmlSizeBytes),
      name: folder,
      isParsed,
      parsedFolderSizeBytes,
      parsedFolderSizeFormatted: FileManager.formatBytes(parsedFolderSizeBytes),
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

  async setPath({ commit }, { _path, errors }) {
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

  async __exportApplication({ getters }, config) {
    const info = await FileManager.createTempFile(
      [
        `url = "https://${config.url}"`,
        `user = "${config.user}"`,
        `pass_md5 = '${config.passMd5}'`,
        `app_id = "${config.appId}"`,
      ].join(`\n`)
    );
    await Python.execute(getters.scriptsFullPath.exporter, {
      args: ["-c", info.path],
    });
    FileManager.cleanupTempFiles();
  },

  async exportApplication({ commit, dispatch, getters }, config) {
    commit("setLoading", true, { root: true });
    await dispatch("__exportApplication", config);
    await FileManager.moveFile(
      path.join(cwd(), "exported_app.xml"),
      path.join(
        getters.currentPath,
        exportedAppsFolder,
        config.url,
        new Date().toString(),
        `${config.name}.xml`
      )
    );
    commit("setLoading", false, { root: true });
  },

  async parseApplication({ commit, getters }, { config, folder }) {
    commit("setLoading", true, { root: true });
    const filePath = getters.getExportedAppFilePath(config, folder);
    return new Promise((resolve, reject) => {
      const dist = path.join(
        getters.getConfigExportedAppsFolderPath(config),
        folder,
        config.name
      );
      FileManager.rmdirSync(dist);
      Python.execute(getters.scriptsFullPath.parse, {
        args: ["-t", dist, filePath],
      })
        .then(() => {
          commit("setLoading", false, { root: true });
          resolve(filePath);
        })
        .catch((err) => reject(err));
    });
  },

  async getConfigExportedApps({ getters }, config) {
    return (
      await FileManager.getFoldersByPath(
        getters.getConfigExportedAppsFolderPath(config)
      )
    ).map((folder) => getters.getExportedApp(config, folder));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};

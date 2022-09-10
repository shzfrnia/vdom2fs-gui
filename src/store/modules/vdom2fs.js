import { cwd } from "process";
import { FileManager } from "@/api/index";
import Python from "@/api/python-engine";
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
    return path.join(
      getters.currentPath,
      exportedAppsFolder,
      config.id.toString()
    );
  },

  getConfigTextRepresentation: () => (config) => {
    return [
      `url = "https://${config.url}"`,
      `user = "${config.user}"`,
      `pass_md5 = '${config.passMd5}'`,
      `app_id = "${config.appId}"`,
    ].join(`\n`);
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
    const fileStat = FileManager.getFileStatSync(appXml);
    const appXmlSizeBytes = fileStat.size;
    const creationDate = fileStat.ctime;
    const appPath = path.join(
      getters.getConfigExportedAppsFolderPath(config),
      folder
    );
    const parsedAppPath = path.join(appPath, config.name);
    const isParsed = FileManager.fileExistsSync(parsedAppPath);
    const parsedFolderSizeBytes = isParsed
      ? FileManager.getFolderSize(parsedAppPath)
      : null;

    return {
      appXml,
      appXmlName: `${config.name}.xml`,
      appXmlSizeBytes,
      appXmlSizeFormatted: FileManager.formatBytes(appXmlSizeBytes),
      name: folder,
      isParsed,
      parsedFolder: parsedAppPath,
      parsedFolderSizeBytes,
      parsedFolderSizeFormatted: FileManager.formatBytes(parsedFolderSizeBytes),
      creationDate,
      folder: appPath,
      config: { ...config },
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

  setPath({ commit }, { _path, errors }) {
    commit("setPathValidState", errors.length == 0);
    commit("setPathErrors", errors);
    commit("setPath", _path);
  },

  checkApplicationUrl(context, url) {
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
    const tempFileInfo = await FileManager.createTempFile(
      getters.getConfigTextRepresentation(config)
    );
    const pythonMessage = await Python.execute(
      getters.scriptsFullPath.exporter,
      {
        args: ["-c", tempFileInfo.path],
      }
    );
    FileManager.cleanupTempFiles();
    return pythonMessage;
  },

  async exportApplication({ commit, dispatch, getters }, config) {
    commit("setLoading", true, { root: true });
    let pythonMessage = "";
    try {
      pythonMessage = await dispatch("__exportApplication", config);
    } catch (err) {
      commit("setLoading", false, { root: true });
      return;
    }

    await FileManager.moveFile(
      path.join(cwd(), "exported_app.xml"),
      path.join(
        getters.getConfigExportedAppsFolderPath(config),
        new Date().toString(),
        `${config.name}.xml`
      )
    );
    commit("setLoading", false, { root: true });
    return pythonMessage;
  },

  async parseApplication({ commit, getters }, exportedApp) {
    commit("setLoading", true, { root: true });
    const filePath = exportedApp.appXml;
    const dist = path.join(exportedApp.folder, exportedApp.config.name);
    FileManager.rmdirSync(dist);
    await Python.execute(getters.scriptsFullPath.parse, {
      args: ["-t", dist, filePath],
    });
    commit("setLoading", false, { root: true });
    return filePath;
  },

  async getConfigExportedApps({ getters }, config) {
    return (
      await FileManager.getFoldersByPath(
        getters.getConfigExportedAppsFolderPath(config)
      )
    )
      .map((folder) => getters.getExportedApp(config, folder))
      .sort((a, b) => a.creationDate - b.creationDate);
  },

  openExportedAppFolder(context, exportedApp) {
    FileManager.openPath(exportedApp.folder);
  },

  removeExportedApp(context, exportedApp) {
    FileManager.removeFolder(exportedApp.folder);
  },

  async migrateExportedApps({ dispatch }, { oldConfig, newConfig, callback }) {
    const exportedApps = await dispatch("getConfigExportedApps", oldConfig);
    const exportedAppsLenght = exportedApps.length;
    const getPercentage = (value, all) => (value / all) * 100;
    for (let i = 0; i < exportedAppsLenght; i++) {
      const exportedApp = exportedApps[i];
      const percentage = getPercentage(i + 1, exportedAppsLenght);
      const newXmlPath = path.join(exportedApp.folder, `${newConfig.name}.xml`);
      FileManager.renameSync(exportedApp.appXml, newXmlPath);
      if (exportedApp.isParsed) {
        const newParsedFolder = path.join(exportedApp.folder, newConfig.name);
        FileManager.renameSync(exportedApp.parsedFolder, newParsedFolder);
      }
      callback({ percentage, done: i, all: exportedAppsLenght });
    }
  },

  removeConfigFolder({ getters }, config) {
    FileManager.rmdirSync(getters.getConfigExportedAppsFolderPath(config));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};

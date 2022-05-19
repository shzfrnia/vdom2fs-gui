import router from "@/router/index";

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

const localStorageKey = "configs";

const updateLocalSotrage = (configs) => {
  localStorage.setItem(localStorageKey, JSON.stringify(configs));
};

const generateNextId = async (configs, newConfig) => {
  newConfig.id = configs.slice(-1)[0]?.id + 1 || 1;
};

const state = () => ({
  configs: JSON.parse(localStorage.getItem(localStorageKey) || "[]"),
});

const mutations = {
  // TODO add validation on uniq
  addConfig(state, config) {
    generateNextId(state.configs, config);
    state.configs.push(config);
    updateLocalSotrage(state.configs);
  },
  // FIXME TODO this is async action
  removeConfig(state, id) {
    const currentRoute = router.currentRoute.value;
    if (currentRoute.name == "Config" && currentRoute.params.id == id) {
      router.push({ name: "Home" });
    }
    state.configs = state.configs.filter((el) => el.id !== id);
    updateLocalSotrage(state.configs);
  },
  setFavorites(state, { id, bool }) {
    state.configs.filter((el) => el.id === id)[0].favorite = bool;
    updateLocalSotrage(state.configs);
  },
  updateConfigs(state, configs) {
    state.configs = configs;
    updateLocalSotrage(state.configs);
  },
  updateConfig(state, newConfig) {
    for (let i = 0; i < state.configs.length; i++) {
      if (state.configs[i].id === newConfig.id) {
        state.configs[i] = newConfig;
      }
    }
    updateLocalSotrage(state.configs);
  },
};

const getters = {
  configs(state) {
    return state.configs;
  },
  favoritesConfigs(state, getters) {
    return getters.configs.filter((el) => el.favorite);
  },
  notFavoritesConfigs(state, getters) {
    return getters.configs.filter((el) => !el.favorite);
  },
};

const actions = {
  async addConfig({ commit }, config) {
    commit("addConfig", config);
  },
  async updateConfig({ commit }, newConfig) {
    commit(newConfig.id < 0 ? "addConfig" : "updateConfig", newConfig);
  },
  async getConfigById({ getters }, id) {
    const config = getters.configs.filter((e) => e.id === parseInt(id));
    return config ? { ...config[0] } : null;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};

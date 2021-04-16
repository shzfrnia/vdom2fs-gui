import router from "@/router/index";

const localStorageKey = "configs";

const updateLocalSotrage = (configs) => {
  localStorage.setItem(localStorageKey, JSON.stringify(configs));
};

const state = () => ({
  configs: JSON.parse(localStorage.getItem(localStorageKey) || "[]"),
});

const mutations = {
  // TODO add validation on uniq
  addConfig(state, config) {
    state.configs.push(config);
    updateLocalSotrage(state.configs);
  },
  // FIXME TODO this is async action
  removeConfig(state, id) {
    const currentRoute = router.currentRoute.value;
    if (currentRoute.name == "Config" && currentRoute.params.id == id) {
      router.push({ name: "Home" });
    }
    state.configs = state.configs.filter((el) => el.appId !== id);
    updateLocalSotrage(state.configs);
  },
  setFavorites(state, { id, bool }) {
    state.configs.filter((el) => el.appId === id)[0].favorite = bool;
    updateLocalSotrage(state.configs);
  },
  updateConfigs(state, configs) {
    state.configs = configs;
    updateLocalSotrage(state.configs);
  },
  // TODO add validations on uniq
  updateConfig(state, { oldConfig, newConfig }) {
    for (let i = 0; i < state.configs.length; i++) {
      if (state.configs[i].appId === oldConfig.appId) {
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
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};

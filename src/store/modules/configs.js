import router from "@/router/index";

const state = () => ({
  configs: [
    {
      appId: 1,
      name: "logos",
      url: "/asd",
      user: "sha",
      passMd5: "123",
      favorite: true,
    },
    {
      appId: 2,
      name: "portal",
      url: "/asd",
      user: "sha",
      passMd5: "123",
    },
    {
      appId: 3,
      name: "MUP",
      url: "/asd",
      user: "sha",
      passMd5: "123",
    },
  ],
});

const mutations = {
  // TODO add validation on uniq
  addConfig(state, config) {
    state.configs.push(config);
  },
  // FIXME TODO this is async action
  removeConfig(state, id) {
    const currentRoute = router.currentRoute.value;
    if (currentRoute.name == "Config" && currentRoute.params.id == id) {
      router.push({ name: "Home" });
    }
    state.configs = state.configs.filter((el) => el.appId !== id);
  },
  setFavorites(state, { id, bool }) {
    state.configs.filter((el) => el.appId === id)[0].favorite = bool;
  },
  updateConfigs(state, configs) {
    state.configs = configs;
  },
  // TODO add validations on uniq
  updateConfig(state, { oldConfig, newConfig }) {
    for (let i = 0; i < state.configs.length; i++) {
      if (state.configs[i].appId === oldConfig.appId) {
        state.configs[i] = newConfig;
      }
    }
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

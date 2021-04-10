import router from "@/router/index";

const state = () => ({
  configs: [
    {
      app_id: 1,
      name: "logos",
      url: "/asd",
      user: "sha",
      pass_md5: "123",
      favorite: true,
    },
    {
      app_id: 2,
      name: "portal",
      url: "/asd",
      user: "sha",
      pass_md5: "123",
    },
    {
      app_id: 3,
      name: "MUP",
      url: "/asd",
      user: "sha",
      pass_md5: "123",
    },
  ],
});

const mutations = {
  addConfig(state, config) {
    state.configs.push(config);
  },
  // FIXME TODO this is async action
  removeConfig(state, id) {
    const currentRoute = router.currentRoute.value;
    if (currentRoute.name == "Config" && currentRoute.params.id == id) {
      router.push({ name: "Home" });
    }
    state.configs = state.configs.filter((el) => el.app_id !== id);
  },
  setFavorites(state, { id, bool }) {
    state.configs.filter((el) => el.app_id === id)[0].favorite = bool;
  },
  updateConfigs(state, configs) {
    state.configs = configs;
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

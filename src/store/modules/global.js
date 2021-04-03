import notification from "@/store/modules/notification";

const state = () => ({
  loading: false,
  packageVersion: process.env.PACKAGE_VERSION || "0",
});

const mutations = {
  setLoading(state, boolean) {
    state.loading = boolean;
  },
};

const getters = {
  appVersion(state) {
    return state.packageVersion;
  },
  loading(state) {
    return state.loading;
  },
};

const actions = {};

export default {
  modules: { notification },
  state,
  mutations,
  getters,
  actions,
};

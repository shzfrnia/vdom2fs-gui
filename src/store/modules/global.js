const state = {
  loading: false,
  packageVersion: process.env.PACKAGE_VERSION || '0'
};

const mutations = {
  setLoading(state, boolean) {
    state.loading = boolean;
  },
};

const getters = {
  appVersion: (state) => {
    return state.packageVersion
  }
};

const actions = {};

export default {
  namespace: false,
  state,
  mutations,
  getters,
  actions,
};

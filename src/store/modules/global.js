const state = {
  loading: false,
};

const mutations = {
  setLoading(state, boolean) {
    state.loading = boolean;
  },
};

const getters = {};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};

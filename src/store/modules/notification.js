import app from "@/main.js";

const state = () => ({
  notifications: [],
});

const mutations = {
  addNotification(state, notification) {
    state.notifications.push(notification);
  },
};

const getters = {};

const actions = {
  notify: {
    root: true,
    handler({ commit }, payload) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const notification = app.$notify({
            title: payload.title || "",
            message: payload.message || "",
            duration: payload?.duration === null ? 4500 : payload.duration,
            type: payload.type || "",
            position: payload.position || "top-right",
          });
          commit("addNotification", notification);
          resolve(notification);
        }, 0);
      });
    },
  },
  async clearAll({ state }) {
    while (state.notifications.length) {
      state.notifications.pop().close();
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};

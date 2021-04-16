export default (config, window, store, ipcRenderer, variables) => [
  {
    label: config.favorite ? "remove from favorite" : "add to favorite",
    click() {
      store.commit("configs/setFavorites", {
        id: config.appId,
        bool: !config.favorite,
      });
    },
  },
  {
    label: "edit",
    click() {
      ipcRenderer.send("open-config-dialog", {
        config: {
          ...store.state.global.configs.configs.filter(
            (e) => e.appId == config.appId
          )[0],
        },
        create: false,
      });
    },
  },
  {
    label: "export",
    click() {
      window.alert("export");
    },
  },
  {
    label: "reorder",
    checked: variables.reorder.value,
    type: "checkbox",
    click() {
      variables.reorder.value = !variables.reorder.value;
    },
  },
  { type: "separator" },
  {
    label: "remove",
    click() {
      store.commit("configs/removeConfig", config.appId);
    },
  },
];

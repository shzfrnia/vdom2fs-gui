export default (config, window, store, ipcRenderer, variables) => [
  {
    label: config.favorite ? "remove from favorite" : "add to favorite",
    click() {
      store.commit("configs/setFavorites", {
        id: config.id,
        bool: !config.favorite,
      });
    },
  },
  {
    label: "edit",
    click() {
      const configCopy = {
        ...store.state.global.configs.configs.filter(
          (e) => e.id == config.id
        )[0],
      };
      ipcRenderer.send("open-config-dialog", {
        config: configCopy,
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
      store.commit("configs/removeConfig", config.id);
    },
  },
];

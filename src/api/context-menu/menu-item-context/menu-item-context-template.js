export default (config, window, store, variables) => [
  {
    label: config.favorite ? "remove from favorite" : "add to favorite",
    click() {
      store.commit("configs/setFavorites", {
        id: config.app_id,
        bool: !config.favorite,
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
  {
    label: "edit",
    click() {
      window.alert("edit");
    },
  },
  { type: "separator" },
  {
    label: "remove",
    click() {
      store.commit("configs/removeConfig", config.app_id);
    },
  },
];

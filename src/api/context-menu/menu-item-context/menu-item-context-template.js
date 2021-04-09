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
    label: "edit",
    click() {
      window.alert("edit");
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
      store.commit("configs/removeConfig", config.app_id);
    },
  },
];

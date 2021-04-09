export default (config, window, store) => [
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
    label: "edit",
    click() {
      window.alert("edit");
    },
  },
  {
    label: "remove",
    click() {
      window.alert("remove");
    },
  },
];

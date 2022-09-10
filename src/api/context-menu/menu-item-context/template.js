import store from "@/store/index";

export default (config, variables) => [
  {
    label: config.favorite ? "Remove from favorite" : "Add to favorite",
    click() {
      store.commit("configs/setFavorites", {
        id: config.id,
        bool: !config.favorite,
      });
    },
  },
  {
    label: "Edit",
    click() {
      store.dispatch("configs/openConfigDialog", { ...config });
    },
  },
  {
    label: "Export",
    click() {
      store.dispatch("configs/exportConfig", { ...config });
    },
  },
  {
    label: "Reorder",
    checked: variables.reorder.value,
    type: "checkbox",
    click() {
      variables.reorder.value = !variables.reorder.value;
    },
  },
  { type: "separator" },
  {
    label: "Remove",
    click() {
      store.dispatch("configs/removeConfig", config.id);
    },
  },
];

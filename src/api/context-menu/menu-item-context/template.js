import store from "@/store/index";
import { ipcRenderer } from "electron";

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
    label: "Export",
    click() {
      store.dispatch('vdom2fs/exportConfig', config);
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
      store.commit("configs/removeConfig", config.id);
    },
  },
];

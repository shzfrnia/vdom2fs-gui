import { remote } from "electron";
import { ref } from "vue";
const { Menu } = remote;
import store from "@/store/index";
import { ipcRenderer } from "electron";
import template from "./template";

export default () => {
  const reorder = ref(false);

  const openMenuItemContext = (config) => {
    const contextMenuTemplate = template(
      config,
      window,
      store,
      ipcRenderer,
      { reorder }
    );
    Menu.buildFromTemplate(contextMenuTemplate).popup({
      window: remote.getCurrentWindow(),
    });
  };

  return { openMenuItemContext, reorder };
};

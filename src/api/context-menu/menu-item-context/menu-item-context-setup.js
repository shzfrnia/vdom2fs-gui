import { remote } from "electron";
import { ref } from "vue";
import menuItemContextMenuTemplate from "./menu-item-context-template";
const { Menu } = remote;
import store from "@/store/index";
import { ipcRenderer } from "electron";

export default () => {
  const reorder = ref(false);

  const openMenuItemContext = (config) => {
    const contextMenuTemplate = menuItemContextMenuTemplate(
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

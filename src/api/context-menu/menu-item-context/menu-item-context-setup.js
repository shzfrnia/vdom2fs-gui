import { remote } from "electron";
import { ref } from "vue";
import menuItemContextMenuTemplate from "./menu-item-context-template";
const { Menu } = remote;
import store from "@/store/index";

export default () => {
  const reorder = ref(false);

  const openMenuItemContext = (config) => {
    const contextMenuTemplate = menuItemContextMenuTemplate(
      config,
      window,
      store,
      { reorder }
    );
    Menu.buildFromTemplate(contextMenuTemplate).popup({
      window: remote.getCurrentWindow(),
    });
  };

  return { openMenuItemContext, reorder };
};

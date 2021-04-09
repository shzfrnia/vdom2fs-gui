import { remote } from "electron";
import menuItemContextMenuTemplate from "@/api/context-menu/menu-item-context/menu-item-context-template";
const { Menu } = remote;

export default () => {
  return (config) => {
    const contextMenuTemplate = menuItemContextMenuTemplate(config, window);
    Menu.buildFromTemplate(contextMenuTemplate).popup({
      window: remote.getCurrentWindow(),
    });
  };
};

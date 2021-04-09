import { remote } from "electron";
import menuItemContextMenuTemplate from "./menu-item-context-template";
const { Menu } = remote;
import store from "@/store/index";

export default () => {
  return (config) => {
    const contextMenuTemplate = menuItemContextMenuTemplate(
      config,
      window,
      store
    );
    Menu.buildFromTemplate(contextMenuTemplate).popup({
      window: remote.getCurrentWindow(),
    });
  };
};

import { remote } from "electron";
const { Menu } = remote;
import template from "./template";

export default () => {
  const openMenuItemContext = (exportedApp, parseCallback, removeCallback) => {
    const contextMenuTemplate = template(
      exportedApp,
      parseCallback,
      removeCallback
    );
    Menu.buildFromTemplate(contextMenuTemplate).popup({
      window: remote.getCurrentWindow(),
    });
  };

  return { openMenuItemContext };
};

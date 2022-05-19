import { remote } from "electron";
const { Menu } = remote;
import { ipcRenderer } from "electron";
import template from "./template";

export default () => {
  const openMenuContext = () => {
    const contextMenuTemplate = template(ipcRenderer);
    Menu.buildFromTemplate(contextMenuTemplate).popup({
      window: remote.getCurrentWindow(),
    });
  };

  return { openMenuContext };
};

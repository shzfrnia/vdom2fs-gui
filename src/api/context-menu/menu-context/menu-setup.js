import { remote } from "electron";
const { Menu } = remote;
import template from "./template";

export default () => {
  const openMenuContext = () => {
    const contextMenuTemplate = template();
    Menu.buildFromTemplate(contextMenuTemplate).popup({
      window: remote.getCurrentWindow(),
    });
  };

  return { openMenuContext };
};

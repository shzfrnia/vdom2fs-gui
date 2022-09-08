import { ipcRenderer } from "electron";

export default () => [
  {
    label: "New config",
    click() {
      ipcRenderer.send("open-config-dialog", { config: {}, create: true });
    },
  },
];

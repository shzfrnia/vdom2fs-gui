export default (ipcRenderer) => [
  {
    label: "New config",
    click() {
      ipcRenderer.send("open-config-dialog", { config: {}, create: true });
    },
  },
];

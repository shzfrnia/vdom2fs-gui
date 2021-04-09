export default (config, window, callbacks) => [
  {
    label: config.favorite ? "remove from favorite" : "add to favorite",
    click() {
      callbacks?.favorite("asd");
    },
  },
  {
    label: "export",
    click() {
      window.alert("export");
    },
  },
  {
    label: "edit",
    click() {
      window.alert("edit");
    },
  },
  {
    label: "remove",
    click() {
      window.alert("remove");
    },
  },
];

export default (event) => [
  {
    label: "Menu Item 1",
    click: () => {
      event.sender.send("context-menu-command", "menu-item-1");
    },
  },
  { type: "separator" },
  { label: "Menu Item 2", type: "checkbox", checked: true },
];

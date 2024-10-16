import SidebarButton from "./Button.js";

const sideBarButtons = (changeWindow) => {
  let active = false;

  const box = Widget.Box({
    name: "sidebar_buttons",
    className: `sidebar-button-wrapper`,
    hpack: "start",
    vpack: "start",
    spacing: 20,
    vertical: true,
  });

  const changeActive = (newWindowName, button) => {
    for (const child of box.children) {
      child.child.class_name = "sidebar-button-icon";
    }

    if (newWindowName) button.child.class_name = "sidebar-button-icon active";

    changeWindow(newWindowName);
  };

  box.children = [
    SidebarButton("player", "audiowindow", changeActive),
    SidebarButton("xapp-edit", "customizewindow", changeActive),
    SidebarButton("preferences", "configwindow", changeActive),
  ];

  return box;
};

export default sideBarButtons;

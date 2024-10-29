import { toggleWindow } from "./../../../util/Windowutil.js";
import SidebarButton from "./Button.js";

const sideBarButtons = () => {
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
    toggleWindow(newWindowName);
  };

  box.children = [
    SidebarButton("player", "audiowindow", changeActive),
    SidebarButton("xapp-edit", "customizewindow", changeActive),
    SidebarButton("preferences", "configwindow", changeActive),
  ];

  return box;
};

export default sideBarButtons;

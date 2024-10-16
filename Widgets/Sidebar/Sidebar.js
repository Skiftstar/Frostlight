import sideBarButtons from "./SidebarButtons/SidebarButtons.js";

let toggledWindow = undefined;

const toggleWindow = (newWindow) => {
  if (toggledWindow) App.closeWindow(toggledWindow);
  if (newWindow) {
    App.openWindow(newWindow);
    toggledWindow = newWindow;
  }
};

const display = Widget.Box({
  name: "Sidebar-Content",
  expand: true,
  child: sideBarButtons(toggleWindow),
});

const sidebar = (monitor) =>
  Widget.Window({
    monitor: monitor,
    name: "sidebar_center",
    className: "sidebar-wrapper",
    anchor: ["left", "top", "bottom"],
    margins: [0, 0, 0, 0],

    exclusivity: "exclusive",
    layer: "top",
    hexpand: false,

    child: display,
  });

export default sidebar;

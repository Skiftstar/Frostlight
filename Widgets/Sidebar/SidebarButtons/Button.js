import { toggledWindow } from "./../../../util/Windowutil.js";

const SidebarButton = (iconName, windowName, changeWindow) => {
  const button = Widget.Button({
    class_name: "sidebar-button",
    expand: false,
    hexpand: false,
    hpack: "start",
    child: Widget.Icon({
      hpack: "start",
      className: "sidebar-button-icon",
      icon: `${iconName}-symbolic`,
    }),
    onClicked: (self) => {
      if (self.child.class_names.includes("active")) {
        changeWindow(undefined, self);
      } else {
        changeWindow(windowName, self);
      }
    },
  });

  toggledWindow.connect("changed", () => {
    if (toggledWindow.value === windowName) {
      button.child.class_name = "sidebar-button-icon active";
    } else {
      button.child.class_name = "sidebar-button-icon";
    }
  });

  return button;
};

export default SidebarButton;

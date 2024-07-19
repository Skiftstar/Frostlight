const SidebarButton = (iconName, windowName, changeWindow) =>
  Widget.Button({
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
        changeWindow(undefined, self)
      } else {
        changeWindow(windowName, self)
      }
    },
  })

export default SidebarButton

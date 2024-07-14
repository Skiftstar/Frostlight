const SidebarButton = (name, changeWindow) =>
  Widget.Button({
    class_name: "sidebar-button",
    expand: false,
    hexpand: false,
    hpack: "start",
    child: Widget.Icon({
      hpack: "start",
      className: "sidebar-button-icon",
      icon: `${name}-symbolic`,
    }),
    onClicked: (self) => {
      if (self.child.class_names.includes("active")) {
        self.child.class_name = "sidebar-button-icon"
        changeWindow(undefined)
      } else {
        self.child.class_name = "sidebar-button-icon active"
        changeWindow(name)
      }
    },
  })

export default SidebarButton

export const corner = (monitor) =>
  Widget.Window({
    monitor,
    anchor: ["top", "left"],
    className: "corner-rounding-window",
    child: Widget.Icon({
      icon: "corner-symbolic",
      className: "rounded-corner",
    }),
  });

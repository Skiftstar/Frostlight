const bar = Widget.Window({
  monitor: 1,
  name: "bar",
  className: "control-center-wrapper",
  anchor: ["left", "top", "right"],
  margins: [20, 0, 0, 20],

  exclusivity: "exclusive",
  layer: "top",

  child: Widget.CenterBox({
    vertical: true,
    spacing: 150,
    startWidget: Widget.Box({ expand: true }),
    // Expanding Boxes to block off remaining Space
    // otherwise Control Center would grow to the bottom
    centerWidget: Widget.Box({ expand: true }),
    endWidget: Widget.Box({
      expand: true,
    }),
  }),
})

export default bar

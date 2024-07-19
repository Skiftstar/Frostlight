import ThemePicker from "./../ThemePicker/ThemePicker.js"

const customizeWindow = Widget.Window({
  monitor: 1,
  name: "customizewindow",
  className: "content-window",
  anchor: ["left", "top", "bottom"],
  margins: [0, 0, 0, 0],

  exclusivity: "exclusive",
  layer: "top",
  hexpand: false,
  visible: false,

  child: Widget.Scrollable({
    hscroll: "never",
    vscroll: "automatic",
    className: "scrollable-content-window",
    expand: true,
    child: Widget.Box({
      className: "content-wrapper",
      vertical: true,
      children: [ThemePicker()],
    }),
  }),
})

export default customizeWindow

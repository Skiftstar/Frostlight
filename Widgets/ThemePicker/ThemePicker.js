import Widget from "resource:///com/github/Aylur/ags/widget.js"

const ThemePicker = () =>
  Widget.Box({
    expand: true,
    vertical: true,
    child: Widget.Label("Customization"),
  })

export default ThemePicker

import AudioControl from "./../AudioControl/AudioControl.js"
import MediaBox from "../MediaControl/MediaControl.js"

const audioWindow = Widget.Window({
  monitor: 1,
  name: "audiowindow",
  className: "content-wrapper",
  anchor: ["left", "top", "bottom"],
  margins: [0, 0, 0, 0],

  exclusivity: "exclusive",
  layer: "top",
  hexpand: false,
  visible: false,

  child: Widget.Box({
    vertical: true,
    children: [MediaBox(), AudioControl()],
  }),
})

export default audioWindow

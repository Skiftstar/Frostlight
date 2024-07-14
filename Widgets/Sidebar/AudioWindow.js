import AudioControl from "./../AudioControl/AudioControl.js"
import MediaBox from "../MediaControl/MediaControl.js"
import MasterVolumeControlWrapper from "./../AudioControl/components/MasterVolumeControl.js"

const audioWindow = Widget.Window({
  monitor: 1,
  name: "audiowindow",
  className: "content-window",
  anchor: ["left", "top", "bottom"],
  margins: [0, 0, 0, 0],

  exclusivity: "exclusive",
  layer: "top",
  hexpand: false,
  visible: false,

  child: Widget.Box({
    className: "content-wrapper",
    vertical: true,
    children: [MasterVolumeControlWrapper(), MediaBox(), AudioControl()],
  }),
})

export default audioWindow

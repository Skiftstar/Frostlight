import AudioControl from "./../AudioStreamControl/AudioControl.js";
import MediaBox from "../MediaControl/MediaControl.js";
import MasterVolumeControlWrapper from "./../AudioStreamControl/components/MasterVolumeControl.js";
import AudioDevices from "./../AudioDeviceControl/AudioDeviceControl.js";
import { config } from "./../../util/ConfigUtil.js";

const audioWindow = Widget.Window({
  monitor: config.general.sidebar.monitor.bind("value"),
  name: "audiowindow",
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
      children: [
        MasterVolumeControlWrapper(),
        MediaBox(),
        AudioDevices(),
        AudioControl(),
      ],
    }),
  }),
});

export default audioWindow;

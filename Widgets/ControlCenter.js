import AudioControl from "./AudioControl/AudioControl.js";
import MediaBox from "./MediaControl/MediaControl.js";

const controlCenter = Widget.Window({
  monitor: 1,
  name: "control_center",
  className: "control-center-wrapper",
  anchor: ["left", "top", "bottom"],
  margins: [20, 0, 0, 20],

  exclusivity: "exclusive",
  layer: "top",

  child: Widget.CenterBox({
    vertical: true,
    spacing: 150,
    startWidget: Widget.Box({
      vertical: true,
      class_name: "control-center",
      children: [MediaBox(), AudioControl()],
    }),
    // Expanding Boxes to block off remaining Space
    // otherwise Control Center would grow to the bottom
    centerWidget: Widget.Box({ expand: true }),
    endWidget: Widget.Box({
      expand: true,
    }),
  }),
});

export default controlCenter;

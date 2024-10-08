import { config } from "./../Config/Config.js";
import { getConfigValue } from "../../util/ConfigUtil.js";

const configWindow = Widget.Window({
  monitor: getConfigValue("general.monitor"),
  name: "configwindow",
  className: "content-window",
  anchor: ["left", "top", "bottom"],
  margins: [0, 0, 0, 0],

  exclusivity: "exclusive",
  //IMPORTANT: This needs to be set so that Input Fields can receive
  //Keystrokes when focused
  keymode: "on-demand",
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
      children: [config()],
    }),
  }),
});

export default configWindow;

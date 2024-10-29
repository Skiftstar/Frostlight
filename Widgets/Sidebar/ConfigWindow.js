import { config as configSideWindow } from "./../Config/Config.js";
import { config } from "../../util/ConfigUtil.js";

export const CONFIG_WINDOW_NAME = "configwindow";

const configWindow = Widget.Window({
  monitor: config.general.sidebar.monitor.bind("value"),
  name: CONFIG_WINDOW_NAME,
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
      children: [configSideWindow()],
    }),
  }),
});

export default configWindow;

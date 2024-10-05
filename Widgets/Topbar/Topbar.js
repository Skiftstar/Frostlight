import { Clock } from "./../Clock/Clock.js";
import { getConfigValue } from "../../util/ConfigUtil.js";
import { SysTray } from "./../SysTray/SystemTray.js";
import { Workspaces } from "./../Workspaces/Workspaces.js";

let toggledWindow = undefined;

const toggleWindow = (newWindow) => {
  if (toggledWindow) App.closeWindow(toggledWindow);
  if (newWindow) {
    App.openWindow(newWindow);
    toggledWindow = newWindow;
  }
};

const topbar = (monitor) => {
  const display = Widget.CenterBox({
    name: `Topbar-Content-${monitor}`,
    expand: true,
    startWidget: Workspaces(monitor),
    centerWidget: Clock(),
    endWidget: SysTray(),
  });
  return Widget.Window({
    monitor,
    name: `topbar-${monitor}`,
    className: "topbar-wrapper",
    anchor: ["left", "top", "right"],
    margins: [0, 0, 0, 0],

    exclusivity: "exclusive",
    layer: "bottom",
    expand: true,

    child: display,
  });
};

export default topbar;

import sidebar from "./Widgets/Sidebar/Sidebar.js";
import audioWindow from "./Widgets/Sidebar/AudioWindow.js";
import customizeWindow from "./Widgets/Sidebar/CustomizeWindow.js";
import configWindow from "./Widgets/Sidebar/ConfigWindow.js";
import topbar from "./Widgets/Topbar/Topbar.js";
import { config } from "./util/ConfigUtil.js";
import Gdk from "gi://Gdk";
import { corner } from "./Widgets/Misc/CornerRounding.js";

App.addIcons(`${App.configDir}/assets/icons`);

const monitorCount = Gdk.Display.get_default()?.get_n_monitors() || 1;
const topbarWindows = [];

const windows = [
  sidebar(config.general.sidebar.monitor.bind("value")),
  audioWindow,
  customizeWindow,
  configWindow,
];

if (config.general.topbar.enabled.value) {
  for (const id of Array(monitorCount).keys()) {
    const topbarWindow = topbar(id);
    windows.push(topbarWindow);
    topbarWindows.push(topbarWindow);
  }
  const cornerWindow = corner(config.general.sidebar.monitor.value); // Corner rounding for sidebar/topbar intersection
  windows.push(cornerWindow);
  topbarWindows.push(cornerWindow);
}

App.config({
  style: "./style/main.css",
  windows,
});

config.general.topbar.enabled.connect("changed", (option) => {
  if (option.value === "true") {
    for (const id of Array(monitorCount).keys()) {
      const topbarWindow = topbar(id);
      topbarWindows.push(topbarWindow);
      App.addWindow(topbarWindow);
    }
    const cornerWindow = corner(config.general.sidebar.monitor.value);
    topbarWindows.push(cornerWindow);
    App.addWindow(cornerWindow);
  } else {
    for (const topbarWindow of topbarWindows) {
      App.removeWindow(topbarWindow);
    }
    topbarWindows.splice(0, topbarWindows.length); // clear array
  }
});

Utils.monitorFile(
  App.configDir,
  (file, event) => {
    App.applyCss(`${App.configDir}/style/main.css`);
  },
  { recursive: true },
);

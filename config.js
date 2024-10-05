import sidebar from "./Widgets/Sidebar/Sidebar.js";
import audioWindow from "./Widgets/Sidebar/AudioWindow.js";
import customizeWindow from "./Widgets/Sidebar/CustomizeWindow.js";
import configWindow from "./Widgets/Sidebar/ConfigWindow.js";
import topbar from "./Widgets/Topbar/Topbar.js";
import { getConfigValue } from "./util/ConfigUtil.js";
import Gdk from "gi://Gdk";
import { corner } from "./Widgets/Misc/CornerRounding.js";

App.addIcons(`${App.configDir}/assets/icons`);

const monitorCount = Gdk.Display.get_default()?.get_n_monitors() || 1;

const windows = [
  sidebar(getConfigValue("general.sidebarMonitor")),
  audioWindow,
  customizeWindow,
  configWindow,
];

if (getConfigValue("general.topbarEnabled")) {
  for (const id of Array(monitorCount).keys()) {
    windows.push(topbar(id));
  }
  windows.push(corner(getConfigValue("general.sidebarMonitor"))); // Corner rounding for sidebar/topbar intersection
}

App.config({
  style: "./style/main.css",
  windows,
});

Utils.monitorFile(
  App.configDir,
  (file, event) => {
    App.applyCss(`${App.configDir}/style/main.css`);
  },
  { recursive: true },
);

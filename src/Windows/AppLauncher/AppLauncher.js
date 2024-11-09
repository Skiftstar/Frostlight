import AppLauncherContent from "./components/AppLauncherContent.js";
const hyprland = await Service.import("hyprland");

const applauncher = () =>
  Widget.Window({
    monitor: hyprland.active.monitor.bind("id"),
    name: "applauncherwindow",
    className: "applauncher-window",
    anchor: [],
    visible: false,
    margins: [0, 0, 0, 0],

    //IMPORTANT: This needs to be set so that Input Fields can receive
    //Keystrokes when focused
    keymode: "exclusive",

    exclusivity: "ignore",
    layer: "overlay",
    hexpand: false,

    child: AppLauncherContent(),
  });

export default applauncher;

import sidebar from "./Widgets/Sidebar/Sidebar.js"
import audioWindow from "./Widgets/Sidebar/AudioWindow.js"
// import Gdk from "gi://Gdk"

// const CLOSE_ANIM_TIME = 210;
// const closeWindowDelays = {};
// for (let i = 0; i < (Gdk.Display.get_default()?.get_n_monitors() || 1); i++) {
//     closeWindowDelays[`osk${i}`] = CLOSE_ANIM_TIME;
// }

App.addIcons(`${App.configDir}/assets/icons`)

App.config({
  style: "./style.css",
  windows: [sidebar, audioWindow],
  // closeWindowDelay: closeWindowDelays,
})

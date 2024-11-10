import { App } from "astal/gtk3";
import style from "./style/main.scss";
import Bar from "./widget/Bar";
import Sidebar from "./src/Windows/Sidebar/Sidebar";
import AudioWindow from "./src/Windows/AudioWindow/AudioWindow";
import Topbar from "./src/Windows/Topbar/Topbar";

App.add_icons(`./assets/icons`);

App.start({
  css: style,
  main() {
    // App.get_monitors().map(Sidebar);
    Sidebar(1);
    AudioWindow(1);
    App.get_monitors().map((_, index) => {
      Topbar(index);
    });
  },
});

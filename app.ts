import { App } from "astal/gtk3";
import style from "./style/main.scss";
import Bar from "./widget/Bar";
import Sidebar from "./src/Windows/Sidebar/Sidebar";

App.start({
  css: style,
  main() {
    App.get_monitors().map(Sidebar);
  },
});

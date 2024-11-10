import { App, Astal, Gtk, Gdk } from "astal/gtk3";

export default function Sidebar(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      className="sidebar-wrapper"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.BOTTOM
      }
      application={App}
      layer={"top"}
    >
      <box expand={true} name={"Sidebar-Content"}>
        <label label={"test"}></label>
      </box>
    </window>
  );
}

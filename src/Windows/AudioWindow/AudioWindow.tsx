import { App, Astal, Gtk, Gdk } from "astal/gtk3";

export default function AudioWindow(monitor: number) {
  return (
    <window
      name={"audiowindow"}
      className="content-window"
      monitor={monitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.BOTTOM
      }
      visible={false}
      application={App}
      layer={Astal.Layer.TOP}
    >
      <scrollable
        hscroll={Gtk.PolicyType.NEVER}
        vscroll={Gtk.PolicyType.AUTOMATIC}
        className={"scrollable-content-window"}
        expand={true}
      >
        <box className={"content-wrapper"} vertical={true}></box>
      </scrollable>
    </window>
  );
}

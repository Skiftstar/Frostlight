import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import SidebarButtons from "./SidebarButtons/SidebarButtons"

export default function Sidebar(monitor: number) {
  return (
    <window
      className="sidebar-wrapper"
      monitor={monitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.BOTTOM
      }
      application={App}
      layer={Astal.Layer.TOP}
    >
      <box expand={true} name={"Sidebar-Content"}>
        <SidebarButtons />
      </box>
    </window>
  )
}

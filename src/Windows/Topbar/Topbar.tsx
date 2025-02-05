import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import Clock from "./Clock/Clock"
import SystemTray from "./SysTray/SystemTray"
import Workspaces from "./Workspaces/Workspaces"

export default function Topbar(monitor: number) {
  return (
    <window
      name={`topbar-${monitor}`}
      className="topbar-wrapper"
      monitor={monitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      expand={true}
      application={App}
      layer={Astal.Layer.TOP}
    >
      <centerbox
        className={"topbar-content-wrapper"}
        expand={true}
        startWidget={Workspaces(monitor)}
        centerWidget={Clock()}
        endWidget={SystemTray()}
      />
    </window>
  )
}

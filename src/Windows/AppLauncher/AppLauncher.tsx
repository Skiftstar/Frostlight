import AppLauncherContent from "./components/AppLauncherContent"
import Hyprland from "gi://AstalHyprland"

export function AppLauncher() {
  return (
    <window
      monitor={0}
      name={"applauncherwindow"}
      className={"aupplauncher-window"}
    >
      {AppLauncherContent()}
    </window>
  )
}

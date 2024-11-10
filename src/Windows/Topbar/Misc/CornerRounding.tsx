import { Astal } from "astal/gtk3"

export default function Corner(monitor: number) {
  return (
    <window
      monitor={monitor}
      name={"Topbar-Corner-Rounding"}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT}
      className={"corner-rounding-window"}
    >
      <icon icon={"corner-symbolic"} className={"rounded-corner"} />
    </window>
  )
}

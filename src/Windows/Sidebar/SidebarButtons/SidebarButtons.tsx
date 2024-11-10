import SidebarButton from "./Button"

export default function SidebarButtons() {
  return (
    <box vertical={true} className={"sidebar-button-wrapper"} spacing={20}>
      <SidebarButton iconName={"player"} windowName={"audiowindow"} />
      <SidebarButton iconName={"xapp-edit"} windowName={"customizewindow"} />
      <SidebarButton iconName={"preferences"} windowName={"configwindow"} />
    </box>
  )
}

import SidebarButton from "./Button.js"

const sideBarButtons = (changeWindow) => {
  let active = false

  return Widget.Box({
    name: "sidebar_buttons",
    className: `sidebar-button-wrapper`,
    vertical: true,
    expand: false,
    hpack: "start",
    children: [SidebarButton("player", changeWindow)],
  })
}

export default sideBarButtons

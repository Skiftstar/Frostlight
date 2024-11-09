import sideBarButtons from "./SidebarButtons/SidebarButtons.js"

const display = Widget.Box({
	name: "Sidebar-Content",
	expand: true,
	child: sideBarButtons(),
})

const sidebar = (monitor) =>
	Widget.Window({
		monitor: monitor,
		name: "sidebar_center",
		className: "sidebar-wrapper",
		anchor: ["left", "top", "bottom"],
		margins: [0, 0, 0, 0],

		exclusivity: "exclusive",
		layer: "top",
		hexpand: false,

		child: display,
	})

export default sidebar

import {Clock} from "./Clock/Clock.js"
import {SysTray} from "./SysTray/SystemTray.js"
import {Workspaces} from "./Workspaces/Workspaces.js"

const topbar = (monitor) => {
	const display = Widget.CenterBox({
		name: `Topbar-Content-${monitor}`,
		expand: true,
		className: "topbar-content-wrapper",
		startWidget: Workspaces(monitor),
		centerWidget: Clock(),
		endWidget: SysTray(),
	})
	return Widget.Window({
		monitor,
		name: `topbar-${monitor}`,
		className: "topbar-wrapper",
		anchor: ["left", "top", "right"],
		margins: [0, 0, 0, 0],

		exclusivity: "exclusive",
		layer: "bottom",
		expand: true,

		child: display,
	})
}

export default topbar

import {config} from "../../Util/Config/ConfigUtil.js"
import ThemePicker from "./ThemePicker/ThemePicker.js"

const customizeWindow = Widget.Window({
	monitor: config.general.sidebar.monitor.bind("value"),
	name: "customizewindow",
	className: "content-window",
	anchor: ["left", "top", "bottom"],
	margins: [0, 0, 0, 0],

	exclusivity: "exclusive",
	layer: "top",
	//IMPORTANT: This needs to be set so that Input Fields can receive
	//Keystrokes when focused
	keymode: "on-demand",
	hexpand: true,
	visible: false,

	child: Widget.Scrollable({
		hscroll: "never",
		vscroll: "automatic",
		className: "scrollable-content-window",
		expand: true,
		child: Widget.Box({
			className: "content-wrapper",
			vertical: true,
			hexpand: true,
			children: [ThemePicker()],
		}),
	}),
})

export default customizeWindow

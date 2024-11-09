import LoopButton from "./Buttons/LoopButton.js"
import NextButton from "./Buttons/NextButton.js"
import PlayButton from "./Buttons/PlayButton.js"
import PreviousButton from "./Buttons/PreviousButton.js"
import ShuffleButton from "./Buttons/ShuffleButton.js"

function lengthStr(length) {
	if (length === -1) return ""
	if (length === 0) return "Unknown"
	const min = Math.floor(length / 60)
	const sec = Math.floor(length % 60)
	const sec0 = sec < 10 ? "0" : ""
	return `${min}:${sec0}${sec}`
}

const ButtonsAndLength = (player) =>
	Widget.CenterBox({
		class_name: "media-controls",
		hexpand: true,

		startWidget: Widget.Label({
			className: "position-label",
			label: lengthStr(player.position),
			hpack: "start",
			vpack: "start",
			hexpand: true,
		}).poll(1000, (self) => (self.label = lengthStr(player.position))),

		centerWidget: Widget.Box({
			hpack: "center",
			className: "media-button-row",
			children: [
				ShuffleButton(player),
				PreviousButton(player),
				PlayButton(player),
				NextButton(player),
				LoopButton(player),
			],
		}),

		endWidget: Widget.Label({
			className: "position-label",
			label: player.bind("length").as((length) => lengthStr(length)),
			hpack: "end",
			vpack: "start",
			hexpand: true,
		}),
	})

export default ButtonsAndLength

import Audio from "resource:///com/github/Aylur/ags/service/audio.js"
import {AudioButtonApplication} from "./control/AudioButton.js"
import {VolumeSliderApplication} from "./control/VolumeSlider.js"

let applicationStreams = {}

const update = (box) => {
	applicationStreams = {}

	Audio.apps.forEach((stream) => {
		if (stream.description.startsWith("audio stream #")) {
			const key = `${stream.name.replace('.exe', '')}`
			if (!(key in applicationStreams)) {
				applicationStreams[key] = {
					main: stream,
					children: [],
					name: key,
				}
			} else {
				applicationStreams[key].children.push(stream)
				applicationStreams[
					key
				].name = `${key} +${applicationStreams[key].children.length} streams`
			}
		} else {
			const key = `${stream.name} (${stream.description})`
			applicationStreams[key] = {
				main: stream,
				children: [],
				name: key,
			}
		}
	})

	box.children = Object.values(applicationStreams).map((stream) => {
		return Widget.Box({
			vertical: true,
			class_name: "slider-label-wrapper",
			children: [
				Widget.Box({
					children: [
						Widget.Label({
							className: "volume-label",
							truncate: "end",
							maxWidthChars: 40,
							justification: "left",
							label: stream.name,
						}),
					],
				}),
				Widget.Box({
					className: "volume-button-stack",
					children: [
						VolumeSliderApplication(stream),
						AudioButtonApplication(stream),
					],
				}),
			],
		})
	})
}

const ApplicationSliderWrapper = () =>
	Widget.Box({
		expand: true,
		vertical: true,
		spacing: 10,
	})
		.hook(Audio, update, "stream-removed")
		.hook(Audio, update, "stream-added")

export default ApplicationSliderWrapper

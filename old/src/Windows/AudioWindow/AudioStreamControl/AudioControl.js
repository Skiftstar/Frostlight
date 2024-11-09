import ApplicationSliderWrapper from "./components/ApplicationControl.js"
import MasterVolumeControlWrapper from "./components/MasterVolumeControl.js"

const AudioControl = () =>
	Widget.Box({
		vertical: true,
		className: "audio-control-wrapper",
		children: [ApplicationSliderWrapper()],
	})

export default AudioControl

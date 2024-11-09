import Audio from "resource:///com/github/Aylur/ags/service/audio.js"
import Dropdown from "../../../Components/Dropdown.js"

const micOptions = Variable([])
const speakerOptions = Variable([])
const activeSpeaker = Variable("")
const activeMicrophone = Variable("")

const SpeakerDropdown = Dropdown(
	speakerOptions,
	activeSpeaker,
	({option, index}) => {
		const newSpeaker = Audio.speakers[index]
		Audio.speaker = newSpeaker
	},
	"speaker"
)

const MicDropdown = Dropdown(
	micOptions,
	activeMicrophone,
	({option, index}) => {
		const newMic = Audio.microphones[index]
		Audio.microphone = newMic
	},
	"mic"
)

const update = (box) => {
	if (
		!Audio ||
		!Audio.speakers ||
		!Audio.microphones ||
		!Audio.microphone ||
		!Audio.microphone.id ||
		!Audio.speaker.id ||
		!Audio.speaker
	)
		return

	speakerOptions.value = Audio.speakers.map((speaker) => speaker.description)
	activeSpeaker.value =
		Audio.speakers.find(
			(speaker) => speaker && speaker.id && speaker.id === Audio.speaker.id
		).description ?? "Unknown"

	micOptions.value = Audio.microphones.map(
		(microphone) => microphone.description
	)
	activeMicrophone.value =
		Audio.microphones.find(
			(mic) => mic && mic.id && mic.id === Audio.microphone.id
		).description ?? "Unknown"
}

// FIXME: When the Audio devices gets changed
// in e.g. Pavu, the dropdown label doesn't update
const AudioDevices = () => {
	const flowBox = Widget.FlowBox({
		expand: false,
		rowSpacing: 10,
		className: "audio-device-control-wrapper",
	})
		.hook(Audio, update, "stream-added")
		.hook(Audio, update, "stream-removed")

	flowBox.add(SpeakerDropdown)
	flowBox.add(MicDropdown)

	return flowBox
}

export default AudioDevices

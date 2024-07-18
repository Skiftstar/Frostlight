import Audio from "resource:///com/github/Aylur/ags/service/audio.js"
import Dropdown from "./../../Components/Dropdown.js"

const update = (box) => {
  for (const child of box.get_children()) {
    box.remove(child)
    child.destroy()
  }

  const activeSpeaker =
    Audio.speakers.length > 0
      ? Audio.speakers.find((speaker) => speaker.id === Audio.speaker.id)
          .description ?? "Unknown"
      : "Unknown"

  box.add(
    Dropdown(
      Audio.speakers.map((speaker) => speaker.description),
      activeSpeaker,
      ({ option, index }) => {
        const newSpeaker = Audio.speakers[index]
        Audio.speaker = newSpeaker
      },
      "speaker"
    )
  )

  const activeMicrophone =
    Audio.microphones.length > 0
      ? Audio.microphones.find((mic) => mic.id === Audio.microphone.id)
          .description ?? "Unknown"
      : "Unknown"

  box.add(
    Dropdown(
      Audio.microphones.map((microphone) => microphone.description),
      activeMicrophone,
      ({ option, index }) => {
        const newMic = Audio.microphones[index]
        Audio.microphone = newMic
      },
      "mic"
    )
  )
}

const AudioDevices = () =>
  Widget.FlowBox({
    expand: false,
    rowSpacing: 10,
    className: "audio-device-control-wrapper",
  }).hook(Audio, update, "speaker-changed")

export default AudioDevices

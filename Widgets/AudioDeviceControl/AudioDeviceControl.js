import Audio from "resource:///com/github/Aylur/ags/service/audio.js"
import Dropdown from "./../../Components/Dropdown.js"

const update = (box) => {
  for (const child of box.get_children()) {
    box.remove(child)
    child.destroy()
  }

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

  const activeSpeaker =
    Audio.speakers.find(
      (speaker) => speaker && speaker.id && speaker.id === Audio.speaker.id
    ).description ?? "Unknown"

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
    Audio.microphones.find(
      (mic) => mic && mic.id && mic.id === Audio.microphone.id
    ).description ?? "Unknown"

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
  }).hook(Audio, update, "stream-added")

export default AudioDevices

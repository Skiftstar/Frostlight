import { Variable } from "astal"
import Wp from "gi://AstalWp"
import Dropdown from "../../../Components/Dropdown"
import { toggledWindow } from "../../../Util/WindowUtil"

const audio = Wp.get_default()!
const audioOptions = audio.get_audio()!

const micOptions = Variable<string[]>([])
const speakerOptions = Variable<string[]>([])
const activeSpeaker = Variable<string>("")
const activeMicrophone = Variable<string>("")

const update = () => {
  speakerOptions.set(
    audioOptions.get_speakers()!.map((speaker) => speaker.description),
  )
  activeSpeaker.set(audio?.defaultSpeaker?.description ?? "")

  micOptions.set(audioOptions.get_microphones()!.map((mic) => mic.description))
  activeMicrophone.set(audio.get_default_microphone()?.description ?? "")
}

export default function AudioDevices() {
  toggledWindow.subscribe((val) => {
    if (val === "audiowindow") update()
  })

  const speakerDropdown = Dropdown(
    speakerOptions,
    activeSpeaker,
    (_, index) => {
      const newSpekaer = audioOptions.get_speakers()?.[index]
      newSpekaer?.set_is_default(true)
    },
    "speaker",
  )

  const micDropdown = Dropdown(
    micOptions,
    activeMicrophone,
    (_, index) => {
      const newMicrophone = audioOptions.microphones[index]
      newMicrophone.set_is_default(true)
    },
    "mic",
  )

  return (
    <box
      expand={false}
      spacing={10}
      vertical={true}
      className={"audio-device-control-wrapper"}
      setup={(self) => {
        self.hook(audioOptions, "stream-added", update)
        self.hook(audioOptions, "stream-removed", update)
      }}
    >
      {speakerDropdown}
      {micDropdown}
    </box>
  )
}

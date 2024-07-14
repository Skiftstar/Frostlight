import Audio from "resource:///com/github/Aylur/ags/service/audio.js"
import AudioButton from "./control/AudioButton.js"
import VolumeSlider from "./control/VolumeSlider.js"

const MasterVolumeLabel = () =>
  Widget.Box({
    children: [
      Widget.Label({
        className: "volume-label",
        label: "Master",
        justification: "left",
      }),
    ],
  })

const MasterVolumeControl = () =>
  Widget.Box({
    className: "volume-button-stack master-volume-control",
    children: [VolumeSlider(Audio.speaker), AudioButton(Audio.speaker)],
  })

const MasterVolumeControlWrapper = () =>
  Widget.Box({
    vertical: true,
    class_name: "slider-label-wrapper master-slider-label-wrapper",
    children: [MasterVolumeLabel(), MasterVolumeControl()],
  })

export default MasterVolumeControlWrapper

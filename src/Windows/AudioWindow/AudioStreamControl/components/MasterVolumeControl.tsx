import { Variable } from "astal"
import Wp from "gi://AstalWp"
import { Gtk } from "astal/gtk3"
import VolumeSlider from "./control/VolumeSlider"

const audio = Wp.get_default()?.audio!

print(audio.get_default_speaker())

export default function MasterVolumeControl() {
  return (
    <box
      vertical={true}
      className={"slider-label-wrapper master-slider-label-wrapper"}
    >
      <label
        className={"volume-label"}
        justify={Gtk.Justification.LEFT}
        label={"Master"}
      />
      <box className={"volume-button-stack master-volume-control"}>
        {VolumeSlider(undefined)}
      </box>
    </box>
  )
}

import AstalMpris from "gi://AstalMpris?version=0.1"
import {
  LoopButton,
  NextButton,
  PlayButton,
  PreviousButton,
  ShuffleButton,
} from "./Buttons"
import { Gtk } from "astal/gtk3"
import { bind, Variable } from "../../../../../../../../../usr/share/astal/gjs"

function lengthStr(length: number) {
  if (length === -1) return ""
  if (length === 0) return "Unknown"
  const min = Math.floor(length / 60)
  const sec = Math.floor(length % 60)
  const sec0 = sec < 10 ? "0" : ""
  return `${min}:${sec0}${sec}`
}

export default function ButtonsAndLength(player: AstalMpris.Player) {
  const position = Variable("").poll(1000, () => {
    return lengthStr(player.position)
  })
  return (
    <centerbox
      className={"media-controls"}
      hexpand={true}
      startWidget={
        <label
          label={position()}
          className={"position-label"}
          halign={Gtk.Align.START}
          valign={Gtk.Align.START}
          hexpand={true}
        />
      }
      centerWidget={
        <box className={"media-button-row"} halign={Gtk.Align.CENTER}>
          {ShuffleButton(player)}
          {PreviousButton(player)}
          {PlayButton(player)}
          {NextButton(player)}
          {LoopButton(player)}
        </box>
      }
      endWidget={
        <label
          className={"position-label"}
          halign={Gtk.Align.END}
          valign={Gtk.Align.START}
          hexpand={true}
          label={bind(player, "length").as(lengthStr)}
        />
      }
    />
  )
}

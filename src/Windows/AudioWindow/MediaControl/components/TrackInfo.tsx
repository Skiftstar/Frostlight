import AstalMpris from "gi://AstalMpris?version=0.1"
import { bind } from "../../../../../../../../../usr/share/astal/gjs"
import { Gtk } from "astal/gtk3"

export default function TrackInfo(player: AstalMpris.Player) {
  return (
    <box className="track-info" vertical={true} expand={true}>
      <label
        className="track-name"
        maxWidthChars={75}
        wrap={true}
        halign={Gtk.Align.CENTER}
        truncate={true}
        justify={Gtk.Justification.LEFT}
        label={bind(player, "title").as((title) => `${title}`)}
      />
      <label
        className="artist-name"
        maxWidthChars={50}
        truncate={true}
        halign={Gtk.Align.CENTER}
        justify={Gtk.Justification.LEFT}
        label={bind(player, "artist").as((artist) => `${artist}`)}
      />
    </box>
  )
}

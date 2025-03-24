import { Gtk } from "astal/gtk3"

const TrackInfo = () => (
  <box className={"track-info"} halign={Gtk.Align.CENTER}>
    <label
      label="Nothing Playing"
      justify={Gtk.Justification.CENTER}
      wrap={true}
      maxWidthChars={50}
      className={"track-name"}
    />
  </box>
)

export default function NothingPlaying() {
  return (
    <centerbox
      centerWidget={TrackInfo()}
      className={"track-thumbnail-box"}
      expand={true}
    />
  )
}

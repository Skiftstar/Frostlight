import AstalMpris from "gi://AstalMpris?version=0.1"
import { Box } from "../../../../../../../../usr/share/astal/gjs/gtk3/widget"
import CoverArt from "./components/CoverArt"
import TrackInfo from "./components/TrackInfo"
import { Gtk } from "astal/gtk3"
import ProgressDisplay from "./components/ProgressDisplay"
import NothingPlaying from "./components/NothingPlaying"

const mpris = AstalMpris.get_default()

const priorityList = ["Spotify", "YouTube Music"]

const getPriorityIndex = (player: AstalMpris.Player) => {
  const index = priorityList.indexOf(player.identity)
  return index !== -1 ? index : priorityList.length
}

const update = (box: Box) => {
  const players = mpris.get_players()
  console.log(players.length)
  if (players.length === 0) {
    box.child = (
      <box expand={true} className={"media-box"}>
        {NothingPlaying()}
      </box>
    )
    return
  }

  players.sort((a, b) => {
    const priorityA = getPriorityIndex(a)
    const priorityB = getPriorityIndex(b)
    return priorityA - priorityB
  })

  box.children = players.map((player: AstalMpris.Player) => {
    return (
      <box hexpand={true} vexpand={true} vertical={false} className="media-box">
        {CoverArt(player)}
        <box vertical={true} expand={true} valign={Gtk.Align.CENTER}>
          {TrackInfo(player)}
          {ProgressDisplay(player)}
        </box>
      </box>
    )
  })
}

export default function MediaControl() {
  return (
    <box
      setup={(self) => {
        update(self)
        self.hook(mpris, "player-added", update)
        self.hook(mpris, "player-closed", update)
      }}
      vertical={true}
      expand={false}
      className="media-box-wrapper"
    ></box>
  )
}

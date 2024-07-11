import Widget from "resource:///com/github/Aylur/ags/widget.js"
import App from "resource:///com/github/Aylur/ags/app.js"
import Mpris from "resource:///com/github/Aylur/ags/service/mpris.js"
import ThumbnailTrackWrapper from "./components/TrackInfo.js"
import Position from "./components/PositionDisplay.js"
import MediaControls from "./components/ButtonControl.js"
import NothingPlayingDisplay from "./components/NothingPlaying.js"

let current = null

const update = (box) => {
  const player = Mpris.getPlayer("spotify") || Mpris.players[0] || null

  if (!player) {
    current = null
    box.children = [NothingPlayingDisplay()]
    return
  }

  current = player
  box.children = [
    ThumbnailTrackWrapper(player),
    Position(player),
    MediaControls(player),
  ]
}

const MediaBox = () =>
  Widget.Box({
    expand: false,
    vertical: true,
    className: "media-box",
  }).hook(Mpris, update, "notify::players")

export default MediaBox

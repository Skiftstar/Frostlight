import Widget from "resource:///com/github/Aylur/ags/widget.js"
import App from "resource:///com/github/Aylur/ags/app.js"
import Mpris from "resource:///com/github/Aylur/ags/service/mpris.js"
import ThumbnailTrackWrapper from "./components/TrackInfo.js"
import Position from "./components/PositionDisplay.js"
import ButtonsAndLength from "./components/ButtonAndLength.js"
import NothingPlayingDisplay from "./components/NothingPlaying.js"
import CoverArt from "./components/CoverArt.js"
import TrackInfo from "./components/TrackInfo.js"

// List of Audio Stream Priorities, lower index = higher on list
const priorityList = ["spotify", "youtube music"]

const getPriorityIndex = (name) => {
  const index = priorityList.indexOf(name)
  return index !== -1 ? index : priorityList.length
}

const update = (box) => {
  if (Mpris.players.length === 0) {
    box.children = [
      Widget.Box({
        expand: true,
        vertical: false,
        className: "media-box",
        child: NothingPlayingDisplay(),
      }),
    ]
    return
  }

  const players = Mpris.players

  // Make sure players are sorted accordingly
  players.sort((a, b) => {
    const priorityA = getPriorityIndex(a.name)
    const priorityB = getPriorityIndex(b.name)
    return priorityA - priorityB
  })

  box.children = players.map((player) =>
    Widget.Box({
      hexpand: true,
      vertical: false,
      className: "media-box",
      children: [
        CoverArt(player),
        Widget.Box({
          vertical: true,
          children:
            player.length >= 0
              ? [TrackInfo(player), Position(player), ButtonsAndLength(player)]
              : [TrackInfo(player), ButtonsAndLength(player)],
        }),
      ],
    })
  )
}

const MediaBox = () =>
  Widget.Box({
    expand: false,
    vertical: true,
    className: "media-box-wrapper",
  }).hook(Mpris, update, "notify::players")

export default MediaBox

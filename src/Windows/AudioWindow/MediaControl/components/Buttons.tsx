import AstalMpris from "gi://AstalMpris?version=0.1"
import { bind } from "../../../../../../../../../usr/share/astal/gjs"

export const LoopButton = (player: AstalMpris.Player) => (
  <button
    onClick={() => player.loop()}
    visible={bind(player, "loopStatus").as(
      (status) => status !== AstalMpris.Loop.UNSUPPORTED,
    )}
    className={bind(player, "loopStatus").as((status) =>
      status !== AstalMpris.Loop.NONE ? "loop-button active" : "loop-button",
    )}
  >
    <icon
      icon={bind(player, "loopStatus").as((status) => {
        if (status === AstalMpris.Loop.TRACK)
          return "media-playlist-repeat-song-symbolic"
        return "media-playlist-repeat-symbolic"
      })}
    />
  </button>
)

export const NextButton = (player: AstalMpris.Player) => (
  <button
    onClick={() => player.next()}
    className={"next-button"}
    visible={bind(player, "canGoNext")}
  >
    <icon icon={"media-skip-forward-symbolic"} />
  </button>
)

export const PreviousButton = (player: AstalMpris.Player) => (
  <button
    onClick={() => player.previous()}
    className={"previous-button"}
    visible={bind(player, "canGoPrevious")}
  >
    <icon icon={"media-skip-backward-symbolic"} />
  </button>
)

export const PlayButton = (player: AstalMpris.Player) => (
  <button onClick={() => player.play_pause()}>
    <icon
      className={"play-button"}
      icon={bind(player, "playbackStatus").as((status) => {
        if (status === AstalMpris.PlaybackStatus.PLAYING)
          return "media-playback-pause-symbolic"
        return "media-playback-start-symbolic"
      })}
    />
  </button>
)

export const ShuffleButton = (player: AstalMpris.Player) => (
  <button
    onClick={() => player.shuffle()}
    className={bind(player, "shuffleStatus").as((status) =>
      status === AstalMpris.Shuffle.ON
        ? "shuffle-button active"
        : "shuffle-button",
    )}
    visible={bind(player, "shuffleStatus").as(
      (status) => status !== AstalMpris.Shuffle.UNSUPPORTED,
    )}
  >
    <icon icon={"media-playlist-shuffle-symbolic"} />
  </button>
)

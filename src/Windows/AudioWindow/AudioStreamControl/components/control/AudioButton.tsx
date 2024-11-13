import Wp from "gi://AstalWp"
import { bind } from "astal"

export default function AudioButton(
  source: Wp.Endpoint,
  onChange?: (isMute: boolean) => void,
) {
  return (
    <box className={"audio-control-button"}>
      <button
        onClick={() => {
          if (source.get_mute()) {
            source.set_mute(false)
          } else {
            source.set_mute(true)
          }
          onChange?.(source.get_mute())
        }}
      >
        <stack
          tooltipText={bind(source, "volume").as(
            (value) => `Volume: ${Math.floor(value * 100)}%`,
          )}
          shown={bind(source, "mute").as((value) => (value ? "mute" : "audio"))}
        >
          <icon name={"audio"} icon={"audio-volume-high-symbolic"} />
          <icon name={"mute"} icon={"audio-volume-muted-symbolic"} />
        </stack>
      </button>
    </box>
  )
}

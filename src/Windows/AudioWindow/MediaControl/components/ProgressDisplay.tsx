import AstalMpris from "gi://AstalMpris?version=0.1"
import { Variable } from "../../../../../../../../../usr/share/astal/gjs"

export default function ProgressDisplay(player: AstalMpris.Player) {
  const progress = Variable(player.position).poll(250, () => {
    return player.position / player.length
  })

  return (
    <box hexpand={true} vertical={true}>
      <slider
        className="position-slider"
        value={progress()}
        drawValue={false}
        onDragged={(self) => {
          player.position = player.length * self.value
        }}
        hexpand={true}
      />
    </box>
  )
}

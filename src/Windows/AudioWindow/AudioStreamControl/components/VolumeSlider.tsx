import Wp from "gi://AstalWp"
import { bind } from "astal"

export default function VolumeSlider(
  source: Wp.Endpoint,
  onChange?: (value: number) => void,
) {
  return (
    <slider
      drawValue={false}
      className={"volume-slider"}
      hexpand={true}
      value={bind(source, "volume")}
      onDragged={({ value }) => {
        source.set_volume(value)
        onChange?.(value)
      }}
    />
  )
}

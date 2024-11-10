import GLib from "gi://GLib"
import { Variable } from "astal"

const date = Variable(GLib.DateTime.new_now_local()).poll(1000, () =>
  GLib.DateTime.new_now_local(),
)

const formats = ["%a %b %d", "%I:%M:%S %p"]
const format = Variable(formats[1])

const time = Variable.derive([date, format], (c, f) => c.format(f) || "")
export default function Clock() {
  return (
    <box className={"clock-wrapper"}>
      <button
        className={"clock-button"}
        label={time()}
        onClick={() => {
          format.set(formats[(formats.indexOf(format.get()) + 1) % 2])
        }}
      />
    </box>
  )
}

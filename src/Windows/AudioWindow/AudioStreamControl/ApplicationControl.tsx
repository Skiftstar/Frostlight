import Wp from "gi://AstalWp"
import { Gtk } from "astal/gtk3"
import VolumeSlider from "./components/VolumeSlider"
import AudioButton from "./components/AudioButton"
import { bind } from "astal"

const audio = Wp.get_default()?.audio!

let applicationStreams = bind(audio, "streams").as((streams) => {
  const groupedStreams: {
    [streamKey: string]: {
      isGrouped: boolean
      masterStream: Wp.Endpoint
      childStreams: Wp.Endpoint[]
      name: string
    }
  } = {}

  streams.forEach((stream) => {
    if (stream.name.startsWith("audio stream #")) {
      // Grouped Streams
      const key = `${stream.description.replace(".exe", "")}`
      if (!(key in groupedStreams)) {
        groupedStreams[key] = {
          masterStream: stream,
          childStreams: [],
          name: key,
          isGrouped: true,
        }
      } else {
        groupedStreams[key].childStreams.push(stream)
        groupedStreams[key].name =
          `${key} +${groupedStreams[key].childStreams.length} children`
      }
    }
    // Non Grouped Streams
    else {
      const key = `${stream.name} (${stream.description})`
      groupedStreams[key] = {
        masterStream: stream,
        childStreams: [],
        isGrouped: false,
        name: key,
      }
    }
  })

  return groupedStreams
})

export default function ApplicationVolumeControl() {
  return (
    <box
      vertical={true}
      className={"audio-control-wrapper"}
      spacing={10}
      expand={true}
    >
      {bind(applicationStreams).as((appStreams) => {
        const streams = Object.values(appStreams)
        return streams.map((stream) => {
          const onSliderDrag = stream.isGrouped
            ? (value: number) => {
                stream.childStreams.forEach((stream) =>
                  stream.set_volume(value),
                )
              }
            : undefined

          const onButtonClick = stream.isGrouped
            ? (isMute: boolean) => {
                stream.childStreams.forEach((stream) => stream.set_mute(isMute))
              }
            : undefined

          return (
            <box vertical={true} className={"slider-label-wrapper"}>
              <label
                className={"volume-label"}
                truncate={true}
                maxWidthChars={40}
                justify={Gtk.Justification.LEFT}
                label={stream.name}
                halign={Gtk.Align.START}
              />
              <box className={"volume-button-stack"}>
                {VolumeSlider(stream.masterStream, onSliderDrag)}
                {AudioButton(stream.masterStream, onButtonClick)}
              </box>
            </box>
          )
        })
      })}
    </box>
  )
}

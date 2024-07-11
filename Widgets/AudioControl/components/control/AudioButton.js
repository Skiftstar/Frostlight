let streamVolumes = {}

export const AudioButtonApplication = (source) =>
  Widget.Box({
    class_name: "audio-control-button",
    children: [
      Widget.Button({
        onClicked: () => {
          if (source.main.volume > 0) {
            streamVolumes[source.main.id] = source.main.volume
            source.main.volume = 0
            source.children.forEach((child) => (child.volume = 0))
          } else {
            source.main.volume = streamVolumes[source.main.id]
            source.children.forEach(
              (child) => (child.volume = streamVolumes[source.main.id])
            )
          }
        },
        child: Widget.Stack({
          children: {
            1: Widget.Icon("audio-volume-high-symbolic"),
            0: Widget.Icon("audio-volume-muted-symbolic"),
          },
          tooltipText: source.main
            .bind("volume")
            .as((v) => `Volume: ${Math.floor(v * 100)}%`),
        }).hook(source.main, (stack) => {
          if (!source) return

          if (source.main.isMuted) {
            stack.shown = "0"
            return
          }

          const show = [1, 0].find(
            (threshold) => threshold <= source.main.volume * 100
          )

          stack.shown = `${show}`
        }),
      }),
    ],
  })

const AudioButton = (source) =>
  Widget.Box({
    class_name: "audio-control-button",
    children: [
      Widget.Button({
        onClicked: () => {
          if (source.volume > 0) {
            streamVolumes[source.id] = source.volume
            source.volume = 0
          } else {
            source.volume = streamVolumes[source.id]
          }
        },
        child: Widget.Stack({
          children: {
            1: Widget.Icon("audio-volume-high-symbolic"),
            0: Widget.Icon("audio-volume-muted-symbolic"),
          },
          tooltipText: source
            .bind("volume")
            .as((v) => `Volume: ${Math.floor(v * 100)}%`),
        }).hook(source, (stack) => {
          if (!source) return

          if (source.isMuted) {
            stack.shown = "0"
            return
          }

          const show = [1, 0].find(
            (threshold) => threshold <= source.volume * 100
          )

          stack.shown = `${show}`
        }),
      }),
    ],
  })

export default AudioButton

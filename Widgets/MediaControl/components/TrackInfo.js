const TrackInfo = (player) =>
  Widget.Box({
    class_name: "track-info",
    vertical: true,
    expand: true,
    vpack: "start",
    children: [
      Widget.Label({
        // Track name label
        class_name: "track-name",
        maxWidthChars: 75,
        wrap: true,
        truncate: "end",
        hpack: "center",
        label: player.bind("track-title"),
        justification: "left",
      }),
      Widget.Label({
        // Artist name label
        class_name: "artist-name",
        maxWidthChars: 50,
        truncate: "end",
        hpack: "center",
        label: player.bind("track-artists").as((artists) => artists.join(", ")),
        justification: "left",
      }),
    ],
  })

export default TrackInfo

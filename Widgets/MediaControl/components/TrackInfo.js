const TrackInfo = (player) =>
  Widget.Box({
    class_name: "track-info",
    vertical: true,
    expand: true,
    children: [
      Widget.Box({
        // Empty box for centering
        expand: true, // Expands to fill remaining space
      }),
      Widget.Label({
        // Track name label
        class_name: "track-name",
        maxWidthChars: 50,
        wrap: true,
        label: player.bind("track-title"),
        justification: "center",
      }),
      Widget.Label({
        // Artist name label
        class_name: "artist-name",
        maxWidthChars: 50,
        label: player.bind("track-artists").as((artists) => artists.join(", ")),
        justification: "left",
      }),
      Widget.Box({
        // Empty box for centering
        expand: true, // Expands to fill remaining space
      }),
    ],
  })

export default TrackInfo

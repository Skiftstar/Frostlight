const TrackInfo = () =>
  Widget.Box({
    class_name: "track-info",
    vertical: false,
    hpack: "center",
    children: [
      Widget.Label({
        class_name: "track-name",
        maxWidthChars: 50,
        wrap: true,
        label: "Nothing Playing",
        justification: "center",
      }),
    ],
  });

const NothingPlayingDisplay = () =>
  Widget.CenterBox({
    vertical: false,
    expand: true,
    class_name: "track-thumnail-box",
    centerWidget: TrackInfo(),
  });

export default NothingPlayingDisplay;

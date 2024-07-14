const CoverArt = (player) =>
  Widget.Box({
    className: "cover-art",
    hexpand: false,
    widthRequest: "100",
    heightRequest: "100",
    css: player
      .bind("cover-path")
      .as((path) => `background-image: url("${path}");`),
  })

export default CoverArt

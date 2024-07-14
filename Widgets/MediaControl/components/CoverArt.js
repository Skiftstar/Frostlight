const CoverArt = (player) =>
  Widget.Box({
    className: "cover-art",
    expand: false,
    css: player
      .bind("cover-path")
      .as((path) => `background-image: url("${path}");`),
  })

export default CoverArt

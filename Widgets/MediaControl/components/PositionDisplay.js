function lengthStr(length) {
  if (length === 0) return "Unknown";
  const min = Math.floor(length / 60);
  const sec = Math.floor(length % 60);
  const sec0 = sec < 10 ? "0" : "";
  return `${min}:${sec0}${sec}`;
}

function updatePositionSlider(slider, player) {
  if (slider.dragging) return;
  if (player.length === 0) {
    slider.value = 0;
    return;
  }
  slider.value = player.position / player.length;
}

const Position = (player) => {
  return Widget.Box({
    vertical: true,
    children: [
      Widget.Slider({
        class_name: "position-slider",
        on_change: ({ value }) => {
          player.position = player.length * value;
        },
        draw_value: false,
        hexpand: true,
      }).poll(1000, (self) => updatePositionSlider(self, player)),
      Widget.Box({
        class_name: "position-label",
        hexpand: true,
        children: [
          Widget.Label({
            label: lengthStr(player.position),
            hpack: "start",
            hexpand: true,
          }).poll(1000, (self) => (self.label = lengthStr(player.position))),
          Widget.Label({
            label: player.bind("length").as((length) => lengthStr(length)),
            hpack: "end",
            hexpand: true,
          }),
        ],
      }),
    ],
  });
};

export default Position;

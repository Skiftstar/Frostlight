export const VolumeSliderApplication = (source) =>
  Widget.Slider({
    draw_value: false,
    class_name: "volume-slider",
    hexpand: true,
    on_change: ({ value }) => {
      source.main.volume = value
      source.children.forEach((child) => (child.volume = value))
    },
  }).hook(source.main, (self) => {
    if (!source) return
    self.value = source.main.volume
  })

const VolumeSlider = (source) =>
  Widget.Slider({
    draw_value: false,
    class_name: "volume-slider",
    hexpand: true,
    on_change: ({ value }) => (source.volume = value),
  }).hook(source, (self) => {
    if (!source) return
    self.value = source.volume
  })

export default VolumeSlider

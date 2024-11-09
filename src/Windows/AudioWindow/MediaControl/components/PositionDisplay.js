function updatePositionSlider(slider, player) {
	if (slider.dragging) return
	if (player.length === 0) {
		slider.value = 0
		return
	}
	slider.value = player.position / player.length
}

const Position = (player) => {
	return Widget.Box({
		hexpand: true,
		vertical: true,
		children: [
			Widget.Slider({
				class_name: "position-slider",
				on_change: ({value}) => {
					player.position = player.length * value
				},
				draw_value: false,
				hexpand: true,
			}).poll(1000, (self) => updatePositionSlider(self, player)),
		],
	})
}

export default Position

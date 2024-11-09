const ShuffleButton = (player) =>
	Widget.Button({
		onClicked: () => player.shuffle(),
		child: Widget.Icon("media-playlist-shuffle-symbolic"),
		visible: player.bind("shuffle-status").as((status) => status != null),
		class_name: player
			.bind("shuffle-status")
			.as((status) => (status ? "shuffle-button active" : "shuffle-button")),
	});

export default ShuffleButton;

const LoopButton = (player) =>
	Widget.Button({
		onClicked: () => player.loop(),
		child: Widget.Icon({
			icon: player.bind("loop-status").as((status) => {
				if (status === "Track") return "media-playlist-repeat-song-symbolic"
				return "media-playlist-repeat-symbolic"
			}),
		}),
		visible: player.bind("loop-status").as((status) => status != null),
		class_name: player
			.bind("loop-status")
			.as((status) =>
				status !== "None" ? "loop-button active" : "loop-button"
			),
	})

export default LoopButton

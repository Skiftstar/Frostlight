const NextButton = (player) =>
	Widget.Button({
		class_name: "next-button",
		onClicked: () => player.next(),
		child: Widget.Icon("media-skip-forward-symbolic"),
		visible: player.bind("can-go-next"),
	});

export default NextButton;

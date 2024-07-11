const PreviousButton = (player) =>
  Widget.Button({
    class_name: "previous-button",
    onClicked: () => player.previous(),
    child: Widget.Icon("media-skip-backward-symbolic"),
    visible: player.bind("can-go-prev"),
  });

export default PreviousButton;

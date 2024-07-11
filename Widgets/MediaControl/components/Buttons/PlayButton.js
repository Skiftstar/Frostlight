const PlayButton = (player) =>
  Widget.Button({
    onClicked: () => player.playPause(),
    child: Widget.Icon({
      class_name: "play-button",
      icon: player.bind("play-back-status").as((status) => {
        if (status === "Playing") return "media-playback-pause-symbolic";
        return "media-playback-start-symbolic";
      }),
    }),
  });

export default PlayButton;

import LoopButton from "./Buttons/LoopButton.js";
import NextButton from "./Buttons/NextButton.js";
import PlayButton from "./Buttons/PlayButton.js";
import PreviousButton from "./Buttons/PreviousButton.js";
import ShuffleButton from "./Buttons/ShuffleButton.js";

const MediaControls = (player) =>
  Widget.Box({
    class_name: "media-controls",
    hexpand: true,
    hpack: "center",
    children: [
      ShuffleButton(player),
      PreviousButton(player),
      PlayButton(player),
      NextButton(player),
      LoopButton(player),
    ],
  });

export default MediaControls;

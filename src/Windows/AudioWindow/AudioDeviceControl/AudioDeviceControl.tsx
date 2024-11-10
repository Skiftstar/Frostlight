import { Variable } from "astal";
import Wp from "gi://AstalWp";
import Dropdown from "../../../Components/Dropdown";

const audio = Wp.get_default()!.audio;

const micOptions = Variable<string[]>([]);
const speakerOptions = Variable<string[]>([]);
const activeSpeaker = Variable<string>("");
const activeMicrophone = Variable<string>("");

const speakerDropdown = Dropdown(
  speakerOptions,
  activeSpeaker,
  (_, index) => {
    const newSpekaer = audio.speakers[index];
    // audio.set = newSpeaker;
  },
  "speaker"
);

const update = () => {
  speakerOptions.set(
    audio.get_speakers()!.map((speaker) => speaker.description)
  );

  print(speakerOptions.get());
};

export default function AudioDevices() {
  return (
    <box
      expand={false}
      spacing={10}
      className={"audio-device-control-wrapper"}
      setup={(self) => {
        self.hook(audio, "stream-added", update);
      }}
    >
      {speakerDropdown}
    </box>
  );
}

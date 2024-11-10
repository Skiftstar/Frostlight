import { Variable, bind } from "astal";
import { Gtk } from "astal/gtk3";

export default function Dropdown(
  options: Variable<string[]>,
  activeItem: Variable<string>,
  onChange: (option: string, index: number) => void,
  icon: string | undefined
) {
  const showChild = Variable<boolean>(false);
  const animationDur = 250; //TODO: Make this customizeable

  const iconWidget = icon ? (
    <box halign={Gtk.Align.START} expand={true}>
      <icon
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.FILL}
        className={"dropdown-icon"}
        icon={`${icon}-symbolic`}
      />
    </box>
  ) : undefined;

  return (
    <box vertical={true}>
      <button
        className={bind(showChild).as(
          (val) => `dropdown-toggle ${val ? "active" : ""}`
        )}
        onClick={() => {
          showChild.set(!showChild.get());
        }}
      >
        <centerbox
          startWidget={iconWidget}
          centerWidget={
            <label
              maxWidthChars={30}
              truncate={true}
              justify={Gtk.Justification.CENTER}
              expand={true}
              label={bind(activeItem)}
            />
          }
        />
      </button>
      <revealer
        valign={Gtk.Align.START}
        transitionDuration={animationDur}
        transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
        revealChild={bind(showChild)}
      >
        <box className={"dropdown-options-stack"} vertical={true}>
          {bind(options).as((options) =>
            options.map((option, index) => {
              return (
                <button
                  className={"dropdown-option-button"}
                  onClick={() => {
                    activeItem.set(option);
                    showChild.set(false);
                    onChange(option, index);
                  }}
                >
                  <label
                    maxWidthChars={30}
                    truncate={true}
                    className={"dropdown-label"}
                    label={option}
                  />
                </button>
              );
            })
          )}
        </box>
      </revealer>
    </box>
  );
}

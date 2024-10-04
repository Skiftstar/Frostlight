import GLib from "gi://GLib";
const date = Variable(GLib.DateTime.new_now_local(), {
  poll: [1000, () => GLib.DateTime.new_now_local()],
});

const formats = ["%a %b %d", "%I:%M:%S %p"];
const format = Variable(formats[1]);

const time = Utils.derive([date, format], (c, f) => c.format(f) || "");

export const Clock = () =>
  Widget.Box({
    className: "clock-wrapper",
    children: [
      Widget.Button({
        className: "clock-button",
        label: time.bind(),
        onClicked: () => {
          format.value = formats[(formats.indexOf(format.value) + 1) % 2];
        },
      }),
    ],
  });

import Tray from "gi://AstalTray";
import { bind } from "astal";
import { Gdk, App } from "astal/gtk3";

const SysTrayItem = (item: Tray.TrayItem) => {
  if (item.iconThemePath) {
    App.add_icons(item.iconThemePath);
  }

  const menu = item.create_menu();

  return (
    <button
      className={"systray-item-button"}
      tooltipMarkup={bind(item, "tooltipMarkup")}
      onClick={(self, event) => {
        // Left Click
        if (event.button.valueOf() === 1) {
          item.activate(0, 0);
        }

        // Right Click
        if (event.button.valueOf() === 3)
          menu?.popup_at_widget(
            self,
            Gdk.Gravity.SOUTH,
            Gdk.Gravity.NORTH,
            null
          );
      }}
    >
      <icon gIcon={bind(item, "gicon")} />
    </button>
  );
};

export default function SystemTray() {
  const tray = Tray.get_default();
  return (
    <box>
      {bind(tray, "items").as((i) => i.filter((i) => i.id).map(SysTrayItem))}
    </box>
  );
}

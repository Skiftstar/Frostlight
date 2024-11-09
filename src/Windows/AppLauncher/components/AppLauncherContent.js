import Gtk from "gi://Gtk?version=3.0";
import { config } from "./../../../Util/Config/ConfigUtil.js";
const applications_service = await Service.import("applications");
import Gdk from "gi://Gdk";
import { unicodeToChar } from "./../../../Util/StringUtil.js";

let entry;

const AppItem = (app) => {
  const button = Widget.Button({
    class_name: "applauncher-application-entry",
    child: Widget.Box({
      children: [
        Widget.Icon({
          class_name: "application_icon",
          icon: Utils.lookUpIcon(app.icon_name)
            ? app.icon_name
            : "image-missing",
          size: 42,
        }),
        Widget.Label({
          class_name: "applauncher-application-label",
          label: app.name,
          vpack: "center",
          truncate: "end",
        }),
      ],
    }),
    on_clicked: (self) => {
      App.closeWindow("applauncherwindow");
      entry.grab_focus();
      app.launch();
      entry.text = "";
    },
  });

  return Widget.Box({
    attribute: { app },
    orientation: Gtk.Orientation.VERTICAL,
    children: [
      button,
      Widget.Separator({
        class_name: "application_divider",
        orientation: Gtk.Orientation.HORIZONTAL,
      }),
    ],
  });
};

const CommandItem = (command) => {
  const button = Widget.Button({
    class_name: "applauncher-application-entry",
    child: Widget.Box({
      children: [
        Widget.Label({
          class_name: "applauncher-application-label",
          label: command,
          vpack: "center",
          truncate: "end",
        }),
      ],
    }),
    on_clicked: (self) => {
      App.closeWindow("applauncherwindow");
      entry.grab_focus();
      Utils.execAsync(`bash -c "${command} & disown"`);
      entry.text = "";
    },
  });

  return Widget.Box({
    attribute: { command },
    orientation: Gtk.Orientation.VERTICAL,
    children: [
      button,
      Widget.Separator({
        class_name: "application_divider",
        orientation: Gtk.Orientation.HORIZONTAL,
      }),
    ],
  });
};

const AppLauncherContent = () => {
  let applications = [];
  let commands = [];

  const list = Widget.Box({
    vertical: true,
    vexpand: true,
  });

  entry = Widget.Entry({
    class_name: "applauncher-searchbox",
    placeholder_text: "Search",

    on_accept: () => {
      const results = applications.filter((item) => item.visible);
      const commandResults = commands.filter((item) => item.visible);

      if (results[0] || commandResults[0]) {
        App.closeWindow("applauncherwindow");
        entry.text = "";
        entry.grab_focus();
      }

      if (results[0]) {
        results[0].attribute.app.launch();
      } else if (commandResults[0]) {
        Utils.execAsync(
          `bash -c "${commandResults[0].attribute.command} & disown"`
        );
      }
    },

    on_change: ({ text }) => {
      applications.forEach((item) => {
        item.visible = item.attribute.app.match(text ?? "");
      });
      commands.forEach((item) => {
        item.visible = item.attribute.command.startsWith(text ?? "");
      });
    },
  });

  function reload() {
    applications_service.reload();
    repopulate();
  }

  function repopulate() {
    applications = applications_service.query("").map(AppItem);
    const commandList = config.overlay.applauncher.commands.value.split(",");
    commands = commandList.map(CommandItem);
    list.children = [...applications, ...commands];
  }

  const menu = Widget.Menu({
    children: [
      Widget.MenuItem({
        label: "Reload apps",
        on_activate: (self) => {
          reload();
        },
      }),
    ],
  });

  repopulate();

  config.overlay.applauncher.commands.connect("changed", (option) => {
    repopulate();
  });

  return Widget.EventBox({
    on_secondary_click_release: (self, event) => {
      menu.popup_at_pointer(event);
    },
    child: Widget.Box({
      vertical: true,
      class_name: "applauncher-box",
      children: [
        entry,
        Widget.Separator(),
        Widget.Scrollable({
          hscroll: "never",
          child: list,
        }),
      ],
    }),
  })
    .keybind("Escape", (self, even) => {
      App.toggleWindow("applauncherwindow");
      entry.text = "";
      entry.grab_focus();
    })
    .on("key-press-event", (self, event) => {
      const keyval = event.get_keyval()[1];

      if (
        keyval === Gdk.KEY_Down ||
        keyval === Gdk.KEY_Up ||
        keyval === Gdk.KEY_Escape ||
        keyval === Gdk.KEY_Return ||
        keyval === Gdk.KEY_KP_Enter
      )
        return;

      entry.grab_focus();
      entry.select_region(0, 0);

      if (keyval === Gdk.KEY_BackSpace) {
        entry.text = entry.text.substring(0, entry.text.length - 1);
        entry.set_position(entry.text.length);
        return;
      }

      const unicode = Gdk.keyval_to_unicode(keyval);
      const string = unicodeToChar(unicode);

      if (string.startsWith("\\") || string.length === 0) {
        return;
      }
      entry.text += string;
      entry.set_position(entry.text.length);
    });
};

// const AppLauncherContent = Widget.Box({
// 	children: [
// 		Widget.Label({
// 			label: "text"
// 		})
// 	]
// })
//
export default AppLauncherContent;

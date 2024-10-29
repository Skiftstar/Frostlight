import { firstLetterUpper } from "./../../util/GeneralUtil.js";
import { ConfigOption } from "./../../util/ConfigOption.js";
import { getConfigOptions, saveConfig } from "./../../util/ConfigUtil.js";
import { ConfigType } from "./../../util/ConfigType.js";

const configOptions = getConfigOptions();

const renderConfigFields = (groupedConfig, depth = 0) => {
  return Object.keys(groupedConfig)
    .filter((key) => key.length > 0)
    .map((group) => {
      const { options } = groupedConfig[group] || {};
      const hasSubGroups = Object.keys(groupedConfig[group]).some(
        (key) => key !== "options",
      );

      const level = group.split(".").length;

      // Render the group header
      const header = Widget.Label({
        className: `config-section-label depth-${level}`,
        label: firstLetterUpper(group.split(".").slice(-1)[0]), // Only show the last part of the group name
      });

      // Render options in this group
      const optionFields = options
        ? options.map(({ label, option }) => {
            let valueWidget;
            switch (option.getType()) {
              case ConfigType.BOOL:
                valueWidget = Widget.Switch({
                  className: `config-value-switch ${option.getValue() ? "active" : ""}`,
                  onActivate: (self) => {
                    option.setTempValue(self.active);
                    self.className = `config-value-switch ${self.active ? "active" : ""}`;
                  },
                  hexpand: true,
                  hpack: "center",
                  active: option.getValue(),
                });
                break;
              default:
                valueWidget = Widget.Entry({
                  className: `config-value-entry`,
                  text: String(option.getValue()),
                  hexpand: true,
                  onChange: (self) => {
                    option.setTempValue(self.text); // Update temporary value
                  },
                });
                break;
            }

            return Widget.Box({
              className: "config-label-input-pair",
              children: [
                Widget.Box({
                  hpack: "start",
                  className: "config-value-label-wrapper",
                  hexpand: false,
                  child: Widget.Label({
                    hpack: "end",
                    hexpand: true,
                    className: "config-value-label",
                    label: label,
                  }),
                }),
                Widget.Box({
                  hpack:
                    option.getType() === ConfigType.BOOL ? "start" : "center",
                  hexpand: true,
                  className: "config-value-entry-wrapper",
                  child: valueWidget,
                }),
              ],
            });
          })
        : [];

      // Recursively render subgroups
      const subGroups = hasSubGroups
        ? Object.keys(groupedConfig[group])
            .filter((key) => key !== "options")
            .map((subGroup) =>
              renderConfigFields(
                { [subGroup]: groupedConfig[group][subGroup] },
                depth + 1,
              ),
            )
        : [];

      return Widget.Box({
        vertical: true,
        className: "config-section",
        children: [
          header, // Add the group header
          ...optionFields, // Add the option fields
          ...subGroups, // Recursively add subgroups
        ],
      });
    });
};

const saveOptions = (options) => {
  options.forEach(({ option }) => {
    if (option instanceof ConfigOption) {
      option.applyChanges();
    }
  });
};

const recursiveSave = (configGroup) => {
  Object.keys(configGroup).forEach((key) => {
    const group = configGroup[key];

    if (group.options && group.options.length > 0) {
      // Apply saving for each option in the current group
      saveOptions(group.options);
    }

    // If there are subgroups, recursively apply `onSave`
    Object.keys(group).forEach((subKey) => {
      if (subKey !== "options") {
        recursiveSave(group[subKey]);
      }
    });
  });
};

export const config = () => {
  return Widget.Box({
    vertical: true,
    children: [
      ...renderConfigFields(configOptions),
      Widget.Button({
        className: "config-save-button",
        label: "Save",
        onClicked: () => {
          recursiveSave(configOptions);
          saveConfig();
        },
      }),
    ],
  });
};

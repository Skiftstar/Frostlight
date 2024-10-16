import { ConfigOption } from "./../../util/ConfigOption.js";
import { getConfigOptions, saveConfig } from "./../../util/ConfigUtil.js";

const configOptions = getConfigOptions();

console.log("options", configOptions);

const renderConfigFields = (groupedConfig, depth = 0) => {
  return Object.keys(groupedConfig).map((group) => {
    const { options } = groupedConfig[group] || {};
    const hasSubGroups = Object.keys(groupedConfig[group]).some(
      (key) => key !== "options",
    );

    // Render the group header
    const header = Widget.Label({
      className: `config-section-label depth-${depth}`,
      label: group.split(".").slice(-1)[0], // Only show the last part of the group name
    });

    // Render options in this group
    const optionFields = options
      ? options.map(({ label, option }) =>
          Widget.Box({
            className: "config-label-input-pair",
            children: [
              Widget.Box({
                hpack: "start",
                className: "config-value-label-wrapper",
                hexpand: true,
                child: Widget.Label({
                  className: "config-value-label",
                  label: label,
                }),
              }),
              Widget.Box({
                hpack: "end",
                className: "config-value-entry-wrapper",
                child: Widget.Entry({
                  className: "config-value-entry",
                  text: String(option.getValue()),
                  onChange: (self) => {
                    option.setTempValue(self.text); // Update temporary value
                  },
                }),
              }),
            ],
          }),
        )
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

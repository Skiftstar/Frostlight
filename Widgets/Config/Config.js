import { getConfig, saveContentToConfig } from "./../../util/ConfigUtil.js";

const configMap = getConfig();

const renderConfigFields = (config, path = []) => {
  return Object.keys(config).map((key) => {
    const value = config[key];
    const currentPath = [...path, key].join(".");

    if (typeof value === "object" && value !== null) {
      // Recursively render nested config as a Box
      return Widget.Box({
        vertical: true,
        className: "config-section",
        children: [
          Widget.Label({ className: "config-section-label", label: key }),
          ...renderConfigFields(value, [...path, key]),
        ],
      });
    } else {
      // Render an Entry field for all values
      return Widget.Box({
        className: "config-label-input-pair",
        children: [
          Widget.Box({
            hpack: "start",
            className: "config-value-label-wrapper",
            hexpand: true,
            child: Widget.Label({
              className: "config-value-label",
              label: key,
            }),
          }),
          Widget.Box({
            hpack: "end",
            className: "config-value-entry-wrapper",
            child: Widget.Entry({
              className: "config-value-entry",
              text: String(value),
              onChange: (self) => {
                const keys = currentPath.split(".");
                let obj = configMap;

                // Traverse the object to the desired key
                for (let i = 0; i < keys.length - 1; i++) {
                  obj = obj[keys[i]];
                }
                obj[keys[keys.length - 1]] = self.text;
              },
            }),
          }),
        ],
      });
    }
  });
};

export const config = () => {
  return Widget.Box({
    vertical: true,
    children: [
      ...renderConfigFields(configMap),
      Widget.Button({
        className: "config-save-button",
        label: "Save",
        onClicked: () => {
          saveContentToConfig(configMap);
        },
      }),
    ],
  });
};

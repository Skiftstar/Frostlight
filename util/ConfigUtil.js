import { ConfigOpt, ConfigOption } from "./ConfigOption.js";
import { ConfigType } from "./ConfigType.js";

const CONFIG_PATH = `${App.configDir}/config.json`;
const NON_EDIT_CONFIG_PATH = `${App.configDir}/noEditConfig.json`;

const noEditConfig = JSON.parse(Utils.readFile(`${NON_EDIT_CONFIG_PATH}`));

export const getNonEditConfigValue = (key) => {
  const keys = key.split(".");
  let value = noEditConfig;

  for (let k of keys) {
    if (value && typeof value === "object") {
      value = value[k];
    } else {
      return undefined;
    }
  }
  return value;
};

export const setNonEditConfigValue = (key, value) => {
  const keys = key.split(".");
  let current = noEditConfig;

  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    if (i === keys.length - 1) {
      current[k] = value;
    } else {
      if (!current[k] || typeof current[k] !== "object") {
        current[k] = {};
      }
      current = current[k];
    }
  }

  saveNonEditConfig();
};

const saveNonEditConfig = () => {
  Utils.writeFile(
    JSON.stringify(noEditConfig, null, "\t"),
    NON_EDIT_CONFIG_PATH,
  );
};

export const config = {
  general: {
    sidebar: {
      monitor: ConfigOpt(0, ConfigType.INT),
    },
    topbar: {
      enabled: ConfigOpt(true, ConfigType.BOOL),
    },
  },
  customization: {
    wallust: {
      enabled: ConfigOpt(true, ConfigType.BOOL),
      command: ConfigOpt(
        "wallust run '{{INPUT}}' -k -s -C '{{CONFIG}}'",
        ConfigType.STRING,
        "Use {{INPUT}} and {{CONFIG}} as placeholders",
      ),
    },
    wallpaper: {
      command: ConfigOpt(
        "swww img '{{INPUT}}'",
        ConfigType.STRING,
        "Command to change Wallpaper",
      ),
    },
    imageManipulation: {
      enabled: ConfigOpt(true, ConfigType.BOOL),
      command: ConfigOpt(
        "magick '{{INPUT}}' -brightness-contrast -40x0 '{{OUTPUT}}'",
        ConfigType.STRING,
        "Use {{INPUT}} and {{OUTPUT}} as placeholders",
      ),
    },
  },
};

const parseConfig = (obj) => {
  const result = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      // If the value is an object, we recursively parse it
      if (typeof value === "object" && !Array.isArray(value)) {
        result[key] = parseConfig(value);
      } else {
        result[key] = value.getValue();
      }
    }
  }

  return result;
};

export const saveConfigToFile = (config) => {
  const parsedConfig = parseConfig(config);
  const jsonContent = JSON.stringify(parsedConfig, null, "\t"); // pretty print JSON with tab as space
  Utils.writeFile(jsonContent, CONFIG_PATH);
};

const getConfigOpts = (config, path = []) => {
  let result = {};

  for (const key in config) {
    const value = config[key];
    const currentPath = path.join("."); // Store the current path as a string

    if (value instanceof ConfigOption) {
      // We're at a config option, not a group
      const parentPath = path.length ? path.join(".") : "root";
      if (!result[parentPath]) {
        result[parentPath] = { options: [] };
      }
      result[parentPath].options.push({
        label: key,
        option: value,
      });
    } else if (typeof value === "object" && value !== null) {
      // We're at a nested object (subgroup)
      const subConfig = getConfigOpts(value, [...path, key]);

      // Add the subgroup to the result, but avoid duplicating the name
      if (!result[currentPath]) {
        result[currentPath] = { options: [] };
      }

      result = { ...result, ...subConfig }; // Merge the subgroup results into the main result
    }
  }

  return result;
};

export const getConfigOptions = () => getConfigOpts(config);

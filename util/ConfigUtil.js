const CONFIG_PATH = `${App.configDir}/config.json`
const config = JSON.parse(Utils.readFile(`${CONFIG_PATH}`))

export const getConfigValue = (key) => {
    const keys = key.split(".");
    let value = config;

    for (let k of keys) {
        if (value && typeof value === 'object') {
            value = value[k];
        } else {
            return undefined;
        }
    }
    return value;
}

export const setConfigValue = (key, value) => {
    const keys = key.split(".");
    let current = config;

    for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (i === keys.length - 1) {
            current[k] = value;
        } else {
            if (!current[k] || typeof current[k] !== 'object') {
                current[k] = {};
            }
            current = current[k];
        }
    }

	saveConfig()
}

const saveConfig = () => {
    Utils.writeFile(JSON.stringify(config, null, "\t"), CONFIG_PATH)
}

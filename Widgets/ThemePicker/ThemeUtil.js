import { config } from "./../../util/ConfigUtil.js";
import { setNonEditConfigValue } from "../../util/ConfigUtil.js";

export const themeDir = `${App.configDir}/style/themes`;
export const wallustDir = `${App.configDir}/style/wallust`;
export const newThemeDropdownText = "Create new...";
export const newThemeDirName = "new";

export const readThemes = () => {
  let dirs = Utils.exec(`ls '${themeDir}'`).split("\n");
  dirs = dirs.filter((dir) => !dir.includes("."));
  dirs = dirs.filter((dir) => dir !== newThemeDirName);
  dirs.sort(sorter);
  dirs.push(newThemeDropdownText);

  return dirs;
};

export const toggleLightMode = (activeTheme, isActive) => {
  setNonEditConfigValue("customization.lightMode", isActive);
  Utils.exec(
    `cp '${themeDir}/${activeTheme}/theme_${isActive ? "light" : "dark"}.css' '${
      App.configDir
    }/style/colors.css'`,
  );
};

export const changeTheme = (newThemeName, isLightMode) => {
  if (newThemeName === newThemeDropdownText) return;

  const setWallpaperCommand = config.customization.wallpaper.command.value;
  Utils.exec(
    setWallpaperCommand.replace(
      "{{INPUT}}",
      `${themeDir}/${newThemeName}/wallpaper_dark.png`,
    ),
  );
  Utils.exec(
    `cp '${themeDir}/${newThemeName}/${isLightMode ? "theme_light.css" : "theme_dark.css"}' '${
      App.configDir
    }/style/colors.css'`,
  );
  setNonEditConfigValue("customization.theme", newThemeName);
};

export const renameTheme = (oldName, newName) => {
  Utils.exec(`mv '${themeDir}/${oldName}' '${themeDir}/${newName}'`);
};

export const changeThemeWallpaper = (themeName, wallpaperPath) => {
  if (wallpaperPath === `${themeDir}/${themeName}/wallpaper.png`) return;
  Utils.exec(`rm '${themeDir}/${themeName}/wallpaper.png'`);
  Utils.exec(`rm '${themeDir}/${themeName}/wallpaper_dark.png'`);
  placeWallpaper(themeName, wallpaperPath);
};

export const deleteTheme = (themeName) => {
  Utils.exec(`rm -rf '${themeDir}/${themeName}'`);
};

export const createColorScheme = (themeName) => {
  const wallustEnabled = config.customization.wallust.enabled.value;
  if (!wallustEnabled) {
    Utils.exec(
      `cp '${wallustDir}/default_theme_light.css' '${themeDir}/${themeName}/theme_light.css'`,
    );
    Utils.exec(
      `cp '${wallustDir}/default_theme_dark.css' '${themeDir}/${themeName}/theme_dark.css'`,
    );
  } else {
    const wallustCommand = config.customization.wallust.command.value;
    const configs = ["wallust_dark.toml", "wallust_light.toml"];

    for (const config of configs) {
      Utils.exec(
        wallustCommand
          .replace("{{CONFIG}}", `${wallustDir}/${config}`)
          .replace("{{INPUT}}", `${themeDir}/${themeName}/wallpaper.png`),
      );
    }
    const filesInTemp = Utils.exec(`ls '${wallustDir}/temp'`).split("\n");
    for (const file of filesInTemp) {
      Utils.exec(
        `mv '${wallustDir}/temp/${file}' '${themeDir}/${themeName}/${file}'`,
      );
    }
  }
};

export const handleNewWallpaper = (wallpaperPath) => {
  placeWallpaper(newThemeDirName, wallpaperPath);
  createColorScheme();
};

export const placeWallpaper = (themeName, wallpaperPath) => {
  const imageManipulationEnabled =
    config.customization.imageManipulation.enabled.value;
  const workingDir = `${themeDir}/${themeName}`;
  Utils.exec(`cp '${wallpaperPath}' '${workingDir}/wallpaper.png'`);

  if (imageManipulationEnabled) {
    const imageManipulationCommand =
      config.customization.imageManipulation.command.value;
    Utils.exec(
      imageManipulationCommand
        .replace("{{INPUT}}", `${workingDir}/wallpaper.png`)
        .replace("{{OUTPUT}}", `${workingDir}/wallpaper_dark.png`),
    );
  } else {
    Utils.exec(
      `cp '${workingDir}/wallpaper.png' '${workingDir}/wallpaper_dark.png'`,
    );
  }
};

export const saveTheme = (
  themeName,
  wallpaperPath,
  isNewTheme,
  isLightMode,
  oldName,
) => {
  // Create Wallust temp dir in case it's not there
  Utils.exec(`mkdir '${wallustDir}/temp'`);
  // Remove all files in Temp dir

  Utils.exec(`rm '${wallustDir}/temp/*'`);
  if (isNewTheme) {
    // Create theme dir
    Utils.exec(`mkdir '${themeDir}/${themeName}'`);
    placeWallpaper(themeName, wallpaperPath);
  } else {
    renameTheme(oldName, themeName);
    changeThemeWallpaper(themeName, wallpaperPath);
  }
  createColorScheme(themeName);

  // Refresh theme
  changeTheme(themeName, isLightMode);
};

export const addThemeToArray = (currThemes, newThemeName) => {
  const newArray = [
    ...currThemes.filter((theme) => theme !== newThemeDropdownText),
    newThemeName,
  ];
  newArray.sort(sorter);
  newArray.push(newThemeDropdownText);
  return newArray;
};

export const renameThemeInArray = (currThemes, newThemeName, oldThemeName) => {
  const newArray = [
    ...currThemes.filter(
      (theme) => theme !== newThemeDropdownText && theme !== oldThemeName,
    ),
    newThemeName,
  ];
  newArray.sort(sorter);
  newArray.push(newThemeDropdownText);
  return newArray;
};

// Sorts alphabetically while being case insensitive
const sorter = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());

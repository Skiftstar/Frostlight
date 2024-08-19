import {setConfigValue} from "./../../WidgetUtil.js"

export const themeDir = `${App.configDir}/style/themes`
export const wallustDir = `${App.configDir}/style/wallust`
export const newThemeDropdownText = "Create new..."
export const newThemeDirName = "new"

export const readThemes = () => {
	let dirs = Utils.exec(`ls '${themeDir}'`).split("\n")
	dirs = dirs.filter((dir) => !dir.includes("."))
	dirs = dirs.filter(dir => dir !== newThemeDirName)
	dirs.sort(sorter)
	dirs.push(newThemeDropdownText)

	return dirs
}

export const toggleLightMode = (activeTheme, isActive) => {
	setConfigValue("customization.lightMode", isActive)
	Utils.exec(
		`cp '${themeDir}/${activeTheme}/theme_${isActive ? "light" : "dark"}.css' '${App.configDir}/style/colors.css'`
	)
}

export const changeTheme = (newThemeName) => {
	if (newThemeName === newThemeDropdownText) return
	Utils.exec(`swww img '${themeDir}/${newThemeName}/wallpaper_dark.png'`)
	Utils.exec(
		`cp '${themeDir}/${newThemeName}/theme_dark.css' '${App.configDir}/style/colors.css'`
	)
	setConfigValue("customization.theme", newThemeName)
}

export const renameTheme = (oldName, newName) => {
	Utils.exec(`mv '${themeDir}/${oldName}' '${themeDir}/${newName}'`)
}

export const changeThemeWallpaper = (themeName, wallpaperPath) => {
	Utils.exec(`rm '${themeDir}/${themeName}/wallpaper.png'`)
	Utils.exec(`rm '${themeDir}/${themeName}/wallpaper_dark.png'`)
	placeWallpaper(themeName, wallpaperPath)
}

export const deleteTheme = (themeName) => {
	Utils.exec(`rm -rf '${themeDir}/${themeName}'`)
}

export const createColorScheme = (themeName) => {
	const wallustCommand = `wallust run '${themeDir}/${themeName}/wallpaper.png' -k -s -C '${wallustDir}/{config}'`
	const configs = ["wallust_dark.toml", "wallust_light.toml"]

	for (const config of configs) {
		Utils.exec(wallustCommand.replace("{config}", config))
	}
	const filesInTemp = Utils.exec(`ls '${wallustDir}/temp'`).split("\n")
	for (const file of filesInTemp) {
		Utils.exec(`mv '${wallustDir}/temp/${file}' '${themeDir}/${themeName}/${file}'`)
	}
	//Utils.exec(`mv ${wallustDir}/temp/* ${themeDir}/${themeName}`)
}

export const handleNewWallpaper = (wallpaperPath) => {
	placeWallpaper(newThemeDirName, wallpaperPath)
	createColorScheme()
}

export const placeWallpaper = (themeName, wallpaperPath) => {
	const workingDir = `'${themeDir}/${themeName}'`
	console.log("workDir", workingDir, "wallpaper", wallpaperPath)
	Utils.exec(`cp ${wallpaperPath} ${workingDir}/wallpaper.png`)
	Utils.exec(
		`magick ${workingDir}/wallpaper.png -brightness-contrast -40x0 ${workingDir}/wallpaper_dark.png`
	)
}

export const saveTheme = (themeName, wallpaperPath, isNewTheme, oldName) => {
	// Create Wallust temp dir in case it's not there
	Utils.exec(`mkdir '${wallustDir}/temp'`)
	// Remove all files in Temp dir

	Utils.exec(`rm '${wallustDir}/temp/*'`)
	if (isNewTheme) {
		// Create theme dir
		Utils.exec(`mkdir '${themeDir}/${themeName}'`)
		placeWallpaper(themeName, wallpaperPath)
	} else {
		renameTheme(oldName, themeName)
		changeThemeWallpaper(themeName, wallpaperPath)
	}
	createColorScheme(themeName)

	// Refresh theme
	changeTheme(themeName)
}

export const addThemeToArray = (currThemes, newThemeName) => {
	const newArray = [...currThemes.filter(theme => theme !== newThemeDropdownText), newThemeName]
	newArray.sort(sorter)
	newArray.push(newThemeDropdownText)
	return newArray
}

export const renameThemeInArray = (currThemes, newThemeName, oldThemeName) => {
	const newArray = [...currThemes.filter(theme => theme !== newThemeDropdownText && theme !== oldThemeName), newThemeName]
	newArray.sort(sorter)
	newArray.push(newThemeDropdownText)
	return newArray
}

// Sorts alphabetically while being case insensitive
const sorter = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase())

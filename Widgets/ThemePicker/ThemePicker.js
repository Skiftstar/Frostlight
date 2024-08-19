import { getConfigValue, setConfigValue } from "../../WidgetUtil.js"
import Dropdown from "../../Components/Dropdown.js"
import Widget from "resource:///com/github/Aylur/ags/widget.js"
import { addThemeToArray, changeTheme, deleteTheme, newThemeDropdownText, readThemes, renameThemeInArray, saveTheme, themeDir, toggleLightMode } from "./ThemeUtil.js"

let themes = Variable(readThemes())
let selectedTheme = Variable(getConfigValue("customization.theme") || undefined)

if (!themes.value.includes(selectedTheme.value)) {
	selectedTheme.value = themes.value[0]
	changeTheme(selectedTheme.value)
}

let isLightMode = getConfigValue("customization.lightMode") || false
let selectedWallpaper = selectedTheme ? `${themeDir}/${selectedTheme.value}/wallpaper.png` : undefined

const errorText = Widget.Label({
	label: "",
	visible: false
})

const themeNameInput = Widget.Entry({
	placeholderText: "Theme Name",
	text: selectedTheme.value,
	onChange: (self => {
		self.text = self.text.replaceAll(/['"`\/]/g, "")
	})
})

const toggleLightModeButton = Widget.ToggleButton({
	active: isLightMode,
	label: "LightMode Toggle",
	onToggled: ({ active }) => {
		toggleLightMode(selectedTheme.value, active)
		isLightMode = active
	},
})

const selectWallaperButton = Widget.FileChooserButton({
	onFileSet: ({ uri }) => {
		selectedWallpaper = uri.split("file://")[1]
	},
})

selectWallaperButton.set_uri(selectedWallpaper ? `file://${selectedWallpaper}` : '')

const saveThemeButton = Widget.Button({
	onClicked: () => {
		errorText.visible = false
		if (!selectedWallpaper) {
			errorText.label = "No Wallpaper Selected!"
			errorText.visible = true
			return
		}
		if (themeNameInput.text === "new" || themeNameInput.text === "Create new...") {
			errorText.label = "Name cannot be used!"
			errorText.visible = true
			return
		}
		if (themeNameInput.text.length === 0) {
			errorText.label = "Must enter a name!"
			errorText.visible = true
			return
		}
		if (themes.value.includes(themeNameInput.text) && selectedTheme.value !== themeNameInput.text) {
			errorText.label = "Name already exists!"
			errorText.visible = true
			return
		}
		const isNewTheme = selectedTheme.value === newThemeDropdownText
		const oldName = isNewTheme ? undefined : selectedTheme.value
		saveTheme(themeNameInput.text, selectedWallpaper, isNewTheme, oldName)
		if (isNewTheme) {
			themes.value = addThemeToArray(themes.value, themeNameInput.text)
		} else {
			themes.value = renameThemeInArray(themes.value, themeNameInput.text, oldName)
		}
		selectedTheme.value = themeNameInput.text
	},
	label: "Save",
})

const deleteThemeButton = Widget.Button({
	label: "Delete",
	onClicked: () => {
		errorText.visible = false
		if (themes.value.length === 1) {
			errorText.label = "Can't delete last theme!"
			errorText.visible = true
			return
		}
		deleteTheme(selectedTheme.value)
		themes.value = themes.value.filter(theme => theme !== selectedTheme.value)
		selectedTheme.value = themes.value[0]
		themeNameInput.text = themes.value[0]
		changeTheme(themes.value[0])
	}
})

const updateDropdown = Dropdown(
	themes,
	selectedTheme,
	({ item, index }) => {
		const newTheme = themes.value[index]
		if (newTheme === newThemeDropdownText) {
			themeNameInput.text = ""
			selectWallaperButton.set_uri('')
		} else {
			changeTheme(newTheme)
			selectWallaperButton.set_uri(`file://${themeDir}/${newTheme}/wallpaper.png`)
			themeNameInput.text = newTheme
		}
	},
	undefined
)

const ThemePicker = () =>
	Widget.Box({
		hexpand: true,
		vexpand: false,
		vertical: true,
		className:"themepicker-wrapper",
		children: [
			updateDropdown,
			toggleLightModeButton,
			themeNameInput,
			selectWallaperButton,
			saveThemeButton,
			deleteThemeButton,
			errorText
		],
	})

export default ThemePicker

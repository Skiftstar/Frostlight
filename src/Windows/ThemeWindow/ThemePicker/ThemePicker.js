import {getNonEditConfigValue} from "../../../Util/Config/ConfigUtil.js"
import Dropdown from "../../../Components/Dropdown.js"
import Widget from "resource:///com/github/Aylur/ags/widget.js"
import {
	addThemeToArray,
	changeTheme,
	deleteTheme,
	newThemeDropdownText,
	readThemes,
	renameThemeInArray,
	saveTheme,
	themeDir,
	toggleLightMode,
} from "./ThemeUtil.js"

let themes = Variable(readThemes())
let selectedTheme = Variable(
	getNonEditConfigValue("customization.theme") || undefined
)
let activeTheme = Variable(selectedTheme.value)
let isLightMode = getNonEditConfigValue("customization.lightMode") || false

if (!themes.value.includes(selectedTheme.value)) {
	selectedTheme.value = themes.value[0]
	changeTheme(selectedTheme.value, isLightMode)
}

let selectedWallpaper = selectedTheme
	? `${themeDir}/${selectedTheme.value}/wallpaper.png`
	: undefined

const errorText = Widget.Label({
	label: "",
	visible: false,
})

const iconWidget = Widget.Box({
	hpack: "start",
	expand: false,
	children: [
		Widget.Icon({
			icon: "document-edit-symbolic",
			className: "themepicker-input-icon",
		}),
		Widget.Separator({className: "themepicker-input-icon-separator"}),
	],
})

const themeNameInput = Widget.Entry({
	placeholderText: "Theme Name",
	className: "themepicker-input",
	hexpand: true,
	text: selectedTheme.value,
	onChange: (self) => {
		self.text = self.text.replaceAll(/['"`\/]/g, "")
	},
})

const themeNameInputWrapper = Widget.Box({
	hexpand: true,
	className: "themepicker-input-wrapper",
	children: [iconWidget, themeNameInput],
})

const toggleLightModeButton = Widget.ToggleButton({
	active: isLightMode,
	className: `themepicker-toggle-button ${isLightMode ? "toggle-active" : ""}`,
	label: "LightMode Toggle",
	onToggled: (self) => {
		toggleLightMode(activeTheme.value, self.active)
		isLightMode = self.active
		self.toggleClassName("toggle-active", self.active)
	},
})

const wallpaperDisplay = Widget.Box({
	className: "themepicker-wallpaper-display",
	expand: true,
	css: `background-image: url("${selectedWallpaper}");`,
})

const selectWallaperButton = Widget.FileChooserButton({
	className: "themepicker-wallpaper-button",
	onFileSet: ({uri}) => {
		selectedWallpaper = uri.split("file://")[1]

		wallpaperDisplay.css = `background-image: url("${selectedWallpaper}");`
	},
})

selectWallaperButton.set_uri(
	selectedWallpaper ? `file://${selectedWallpaper}` : ""
)

const saveThemeButton = Widget.Button({
	className: "themepicker-button",
	hexpand: true,
	onClicked: () => {
		errorText.visible = false
		if (!selectedWallpaper) {
			errorText.label = "No Wallpaper Selected!"
			errorText.visible = true
			return
		}
		if (
			themeNameInput.text === "new" ||
			themeNameInput.text === "Create new..."
		) {
			errorText.label = "Name cannot be used!"
			errorText.visible = true
			return
		}
		if (themeNameInput.text.length === 0) {
			errorText.label = "Must enter a name!"
			errorText.visible = true
			return
		}
		if (
			themes.value.includes(themeNameInput.text) &&
			selectedTheme.value !== themeNameInput.text
		) {
			errorText.label = "Name already exists!"
			errorText.visible = true
			return
		}
		const isNewTheme = selectedTheme.value === newThemeDropdownText
		const oldName = isNewTheme ? undefined : selectedTheme.value
		saveTheme(
			themeNameInput.text,
			selectedWallpaper,
			isNewTheme,
			isLightMode,
			oldName
		)
		if (isNewTheme) {
			themes.value = addThemeToArray(themes.value, themeNameInput.text)
		} else {
			themes.value = renameThemeInArray(
				themes.value,
				themeNameInput.text,
				oldName
			)
		}
		selectedTheme.value = themeNameInput.text
		activeTheme.value = themeNameInput.text
	},
	label: "Save",
})

const deleteThemeButton = Widget.Button({
	label: "Delete",
	className: "themepicker-button themepicker-delete-button",
	hexpand: true,
	onClicked: () => {
		errorText.visible = false
		if (themes.value.length === 1) {
			errorText.label = "Can't delete last theme!"
			errorText.visible = true
			return
		}
		deleteTheme(selectedTheme.value)
		themes.value = themes.value.filter((theme) => theme !== selectedTheme.value)
		changeTheme(themes.value[0], isLightMode)
		selectedTheme.value = themes.value[0]
		themeNameInput.text = themes.value[0]
		activeTheme.value = themes.value[0]
	},
})

const themeDropdown = Dropdown(
	themes,
	selectedTheme,
	({item, index}) => {
		const newTheme = themes.value[index]
		if (newTheme === newThemeDropdownText) {
			themeNameInput.text = ""
			selectWallaperButton.set_uri("")
			selectedWallpaper = ""
		} else {
			changeTheme(newTheme, isLightMode)
			selectWallaperButton.set_uri(
				`file://${themeDir}/${newTheme}/wallpaper.png`
			)
			selectedWallpaper = `${themeDir}/${newTheme}/wallpaper.png`
			themeNameInput.text = newTheme
			activeTheme.value = newTheme
			wallpaperDisplay.css = `background-image: url("${selectedWallpaper}");`
		}
	},
	"open-menu"
)

const ThemePicker = () => {
	const masterFlowBox = Widget.FlowBox({
		rowSpacing: 10,
		maxChildrenPerLine: 1,
		expand: true,
		orientation: 0,
		setup: (masterFlowBox) => {
			masterFlowBox.add(themeDropdown)
			masterFlowBox.add(toggleLightModeButton)
			masterFlowBox.add(themeNameInputWrapper)
			masterFlowBox.add(selectWallaperButton)
			masterFlowBox.add(wallpaperDisplay)
		},
	})

	return Widget.Box({
		hexpand: true,
		vexpand: false,
		vertical: true,
		className: "themepicker-wrapper",
		children: [
			Widget.FlowBox({
				orientation: 0,
				maxChildrenPerLine: 1,
				rowSpacing: 20,
				setup: (self) => {
					self.add(masterFlowBox)
					self.add(
						Widget.FlowBox({
							// Set maxChildren to amount of children so that
							// space is allocated fully between those two
							maxChildrenPerLine: 2,
							columnSpacing: 5,
							setup: (self) => {
								self.add(deleteThemeButton)
								self.add(saveThemeButton)
							},
						})
					)
					self.add(errorText)
				},
			}),
		],
	})
}

export default ThemePicker

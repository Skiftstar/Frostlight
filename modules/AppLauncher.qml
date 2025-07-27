import Quickshell
import QtQuick
import Quickshell.Hyprland
import Quickshell.Widgets
import QtQuick.Controls
import "root:/constants"
import "root:/services"
import "./AppLauncher"

Loader {
	id: applist
	active: false
	anchors.fill: parent

	sourceComponent: PanelWindow {
		id: applistpanelwindow
		width: 400
		height: 400
		focusable: true
		color: "transparent"

		WrapperRectangle {
			anchors.fill: parent
			radius: Appearance.rounding.small
			color: Appearance.colors.background
			
			border {
				color: Appearance.colors.highlight
				width: 2
			}


			Column {
				id: applistColumn
				anchors.fill: applist

				SearchField {
					id: search

					Keys.onEscapePressed: {applist.active = false}
					Keys.onUpPressed: applistRoot.decrementCurrentIndex()
					Keys.onDownPressed: applistRoot.incrementCurrentIndex()

					onAccepted: {
						const currentItem = applistRoot.currentItem
						if (currentItem) {
							Apps.launch(currentItem.modelData)
							applist.active = false
						}
					}
				}	

				AppList {
					search: search
				}
			}
		}
	}


	GlobalShortcut {
		name: "barToggle"
		description: qsTr("Toggles Bar")

		onPressed: {
			applist.active = !applist.active;
		}
	}
}

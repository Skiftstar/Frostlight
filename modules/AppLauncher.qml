import Quickshell
import QtQuick
import Quickshell.Hyprland
import Quickshell.Widgets
import QtQuick.Controls
import "root:/constants"
import "root:/services"

Loader {
	id: applist
	active: false
	anchors.fill: parent

	sourceComponent: PanelWindow {
		width: 200
		focusable: true

		Column {

			spacing: 50
			anchors.fill: parent

			TextField {
				id: search
				focus: true
				height: 40
				anchors.left: parent.left
				anchors.right: parent.right

				placeholderText: "abc"
			}

			ListView {
				id: applistRoot
				anchors.top: search.bottom
				anchors.left: parent.left
				anchors.right: parent.right

				height: 400
				width: 1000

				ScrollBar.vertical: ScrollBar {
					visible: true
					active: true
				}

				function getModelValues() {
					return Apps.fuzzyQuery("dis")
				}

				model: ScriptModel {
						values: applistRoot.getModelValues()
						onValuesChanged: {
							console.log("Values", JSON.stringify(values))
						}
				}

				delegate: Item {
					id: appitemRoot
					required property var modelData

					anchors.left: parent?.left
					anchors.right: parent?.right

					implicitHeight: 40

					Component.onCompleted: {
							console.log("Rendering:", modelData.name, "with icon", modelData.icon)
					}

					MouseArea {
							id: mouseAreaRoot
							anchors.fill: parent
							cursorShape: Qt.PointingHandCursor
							hoverEnabled: true

							onClicked: {
								Apps.launch(appitemRoot.modelData)
								applist.active = false

							}

							Rectangle {
								anchors.fill: parent
								color: mouseAreaRoot.containsMouse ? "#11FF0000" : "transparent"
							}
					}

					Item {
						anchors.fill: parent
						anchors.leftMargin: 12
						anchors.rightMargin: 12
						anchors.margins: 10

						IconImage {
							id: icon

							source: Quickshell.iconPath(appitemRoot.modelData?.icon, "image-missing")
							implicitSize: parent.height * 0.8

							anchors.verticalCenter: parent.verticalCenter
						}

						Item {
							anchors.left: icon.right
							anchors.leftMargin: 10
							anchors.verticalCenter: icon.verticalCenter

							implicitWidth: parent.width - icon.width
							implicitHeight: name.implicitHeight + comment.implicitHeight

							Text {
								id: name
								text: appitemRoot.modelData?.name ?? ""
							}

							Text {
								id: comment
								text: (appitemRoot.modelData.comment || appitemRoot.modelData?.genericName || appitemRoot.modelData?.name) ?? ""
							}
						}
					}
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

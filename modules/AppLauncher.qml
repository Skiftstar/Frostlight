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
		id: applistpanelwindow
		width: 300
		height: 400
		focusable: true
		color: "transparent"

		WrapperRectangle {
			// color: "transparent"
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

			TextField {
				id: search
				focus: true
				height: 40
				font.pointSize: Appearance.font.sizes.small
				anchors.left: parent.left
				anchors.right: parent.right
				color: Appearance.colors.text
				background: Appearance.colors.background
				placeholderTextColor: Appearance.colors.text

				placeholderText: "Search..."

				Keys.onEscapePressed: applist.active = false
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

			ListView {
				id: applistRoot
				anchors.top: search.bottom
				anchors.left: parent.left
				anchors.right: parent.right

				highlight: Rectangle {
					color: Appearance.colors.highlight
				}

				height: applistpanelwindow.height - search.height - applistColumn.spacing
				width: 1000
				clip: applistRoot.implicitHeight - search.height 

				ScrollBar.vertical: ScrollBar {
					visible: true
					active: true
				}

				function getModelValues() {
					return Apps.fuzzyQuery(search.text)
				}

				model: ScriptModel {
						values: applistRoot.getModelValues()
						onValuesChanged: {
							console.log("Values", JSON.stringify(values))
							applistRoot.currentIndex = 0
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
								color: Appearance.colors.text
								text: appitemRoot.modelData?.name ?? ""
								font.pointSize: Appearance.font.sizes.small
							}

							Text {
								id: comment
								color: Appearance.colors.text
								anchors.top: name.bottom
								text: (appitemRoot.modelData.comment || appitemRoot.modelData?.genericName || appitemRoot.modelData?.name) ?? ""
								font.pointSize: Appearance.font.sizes.small
							}
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

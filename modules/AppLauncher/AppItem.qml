import "root:/constants"
import "root:/services"
import QtQuick
import Quickshell.Widgets
import Quickshell

Item {
	id: appitemRoot
	required property var modelData
	required property var applistRef

	anchors.left: parent?.left
	anchors.right: parent?.right

	implicitHeight: 40

	Rectangle {
		id: itemTopBorder
		height: 1
		width: parent.width
		anchors.left: parent?.left
		anchors.right: parent?.right

		color: Appearance.colors.highlightInactive
	}

	MouseArea {
			id: mouseAreaRoot
			anchors.fill: parent
			cursorShape: Qt.PointingHandCursor
			hoverEnabled: true

			onClicked: {
				Apps.launch(appitemRoot.modelData)
				applistRef.active = false

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

			source: appitemRoot.modelData?.icon ? Quickshell.iconPath(appitemRoot.modelData?.icon) : ""
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
				anchors.top: itemTopBorder.bottom
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

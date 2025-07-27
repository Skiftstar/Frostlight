import Quickshell
import QtQuick
import QtQuick.Controls
import "root:/constants"
import "root:/services"


ListView {
  required property TextField search

	id: applistRoot
	anchors.top: search.bottom
	anchors.left: parent.left
	anchors.right: parent.right

	highlight: Rectangle {
		color: Appearance.colors.highlightInactive
	}

	height: applistpanelwindow.height - search.height - applistColumn.spacing
	width: 1000
	clip: applistRoot.implicitHeight - search.height 
	maximumFlickVelocity: 10000

	ScrollBar.vertical: ScrollBar {
		visible: false
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

	delegate: AppItem {}
}

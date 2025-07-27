import Quickshell
import QtQuick
import QtQuick.Controls
import "root:/constants"
import "root:/services"


ListView {
  required property TextField search
	required property var applistRef

	id: root
	anchors.top: search.bottom
	anchors.left: parent.left
	anchors.right: parent.right

	highlight: Rectangle {
		color: Appearance.colors.highlightInactive
	}

	height: applistpanelwindow.height - search.height - applistColumn.spacing
	width: 1000
	clip: root.implicitHeight - search.height 
	maximumFlickVelocity: 10000

	ScrollBar.vertical: ScrollBar {
		visible: false
		active: true
	}

	function getModelValues() {
		return Apps.fuzzyQuery(search.text)
	}

	model: ScriptModel {
			values: root.getModelValues()
			onValuesChanged: {
				root.currentIndex = 0
			}
	}

	delegate: AppItem {
		applistRef: this.applistRef
	}
}

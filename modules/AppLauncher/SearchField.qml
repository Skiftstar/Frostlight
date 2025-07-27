pragma ComponentBehavior: Bound

import "root:/constants"
import QtQuick
import QtQuick.Controls
import "root:/services"

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
}

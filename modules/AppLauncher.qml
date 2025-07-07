import Quickshell
import QtQuick

PanelWindow {

  implicitWidth: child.implicitWidth
  implicitHeight: child.implicitHeight
	Rectangle {
    id: child

    // "Fill" the space occupied by the parent, setting width
    anchors.fill: parent
    // Add a margin to all anchored sides.
    anchors.margins: 10

    implicitWidth: 100
    implicitHeight: 100
	}
}

import QtQuick

Item {
  property real margin: 5

  implicitWidth: child.implicitWidth + margin * 2
  implicitHeight: child.implicitHeight + margin * 2

  Rectangle {
    id: child

    // "Fill" the space occupied by the parent, setting width
    anchors.fill: parent
    // Add a margin to all anchored sides.
    anchors.margins: parent.margin

    implicitWidth: 50
    implicitHeight: 50
  }
}

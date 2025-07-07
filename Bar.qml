import Quickshell
import Quickshell.Hyprland
import QtQuick

Scope {
  // the Time type we just created
  // Time { id: timeSource }

	Loader {
		id: barLoader
		active: false
		sourceComponent: Variants {
			model: Quickshell.screens

			PanelWindow {
				property var modelData
				screen: modelData
				color: "#A0FFFF00" 

				anchors {
					top: true
					left: true
					right: true
				}

				implicitHeight: 30

				ClockWidget {
					anchors.centerIn: parent
					// now using the time from timeSource
					// time: timeSource.time
				}

			}
		}
	}

	GlobalShortcut {
		name: "barToggle"
		description: qsTr("Toggles Bar")

		onPressed: {
			barLoader.active = !barLoader.active;
		}
	}
}

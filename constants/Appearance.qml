import Quickshell
import QtQuick

pragma Singleton

Singleton {

    property QtObject colors
		property QtObject rounding
		property QtObject font

		colors: QtObject {
			property color background: "#A0091326"
			property color highlight: "#9064BDD5"
			property color text: "#A9D6E2"
		}

		rounding: QtObject {
			property int small: 12
			property int normal: 17
			property int large: 25
			property int full: 1000
		}

		font: QtObject {
			property QtObject sizes

			sizes: QtObject {
				property int small: 11
			}
		}
}

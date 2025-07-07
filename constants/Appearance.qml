import Quickshell
import QtQuick

pragma Singleton

Singleton {

    property QtObject colors
		property QtObject rounding

		colors: QtObject {
			property color background: "#A0FFFF00"
		}

		rounding: QtObject {
			property int small: 12
			property int normal: 17
			property int large: 25
			property int full: 1000
		}
}

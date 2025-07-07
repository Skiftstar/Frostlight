pragma Singleton

import Quickshell
import QtQuick

Singleton {
  id: root
  // an expression can be broken across multiple lines using {}
  readonly property string time: {
    // The passed format string matches the default output of
    // the `date` command.
    qsTr("lol") + Qt.formatDateTime(clock.date, "ddd MMM d hh:mm:ss AP t")
  }

  SystemClock {
    id: clock
    precision: SystemClock.Seconds
  }
}

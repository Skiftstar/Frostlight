#!/usr/bin/python

import os
import json
import re
import sys
import gi

gi.require_version("Gtk", "3.0")
from gi.repository import Gtk

desktop_dirs = [
    "/usr/share/applications",
    os.path.expanduser("~/.local/share/applications")
]

# grab query from CLI args (lowercase for matching)
query = sys.argv[1].lower() if len(sys.argv) > 1 else None

def get_gtk_icon(icon_name):
    theme = Gtk.IconTheme.get_default()
    icon_info = theme.lookup_icon(icon_name, 128, 0)
    if icon_info is not None:
        return icon_info.get_filename()
    return None

apps = []

for base_dir in desktop_dirs:
    for root, dirs, files in os.walk(base_dir):
        for filename in files:
            if not filename.endswith(".desktop"):
                continue

            file_path = os.path.join(root, filename)

            name, exec_cmd, icon = None, None, None

            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                for line in f:
                    if line.startswith("Name=") and name is None:
                        name = line.strip().split("=", 1)[1]
                    elif line.startswith("Exec=") and exec_cmd is None:
                        exec_cmd = re.sub(r'%.', '', line.strip().split("=", 1)[1])
                    elif line.startswith("Icon=") and icon is None:
                        icon = line.strip().split("=", 1)[1]

            # Skip entries missing a name or exec
            if not name or not exec_cmd:
                continue

            # if a query is given, skip apps that don't match
            if query and query not in name.lower():
                continue

            # resolve icon
            if icon and not icon.startswith("/"):
                icon = get_gtk_icon(icon) or icon

            apps.append({
                "name": name,
                "exec": exec_cmd,
                "icon": icon if icon else ""
            })

apps.sort(key=lambda x: x["name"].lower())

# Output JSON array
print(json.dumps(apps, ensure_ascii=False, indent=2))

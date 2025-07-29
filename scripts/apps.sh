#!/bin/bash

echo "["

first=1
find /usr/share/applications ~/.local/share/applications -name '*.desktop' -print0 | \
while IFS= read -r -d '' file; do
  name=$(grep -m1 "^Name=" "$file" | cut -d'=' -f2-)
  exec=$(grep -m1 "^Exec=" "$file" | cut -d'=' -f2- | sed 's/%.//g')
  icon=$(grep -m1 "^Icon=" "$file" | cut -d'=' -f2-)

  # if name or exec is empty, skip
  [[ -z "$name" || -z "$exec" ]] && continue

  if [ $first -eq 0 ]; then
    echo ","
  fi
  first=0

  printf '{"name": "%s", "exec": "%s", "icon": "%s"}' \
      "$(echo "$name" | sed 's/"/\\"/g')" \
      "$(echo "$exec" | sed 's/"/\\"/g')" \
      "$(echo "$icon" | sed 's/"/\\"/g')"

done

echo "]"

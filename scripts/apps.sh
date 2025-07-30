#!/bin/bash

query="$1"
query_lc=$(echo "$query" | tr '[:upper:]' '[:lower:]')

results=$(mktemp)

# hard‑coded icon directory
icon_dir="/usr/share/icons/breeze-dark/apps/48"

resolve_icon() {
  icon_name="$1"
  # if already an absolute path and exists
  if [[ "$icon_name" == /* && -f "$icon_name" ]]; then
    echo "$icon_name"
    return
  fi

  # look for png or svg in the breeze-dark dir
  for ext in png svg; do
    if [[ -f "$icon_dir/${icon_name}.${ext}" ]]; then
      echo "$icon_dir/${icon_name}.${ext}"
      return
    fi
  done

  # fallback (so JSON isn’t empty)
  echo "$icon_name"
}

find /usr/share/applications ~/.local/share/applications -name '*.desktop' -print0 | \
while IFS= read -r -d '' file; do
  name=$(grep -m1 "^Name=" "$file" | cut -d'=' -f2-)
  exec=$(grep -m1 "^Exec=" "$file" | cut -d'=' -f2- | sed 's/%.//g')
  icon=$(grep -m1 "^Icon=" "$file" | cut -d'=' -f2-)

  [[ -z "$name" || -z "$exec" ]] && continue

  name_lc=$(echo "$name" | tr '[:upper:]' '[:lower:]')

  if [[ -z "$query_lc" || "$name_lc" == *"$query_lc"* ]]; then
    score=3
    [[ "$name_lc" == "$query_lc" ]] && score=1
    [[ "$name_lc" == "$query_lc "* || "$name_lc" == "$query_lc" ]] && score=2

    resolved_icon=$(resolve_icon "$icon")

    printf '%s\t%s\t%s\t%s\n' "$score" "$name" "$exec" "$resolved_icon" >> "$results"
  fi
done

echo "["
first=1
sort -k1,1n -k2,2f "$results" | while IFS=$'\t' read -r score name exec icon; do
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

rm "$results"

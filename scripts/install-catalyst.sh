
#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   bash scripts/install-catalyst.sh [zip-or-folder]
# If argument is a .zip, it will be unzipped.
# If argument is a folder, it will be copied.
# If no argument is provided, it tries to detect:
#   ./catalyst-ui-kit.zip or a folder starting with catalyst (case-insensitive).

ARG="${1:-}"
DEST="src/catalyst"
APP_CSS="app/(public)/globals.css"
CAT_CSS_OUT="app/(public)/catalyst.css"

detect_source() {
  if [[ -n "$ARG" ]]; then
    echo "$ARG"
    return 0
  fi
  if [[ -f "./catalyst-ui-kit.zip" ]]; then
    echo "./catalyst-ui-kit.zip"
    return 0
  fi
  # find a likely folder name at root
  FOUND="$(ls -1d ./catalyst* ./Catalyst* 2>/dev/null | head -n1 || true)"
  if [[ -n "$FOUND" ]]; then
    echo "$FOUND"
    return 0
  fi
  echo ""
  return 1
}

SRC="$(detect_source || true)"
if [[ -z "$SRC" ]]; then
  echo "ℹ️  Catalyst source not found (zip or folder). Skipping."
  exit 0
fi

echo "📦 Installing Catalyst from: $SRC"
mkdir -p "$DEST"

if [[ -f "$SRC" && "$SRC" == *.zip ]]; then
  unzip -o "$SRC" -d "$DEST" >/dev/null || true
  # Clean zip from root to keep tidy
  rm -f "$SRC" || true
elif [[ -d "$SRC" ]]; then
  # copy the folder contents into DEST, preserving structure
  rsync -a --delete "$SRC"/ "$DEST"/ 2>/dev/null || cp -a "$SRC"/. "$DEST"/
else
  echo "⚠️  Unsupported source: $SRC"
  exit 1
fi

# Wire CSS if any
CSS_COUNT=$(find "$DEST" -type f -name "*.css" | wc -l | tr -d ' ')
if [[ "$CSS_COUNT" != "0" ]]; then
  echo "🎨 Wiring Catalyst CSS -> $CAT_CSS_OUT (concat) and importing from globals.css"
  mkdir -p "$(dirname "$CAT_CSS_OUT")"
  # Concatenate all css
  > "$CAT_CSS_OUT"
  while IFS= read -r -d '' f; do
    echo "/* === $f === */" >> "$CAT_CSS_OUT"
    cat "$f" >> "$CAT_CSS_OUT"
    echo -e "\n" >> "$CAT_CSS_OUT"
  done < <(find "$DEST" -type f -name "*.css" -print0)

  # Ensure import exists
  if ! grep -q 'catalyst.css' "$APP_CSS"; then
    awk '1; /@import "tailwindcss";/ && !x {print "\n@import \"./catalyst.css\";"; x=1}' "$APP_CSS" > "$APP_CSS.tmp" && mv "$APP_CSS.tmp" "$APP_CSS"
  fi
else
  echo "ℹ️  No CSS files found in Catalyst source. CSS wiring skipped."
fi

# Ensure headless UI (typical dependency)
pnpm add @headlessui/react >/dev/null

echo "✅ Catalyst installed into $DEST"

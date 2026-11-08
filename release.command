#!/usr/bin/env bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd -P)"
"$SCRIPT_DIR/release.sh" "$@"
EXIT_CODE=$?
echo ""
if [[ -t 0 ]]; then
    read -r -p "Eingabetaste druecken, um das Fenster zu schliessen..." _
fi
exit $EXIT_CODE

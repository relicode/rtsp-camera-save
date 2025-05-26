#!/bin/sh

URL="$1"

OUTPUT="${2:-/recordings}"

./save-rtsp.sh "$1" "$OUTPUT"

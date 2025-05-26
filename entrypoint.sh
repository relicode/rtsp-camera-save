#!/bin/sh

set -x

URL="$1"

OUTPUT="${2:-/recordings}"

echo "$URL" "$OUTPUT"

./save-rtsp.sh "$1" "$OUTPUT"

#!/bin/sh

URL="$1"
OUTPUT_DIR="$(readlink -f "$2")"

for i in "$1" "$2"; do
  if [ -z "$i" ]; then
    echo "Usage: $0 <url> <output-dir>"
    echo "Example: $0 rtsp://user:pass@192.168.10.89:554/live/ch0 /tmp/saved"
    exit 1
  fi
done

ffmpeg \
  -hide_banner \
  -loglevel error \
  -y \
  -rtsp_transport tcp \
  -use_wallclock_as_timestamps 1 \
  -i "$URL" \
  -c copy \
  -f segment \
  -reset_timestamps 1 \
  -segment_time 300 `# Time in seconds` \
  -segment_format mkv \
  -segment_atclocktime 1 \
  -strftime 1 \
  "$OUTPUT_DIR/%Y%m%dT%H%M%S.mp4"

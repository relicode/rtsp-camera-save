#!/bin/sh

if [ "$(ps | grep ffmpeg | wc -l)" == 2 ]; then
  exit 0
else
  exit 1
fi

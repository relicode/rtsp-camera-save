# rtsp-camera-save

## CLI
```sh
# Usage
./save-rtsp.sh <url> <output-dir>

# Example
./save-rtsp.sh rtsp://user:pass@192.168.10.89:554/live/ch0 /tmp/saved
```

## Docker compose
1. Change values in `compose.yaml` and/or `compose-base.yaml` accordingly. Make sure the `recordings` dir has appropriate permission related to the user
2. `COMPOSE_BAKE=true docker compose up # COMPOSE_BAKE=true is optional`


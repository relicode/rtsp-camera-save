FROM alpine:3.21.3

RUN apk add -U ffmpeg tzdata

COPY *.sh /

ENTRYPOINT ["/entrypoint.sh"]

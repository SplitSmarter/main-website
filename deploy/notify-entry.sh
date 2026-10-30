#!/bin/sh
set -eu

mkdir -p /var/lib/splitsmarter/notify
/usr/sbin/httpd -p 127.0.0.1:8099 -h /opt/notify-www
exec /docker-entrypoint.sh "$@"

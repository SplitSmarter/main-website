#!/bin/sh
set -eu

DIR=${NOTIFY_DIR:-/var/lib/splitsmarter/notify}
FILE=$DIR/contacts.jsonl
LOCK=$DIR/.lock

respond() {
  body=$2
  printf 'Status: %s\r\nContent-Type: application/json\r\nContent-Length: %s\r\n\r\n%s' \
    "$1" "${#body}" "$body"
}

if [ "${REQUEST_METHOD:-}" != "POST" ]; then
  respond "405 Method Not Allowed" '{"detail":"Method not allowed."}'
  exit 0
fi

len=${CONTENT_LENGTH:-0}
case "$len" in
  ''|*[!0-9]*) len=0 ;;
esac
if [ "$len" -eq 0 ] || [ "$len" -gt 512 ]; then
  respond "400 Bad Request" '{"detail":"Enter an email or phone number."}'
  exit 0
fi

raw=$(dd bs="$len" count=1 2>/dev/null || true)
contact=$(printf '%s' "$raw" | sed -n 's/.*"contact"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p')
contact=$(printf '%s' "$contact" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
if [ -z "$contact" ]; then
  respond "400 Bad Request" '{"detail":"Enter an email or phone number."}'
  exit 0
fi

if printf '%s' "$contact" | grep -q '@'; then
  contact=$(printf '%s' "$contact" | tr '[:upper:]' '[:lower:]')
  if [ "${#contact}" -gt 254 ] || ! printf '%s' "$contact" | grep -Eq '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'; then
    respond "400 Bad Request" '{"detail":"Enter an email or phone number."}'
    exit 0
  fi
  kind=email
else
  compact=$(printf '%s' "$contact" | tr -d ' ().-')
  case "$compact" in
    +*) digits=${compact#+} ;;
    *) digits=$compact ;;
  esac
  if ! printf '%s' "$digits" | grep -Eq '^[0-9]{8,15}$'; then
    respond "400 Bad Request" '{"detail":"Enter an email or phone number."}'
    exit 0
  fi
  contact=+$digits
  kind=phone
fi

mkdir -p "$DIR"
n=0
while ! mkdir "$LOCK" 2>/dev/null; do
  n=$((n + 1))
  if [ "$n" -gt 50 ]; then
    respond "500 Internal Server Error" '{"detail":"Try again in a moment."}'
    exit 0
  fi
  sleep 0.1
done
trap 'rmdir "$LOCK" 2>/dev/null || true' EXIT

if [ -f "$FILE" ] && grep -F "\"contact\":\"$contact\"" "$FILE" >/dev/null 2>&1; then
  respond "200 OK" '{"ok":true}'
  exit 0
fi

created=$(date -u +%Y-%m-%dT%H:%M:%SZ)
printf '{"contact":"%s","kind":"%s","created_at":"%s"}\n' "$contact" "$kind" "$created" >> "$FILE"
respond "200 OK" '{"ok":true}'

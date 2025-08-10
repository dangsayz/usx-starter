
#!/usr/bin/env bash
set -euo pipefail
if [ -z "${USER_ID:-}" ]; then
  echo "Usage: USER_ID=<uuid> pnpm seed:owner"
  exit 1
fi
echo "Seeding OWNER role for $USER_ID"
cat <<SQL | curl -s -X POST "${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc" >/dev/null 2>&1 || true
SQL
echo "Add via SQL console instead (safer). See README for the SQL snippet."

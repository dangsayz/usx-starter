
#!/usr/bin/env bash
# USX Starter LTS — one‑click bootstrap
set -euo pipefail

echo "🚀 USX Starter LTS — starting setup..."

if ! command -v corepack >/dev/null 2>&1; then
  echo "Installing Corepack shim..."
fi

corepack enable || true
corepack prepare pnpm@9 --activate || true

echo "📦 Installing deps..."
pnpm install

# Optional: auto-install Catalyst UI kit if a zip is present
if [ -f ./catalyst-ui-kit.zip ]; then
  bash ./scripts/install-catalyst.sh || true
  rm -f catalyst-ui-kit.zip || true
fi

echo "🔧 Running bootstrap..."
if [ -f ./bootstrap.sh ]; then chmod +x ./bootstrap.sh && ./bootstrap.sh; fi

if [ ! -f .env.local ]; then
  if [ -f .env.example ]; then
    cp .env.example .env.local
  else
    cat > .env.local <<'EOF'
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE=

NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=USX Starter
NEXT_PUBLIC_TWITTER_HANDLE=
ALLOWED_ORIGIN=http://localhost:3000
EOF
  fi
  echo "ℹ️  Created .env.local (fill Supabase keys + domain)."
fi

echo "✅ Setup complete. Starting dev server on http://localhost:3000 ..."
pnpm dev -p 3000 &

# Passive check: warn if emojis exist in repo (excluding node_modules/.git)
if grep -R --exclude-dir=node_modules --exclude-dir=.git -n -- $'[\U0001F300-\U0001FAFF]' app src >/dev/null 2>&1; then
  echo "⚠️  Emoji detected in source. Our policy is to use Lucide icons, not emojis."
fi

# Try to open browser (macOS 'open', Linux 'xdg-open', Windows 'start')
( command -v open >/dev/null 2>&1 && open http://localhost:3000 ) || ( command -v xdg-open >/dev/null 2>&1 && xdg-open http://localhost:3000 ) || true

echo "➡️  Next steps:"
echo "   1) In Supabase -> SQL, paste contents of supabase.sql and run."
echo "   2) Sign up locally, then set OWNER role (see README)."
echo "   3) Visit /admin."

# Sanity check for header
[ -f src/components/navigation/SiteHeader.tsx ] && echo "✔ SiteHeader present" || echo "✖ SiteHeader missing"

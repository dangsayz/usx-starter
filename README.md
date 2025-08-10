
# USX Starter v1.0 — God‑Mode Admin + SEO Mastery + Security

## 🚀 Easiest Install
Run:
```bash
bash one-click.sh
```

---

## 🚀 One-liner Install (from an empty folder containing this zip)
```bash
unzip -o usx-starter-v1.0.zip -d . && corepack enable && corepack prepare pnpm@9 --activate && pnpm install && chmod +x ./bootstrap.sh && ./bootstrap.sh && cp .env.example .env.local && pnpm dev -p 3000
```

---

## 📦 What’s inside
- **Framework**: Next.js App Router (TS strict) + Tailwind v4 (ESM PostCSS)
- **Auth**: Supabase Auth (SSR helpers), Profiles
- **Threads MVP**: `/forum`, `/forum/create`, `/thread/[slug]` with slugs
- **God-Mode Admin**: `/admin` — Roles, Feature Flags, Settings, Reports, Audit, Users, Threads
- **SEO Pack**: Metadata helpers, site defaults, canonical tags, sitemap, robots.txt, JSON-LD schema helpers, OG defaults
- **Security**: Hardened CSP headers, robots.txt disallow `/admin`, rate-limit util, POST origin check for admin APIs
- **Health**: `/api/v1/health`

---

## 🔑 Supabase setup
1. Add your keys to `.env.local` (see `.env.example`).
2. In Supabase SQL editor, run `supabase.sql` from this repo.
3. (Optional for local dev) Seed yourself as OWNER in one command:
```bash
USER_ID=<your-supabase-user-id> pnpm seed:owner
```
   or paste this in Supabase SQL:
```sql
insert into public.user_roles (user_id, role) values ('YOUR_USER_ID','OWNER')
on conflict (user_id) do update set role='OWNER';
```
4. Visit `/admin`.

---

## 📈 SEO Notes
- Edit defaults in `src/lib/seo.ts` and env vars (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME`).
- Sitemap: `/sitemap.xml` auto-includes recent threads.
- Robots: `/robots.txt` disallows `/admin`, points to sitemap.
- Canonicals + OpenGraph injected from layout helpers.
- Structured data: `src/lib/schema.ts` utilities; home + thread pages include JSON-LD.

---

## 🔒 Security Notes
- Update CSP in `middleware.ts` to your domains.
- Admin APIs enforce SSR role guard + Origin check.
- For production rate-limits, swap `src/lib/rate-limit.ts` to an external store (e.g., Upstash).


---

## 🎛 Catalyst UI Kit (Tailwind team) — Optional
If you have `catalyst-ui-kit.zip` in the project root, the one-click script will automatically install it into `src/catalyst/` and add `@headlessui/react`.
You can also run it manually:
```bash
bash scripts/install-catalyst.sh catalyst-ui-kit.zip
```

## 🧭 Icon & Emoji Policy
- Use **Lucide** icons via `src/components/ui/Icon.tsx` (`<Icon name="Camera" />` etc.).
- **No emojis** in UI copy. The build includes a check:
  - Warns during `one-click.sh`
  - Use `pnpm check:emoji` to hard-fail in CI


> **Note:** `.env.example` now includes placeholders for Supabase, email, analytics, payments, OAuth, and rate‑limits so you just paste your keys.


---

## 🎛 Catalyst UI Kit — two ways (both supported)
**A. Zip flow (hands-off):**
1) Put `catalyst-ui-kit.zip` next to `one-click.sh`
2) Run `bash one-click.sh` → it unzips into `src/catalyst/`, wires CSS, installs deps, and deletes the zip

**B. Manual folder flow:**
1) Unzip the Catalyst package yourself into the project root, e.g. `./catalyst-ui-kit`  
2) Run `bash one-click.sh` → it detects the folder and syncs to `src/catalyst/` and wires CSS automatically

In both cases, Tailwind scans `src/catalyst/**/*.{ts,tsx}` and your CSS is imported via `app/(public)/globals.css`.

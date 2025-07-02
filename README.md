# 🤖 MBTQ GitHub Bot + Supabase Auth Portal

This repository powers the **MBTQ Developer Platform Frontend** including:

1. A secure **Supabase Auth login** (Magic Link, Client Safe)
2. A GitHub Bot powered by **Probot** for automation
3. GitHub Actions for `.env` sync and Vercel deployment
4. EnvHub 360 integration to manage Dev, Staging, and Prod configs

---

## 🔐 Supabase Login (Frontend)

### Features

- ✅ Magic Link email auth (no password)
- ✅ Vercel + Supabase compatible
- ✅ Client-safe via `useEffect` (no Suspense crashes)
- ✅ Role-based UI supported
- ✅ Auto-redirect to dashboard after login

### Setup

```bash
# Required .env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key


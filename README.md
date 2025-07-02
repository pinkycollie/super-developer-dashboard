

# 🔐 Supabase Auth Login – MBTQ Developer Platform Frontend

This component provides a secure and Vercel-ready login page using Supabase Magic Link authentication.  
It’s designed for **mbtq.dev** and any `*.mbtquniverse.com` frontend portal.

---

## 🚀 Features

- ✅ Fully client-compatible with Next.js / V0.dev
- ✅ Uses `useEffect()` and async-safe lifecycle
- ✅ Magic link sign-in (no passwords)
- 🔁 Redirects to `/dashboard` after login (optional)
- 🔐 Compatible with `supabase.mbtq.dev` backend

---

## 📁 Location

apps/
dev-platform-frontend/
auth/
login.tsx
pages/
dashboard.tsx (optional)

---

## 🔧 Required `.env` Vars

These should be in your `.env` file (local or Vercel):

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key


⸻

⚙️ Setup Instructions
	1.	Add Supabase URL and Key to .env.local or Vercel → Project Settings.
	2.	Deploy via Vercel → supabase.mbtq.dev
	3.	Magic link login prompts user for email.
	4.	Use session logic in useEffect to route post-login.

⸻

🧠 Notes for GitHub Actions / Probot
	•	This app is auto-bootstrapped using mbtq_brainflow_map.yaml 🤖
	•	CI/CD scripts pull secrets from EnvHub 360 🔁
	•	You can expand this to add:
	•	GitHub OAuth
	•	Role-bound dashboards
	•	Audit logs via Fibonrose

⸻

✨ Credits

Built by @pinkycollie for MBTQ Universe dev stack 💻🔮
Powered by Supabase and Vercel

⸻

👁️‍🗨️ Secure the portal. Manage the magic. Welcome to the MBTQ Universe.

---




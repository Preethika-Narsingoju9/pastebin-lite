# Pastebin-Lite 🚀

**Modern Pastebin clone** - Next.js 15 + Upstash Redis + Vercel  
**Live:** https://pastebin-lite.vercel.app

## ✨ Features
- ✅ **Real-time pastes** with unique IDs
- ✅ **TTL (10 sec)** - Auto-expire (Redis)
- ✅ **Responsive UI** - Tailwind CSS
- ✅ **API Routes** - `/api/pastes` + `/api/pastes/[id]`
- ✅ **Production-ready** - Vercel + Redis

## 🛠 Tech Stack
Frontend: Next.js 15 (App Router) + TypeScript + Tailwind
Backend: Next.js API Routes + Upstash Redis (Serverless)
Deployment: Vercel
Testing: Postman

## 🚀 Live Demo
**Create paste:** https://pastebin-lite.vercel.app  
**API Health:** https://pastebin-lite.vercel.app/api/healthz  
**API Pastes:** https://pastebin-lite.vercel.app/api/pastes

## 🔧 Environment Variables
UPSTASH_REDIS_REST_URL=https://musical-sheepdog-52737.upstash.io
UPSTASH_REDIS_REST_TOKEN=Ac4BAAIncDFmZjQ4NTA3MzVjNDI0YTQ4OTFlMjhkN2QzNGViMmM0ZHAxNTI3Mzc
NEXT_PUBLIC_BASE_URL=https://pastebin-lite.vercel.app

## 🧪 Test Flow
POST /api/pastes → {"content": "Hello World"}

GET /p/[id] → Shows paste

Redis TTL 10s → Auto-delete

GET /p/[id] → 404 Gone ✅

## 📁 Project Structure
app/
├── api/pastes/[id]/route.ts # GET/DELETE paste
├── api/pastes/route.ts # POST new paste
├── api/healthz/route.ts # Redis health
├── p/[id]/page.tsx # View paste page
├── page.tsx # Home (create form)
lib/
├── redis.ts # Redis client
├── pastes.ts # Paste CRUD
├── time.ts # TTL utils

## 🌐 Deployment
1. **Fork/Clone** this repo
2. **Vercel** → Import GitHub repo
3. **Add 3 env vars** (above)
4. **Deploy** → Live in 60s!

## 🎯 Built For
**Full-Stack Portfolio** - Java/Next.js developer  
**Job Interviews** - Live demo + production Redis  

---
**Made with VScode GitHub vercel** | Next.js 15 + Upstash Redis



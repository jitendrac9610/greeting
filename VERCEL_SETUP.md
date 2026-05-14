# 🚀 Vercel Deployment Setup

## ✅ Files Created/Updated

1. **`.env.production`** - Environment variables for production build
2. **`Home.jsx`** - Added API URL validation
3. **`Preview.jsx`** - Added API URL validation

---

## 🔧 Required Vercel Settings

### Step 1: Go to Vercel Dashboard

- Navigate to: https://vercel.com/dashboard
- Select your project: **greeting-bh6x**

### Step 2: Add Environment Variables

- Click **Settings** → **Environment Variables**
- Add these 2 variables:

```
VITE_CLERK_PUBLISHABLE_KEY = pk_test_YnJpZWYtc3RhcmxpbmctNjYuY2xlcmsuYWNjb3VudHMuZGV2JA

VITE_API_URL = https://greeting-hbps.onrender.com
```

**⚠️ Important:** Make sure they apply to:

- ✓ Production
- ✓ Preview
- ✓ Development

### Step 3: Redeploy

- Go to **Deployments** tab
- Click the latest deployment
- Click **Redeploy**
- Wait for build to complete ✓

---

## 🧪 Test URLs

After redeploy:

- ✅ `https://greeting-bh6x.vercel.app/` → Login page
- ✅ `https://greeting-bh6x.vercel.app/profile-setup` → Profile setup
- ✅ `https://greeting-bh6x.vercel.app/home` → Home with templates
- ✅ `https://greeting-bh6x.vercel.app/preview/[id]` → Preview page

---

## 🐛 Debug Info

If pages still don't work:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors with "API URL" or "VITE\_"
4. Check Network tab to see if API requests are successful

---

## 📝 Local Development

To test locally:

```bash
cd client
npm run dev
```

The `.env` file will be used automatically.

---

## 🎯 What Changed

- Added env validation to prevent silent failures
- Created `.env.production` for build-time environment variables
- Added clear error messages in console if API URL is missing

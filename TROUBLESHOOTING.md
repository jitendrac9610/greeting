# 🆘 Troubleshooting Guide

Common issues and solutions for the Greeting Card application.

## 📑 Table of Contents

- [Frontend Issues](#frontend-issues)
- [Backend Issues](#backend-issues)
- [Database Issues](#database-issues)
- [Authentication Issues](#authentication-issues)
- [Deployment Issues](#deployment-issues)
- [Performance Issues](#performance-issues)

---

## 🎨 Frontend Issues

### Blank White Page

**Symptom**: App shows blank white page after loading

**Root Causes**:

1. JavaScript errors in console
2. Missing environment variables
3. Build issues

**Solutions**:

```bash
# 1. Check browser console for errors
# Press F12 → Console tab

# 2. Verify .env file exists and has values
cat .env

# 3. Clear cache and rebuild
npm run build
npm run preview

# 4. Check for syntax errors
npm run lint

# 5. Check if backend API is accessible
# In browser console:
fetch('http://localhost:5000/').then(r => r.json()).then(console.log)
```

---

### Module Not Found Error

**Symptom**: `Error: Cannot find module '@clerk/clerk-react'`

**Cause**: Missing dependencies

**Solution**:

```bash
cd client
npm install
npm run dev
```

---

### "VITE_CLERK_PUBLISHABLE_KEY is not defined"

**Symptom**: Clerk authentication fails

**Cause**: Missing environment variable

**Solution**:

```bash
# 1. Create .env file
echo "VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key" > .env

# 2. Get key from https://dashboard.clerk.com
# 3. Copy-paste Publishable Key into .env

# 4. Restart dev server
npm run dev
```

---

### Images Not Loading / Broken Links

**Symptom**: Template images show broken image icon

**Root Causes**:

1. Cloudinary URLs are incorrect
2. CORS errors
3. Image deleted from Cloudinary

**Solutions**:

```javascript
// Check in browser DevTools:
// 1. Network tab - look for failed image requests
// 2. Console tab - check for CORS errors

// 3. Verify Cloudinary URL format
// Should be: https://res.cloudinary.com/[cloud-name]/...

// 4. Test image directly in browser
// Copy URL and paste in new tab
```

---

### CORS Error in Console

**Symptom**: `Access to XMLHttpRequest blocked by CORS policy`

**Cause**: Backend CORS configuration

**Solution**:

```bash
# 1. Verify backend .env has correct frontend URL
FRONTEND_URL=http://localhost:5173

# 2. Check backend CORS configuration
# File: backend/src/app.js
const allowedOrigins = ['http://localhost:5173', ...];
app.use(cors({ origin: allowedOrigins }));

# 3. Restart backend server
npm run dev
```

---

### Authentication Not Persisting

**Symptom**: User logged out when page refreshes

**Cause**: Clerk session not properly stored

**Solution**:

```javascript
// Check browser localStorage
// Open DevTools → Application → Local Storage
// Look for keys starting with 'clerk_'

// If empty:
// 1. Clear localStorage
localStorage.clear();

// 2. Clear browser cache
// Ctrl+Shift+Delete (Chrome)

// 3. Log in again
```

---

### Slow Performance / Laggy UI

**Symptom**: App feels slow, animations lag

**Causes**:

1. Large images not optimized
2. Too many re-renders
3. Heavy computations

**Solutions**:

```bash
# 1. Check bundle size
npm run build
# Look at dist/ folder size

# 2. Use React DevTools Profiler
# Chrome extension: React Developer Tools
# Analyze which components re-render

# 3. Optimize images
# Use Cloudinary transformations:
# https://res.cloudinary.com/.../c_scale,w_300

# 4. Lazy load components
import { lazy, Suspense } from 'react';
const HeavyComponent = lazy(() => import('./Heavy'));
```

---

## 🖥️ Backend Issues

### "Port 5000 is already in use"

**Symptom**: `EADDRINUSE: address already in use :::5000`

**Cause**: Another process using port 5000

**Solution**:

**Windows (PowerShell)**:

```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID [PID] /F

# Or use different port
$env:PORT=5001
npm run dev
```

**macOS/Linux**:

```bash
# Find process
lsof -i :5000

# Kill the process
kill -9 [PID]

# Or use different port
PORT=5001 npm run dev
```

---

### "Cannot find module 'express'"

**Symptom**: `Error: Cannot find module 'express'`

**Cause**: Dependencies not installed

**Solution**:

```bash
cd backend
npm install
npm run dev
```

---

### MongoDB Connection Error

**Symptom**: `MongoServerError: connection refused`

**Root Causes**:

1. MongoDB not running
2. Wrong connection string
3. IP whitelist issue

**Solutions**:

```bash
# 1. Verify MONGO_URI in .env
cat .env | grep MONGO_URI

# 2. Check connection string format
# Should be: mongodb+srv://username:password@cluster.mongodb.net/dbname

# 3. Test connection with MongoDB Compass
# Download: https://www.mongodb.com/products/compass
# Paste connection string and connect

# 4. Check IP whitelist in MongoDB Atlas
# https://cloud.mongodb.com
# Network Access → IP Whitelist
# Add: 0.0.0.0/0 (for dev) or specific IP (for prod)

# 5. Verify database user credentials
# Make sure password is URL encoded if it contains special characters
```

---

### 500 Internal Server Error

**Symptom**: API returns `HTTP 500` with no error details

**Cause**: Server-side error, check logs

**Solution**:

```bash
# 1. Check terminal where backend is running
# Look for error messages and stack traces

# 2. Add logging to find the issue
console.log('Debug info:', variable);

# 3. Check request/response format
# Verify JSON is valid

# 4. Test with Postman
# Install: https://www.postman.com/downloads/
# Create new request and send

# 5. Enable debug mode
NODE_ENV=development npm run dev
```

---

### CORS Errors from Frontend

**Symptom**: `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution**:

```javascript
// backend/src/app.js
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://greeting-bh6x.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
```

---

### Cloudinary Upload Fails

**Symptom**: Upload returns 400 or 401 error

**Root Causes**:

1. Invalid credentials
2. Account permissions
3. File size too large

**Solution**:

```bash
# 1. Verify credentials in .env
cat .env | grep CLOUDINARY

# 2. Get correct values from:
# https://cloudinary.com/console

# 3. Test upload with Postman
# POST https://api.cloudinary.com/v1_1/[cloud-name]/image/upload
# Form data:
#   file: [select image]
#   api_key: your_api_key
#   timestamp: unix_timestamp
#   signature: generated_signature

# 4. Check file size
# Max: 100 MB for free tier

# 5. Check file format
# Supported: jpg, png, gif, webp, etc.
```

---

## 🗄️ Database Issues

### Database Connection Timeout

**Symptom**: `MongooseServerSelectionError: connect ECONNREFUSED`

**Cause**: Network/connectivity issue

**Solution**:

```bash
# 1. Check internet connection
ping google.com

# 2. Check MongoDB Atlas status
# https://status.mongodb.com

# 3. Update MONGO_URI
# Might have changed in MongoDB Atlas

# 4. Use MongoDB Compass to test
# https://www.mongodb.com/products/compass

# 5. Check firewall settings
# Your ISP might be blocking MongoDB ports
```

---

### Duplicate Key Error

**Symptom**: `E11000 duplicate key error`

**Cause**: Unique index violation

**Solution**:

```bash
# 1. Check if field has unique index
db.templates.getIndexes()

# 2. Remove duplicate documents
db.templates.deleteMany({ title: "Duplicate" })

# 3. Clear and reseed database
db.templates.deleteMany({})
npm run seed  # if you have seed script
```

---

### Database Size Exceeds Quota

**Symptom**: MongoDB returns quota exceeded error

**Cause**: Storage limit reached (free tier: 512MB)

**Solution**:

```bash
# 1. Check database size
# MongoDB Atlas → Collections → Storage

# 2. Delete old/unnecessary data
db.templates.deleteMany({ createdAt: { $lt: ISODate("2024-01-01") } })

# 3. Upgrade to paid tier
# MongoDB Atlas → Edit Cluster → Change Tier

# 4. Archive old data
# Export to local JSON and delete from DB
mongoexport --db greeting_db --collection templates
```

---

## 🔐 Authentication Issues

### "Clerk Publishable Key not found"

**Symptom**: Clerk sign-in widget won't load

**Cause**: Invalid or missing key

**Solution**:

```bash
# 1. Verify .env has correct key
grep VITE_CLERK_PUBLISHABLE_KEY .env

# 2. Key should start with 'pk_'
# Not 'sk_' (secret key)

# 3. Get from https://dashboard.clerk.com
# Settings → API Keys → Publishable key

# 4. Restart dev server after updating .env
npm run dev
```

---

### JWT Token Invalid / Expired

**Symptom**: `401 Unauthorized` on API requests

**Cause**: Token expired or tampered

**Solution**:

```javascript
// Client-side
// Clear localStorage and re-authenticate
localStorage.clear();
// Redirect to login

// Server-side - check token validation
// backend/src/middleware/auth.js
const token = req.headers.authorization?.split(" ")[1];
if (!token) {
  return res.status(401).json({ error: "No token" });
}

jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) return res.status(401).json({ error: "Invalid token" });
  req.user = decoded;
  next();
});
```

---

### Login Redirects to Wrong Page

**Symptom**: After login, redirects to unexpected URL

**Cause**: Clerk redirect URL misconfigured

**Solution**:

```bash
# 1. Check Clerk dashboard
# https://dashboard.clerk.com

# 2. Go to Settings → URLs

# 3. Set Redirect URLs:
# - Signed-in URL: /home
# - Signed-out URL: /
# - After sign-up URL: /profile-setup
```

---

## 🚀 Deployment Issues

### Vercel Deployment Failed

**Symptom**: Build fails on Vercel

**Root Causes**:

1. Missing environment variables
2. Build command error
3. Node version mismatch

**Solution**:

```bash
# 1. Check build logs
# Vercel Dashboard → Deployments → Build Logs

# 2. Verify environment variables
# Settings → Environment Variables
# Ensure VITE_CLERK_PUBLISHABLE_KEY and VITE_API_URL exist

# 3. Test build locally
npm run build
npm run preview

# 4. Check Node version
# .nvmrc file (specify node version)
echo "18" > .nvmrc

# 5. Force redeploy
# Vercel Dashboard → Deployments → Redeploy
```

---

### Render Backend Won't Deploy

**Symptom**: `Build failed` on Render

**Solution**:

```bash
# 1. Check build logs
# Render Dashboard → Service → Logs

# 2. Verify package.json exists
cat package.json

# 3. Test locally
npm install
npm start

# 4. Check for errors in node_modules
npm ci --production

# 5. Update build command
# Render → Settings → Build Command
# Should be: npm install (not npm ci)
```

---

## ⚡ Performance Issues

### Slow API Response

**Symptom**: API takes > 5 seconds to respond

**Causes**:

1. Database queries too slow
2. Large data transfers
3. Server resource limits

**Solutions**:

```javascript
// 1. Add database indexes
db.templates.createIndex({ category: 1 });

// 2. Implement pagination
app.get("/api/templates", (req, res) => {
  const page = req.query.page || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  Template.find().skip(skip).limit(limit);
});

// 3. Cache results
const cache = new Map();

// 4. Add logging to find bottleneck
console.time("query");
const result = await Template.find();
console.timeEnd("query");
```

---

### High CPU Usage

**Symptom**: Server becomes unresponsive

**Cause**: Inefficient code or infinite loop

**Solution**:

```bash
# 1. Check Render metrics
# Dashboard → Service → Metrics

# 2. Look for infinite loops
# Especially in async operations

# 3. Monitor with PM2
npm install -g pm2
pm2 start src/server.js
pm2 monit

# 4. Profile with Node inspector
node --inspect src/server.js
# Open chrome://inspect in Chrome
```

---

## 🔧 Debugging Tips

### Enable Verbose Logging

```bash
# Frontend
npm run dev -- --debug

# Backend
DEBUG=* npm run dev
```

### Use Postman for API Testing

```bash
# Install from https://www.postman.com/downloads/

# Test backend endpoints:
GET http://localhost:5000/api/templates
Authorization: Bearer [jwt_token]
```

### Check Network Requests

```javascript
// Chrome DevTools → Network tab
// See all requests and responses
// Check status codes, headers, payloads
```

---

## 📞 Getting Help

If you're still stuck:

1. **Search issues** on GitHub
2. **Create new issue** with:
   - Error message
   - Steps to reproduce
   - Screenshots
   - Environment info
3. **Check documentation**:
   - Clerk: https://clerk.com/docs
   - MongoDB: https://docs.mongodb.com
   - Express: https://expressjs.com
4. **Ask in community**:
   - Stack Overflow
   - Discord servers
   - Reddit (r/reactjs, r/node)

---

**Last Updated**: 2024  
**Version**: 1.0

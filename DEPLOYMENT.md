# 🚀 Deployment Guide

Complete guide for deploying the Greeting Card application to production.

## 📑 Table of Contents

1. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
2. [Backend Deployment (Render)](#backend-deployment-render)
3. [Environment Configuration](#environment-configuration)
4. [Database Setup](#database-setup)
5. [Domain Configuration](#domain-configuration)
6. [Monitoring & Maintenance](#monitoring--maintenance)
7. [Troubleshooting](#troubleshooting)

---

## 🎨 Frontend Deployment (Vercel)

### Prerequisites

- Vercel account (free tier available)
- GitHub account with code pushed
- Domain name (optional)

### Step 1: Connect GitHub to Vercel

1. Visit [vercel.com](https://vercel.com)
2. Click **Sign up** or **Log in**
3. Click **New Project**
4. Select **Import Git Repository**
5. Choose your GitHub repo
6. Click **Import**

### Step 2: Configure Build Settings

```
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

Vercel auto-detects these, but verify in **Settings > Build & Development Settings**

### Step 3: Set Environment Variables

1. Go to **Settings > Environment Variables**
2. Add the following variables:

```
VITE_CLERK_PUBLISHABLE_KEY = pk_test_...
VITE_API_URL = https://your-api-url.com
```

3. Select scope:
   - ✓ Production
   - ✓ Preview
   - ✓ Development

4. Click **Save**

### Step 4: Deploy

1. Click **Deploy**
2. Wait for build to complete (usually 2-3 minutes)
3. View deployment at `https://your-project.vercel.app`

### Step 5: Configure Custom Domain

1. Go to **Settings > Domains**
2. Enter your domain name
3. Add DNS records as shown by Vercel
4. Wait for verification (can take up to 24 hours)

### Automatic Deployments

Vercel automatically deploys when:

- Push to `main` branch
- Create a pull request (preview deployment)
- Push to other branches (manual trigger)

### Rollback

1. Go to **Deployments**
2. Find previous deployment
3. Click the deployment
4. Click **Promote to Production**

---

## 🖥️ Backend Deployment (Render)

### Prerequisites

- Render account (free tier available)
- GitHub account with code pushed
- MongoDB Atlas connection string
- Cloudinary credentials

### Step 1: Create Web Service

1. Visit [render.com](https://render.com)
2. Click **Dashboard**
3. Click **New +**
4. Select **Web Service**
5. Choose **Build and deploy from a Git repository**

### Step 2: Connect GitHub

1. Click **Connect to GitHub**
2. Authorize Render
3. Search for your repository
4. Select it and click **Connect**

### Step 3: Configure Service

```
Name: greeting-api
Environment: Node
Region: Choose closest to your users
Build Command: npm install
Start Command: node src/server.js
```

### Step 4: Set Environment Variables

Click **Environment** and add:

```
MONGO_URI = mongodb+srv://username:password@cluster.mongodb.net/greeting_db
CLOUDINARY_NAME = your_cloudinary_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret
JWT_SECRET = your_super_secret_key_12345
PORT = 5000
NODE_ENV = production
```

### Step 5: Deploy

1. Click **Create Web Service**
2. Render builds and deploys automatically
3. View logs in **Logs** tab
4. Service available at `https://your-service.onrender.com`

### Manual Deployments

To redeploy after code changes:

1. Click **Manual Deploy**
2. Select **Deploy Latest Commit**
3. Wait for build to complete

### Logs & Monitoring

1. Click **Logs** tab to view:
   - Build logs
   - Runtime logs
   - Error messages

---

## ⚙️ Environment Configuration

### Backend .env Template

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/greeting_db

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# JWT
JWT_SECRET=your_very_secure_jwt_secret_key_here

# Server
PORT=5000
NODE_ENV=production

# API URL (for CORS)
FRONTEND_URL=https://greeting-bh6x.vercel.app
```

### Frontend .env Template

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
VITE_API_URL=https://your-api.onrender.com
```

### Never Commit .env Files

Add to `.gitignore`:

```
.env
.env.local
.env.*.local
```

---

## 🗄️ Database Setup

### MongoDB Atlas

1. Visit [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster:
   - Cloud Provider: AWS
   - Region: Closest to your users
   - Tier: M0 (free)
4. Create database user
5. Add IP whitelist:
   - For development: 0.0.0.0/0 (allow all)
   - For production: Specific IPs only
6. Copy connection string
7. Replace `<username>` and `<password>` in connection string
8. Paste into `MONGO_URI` environment variable

### Backup Strategy

```bash
# Download backup from MongoDB Atlas
# Settings > Data -> Export

# Or use mongodump
mongodump --uri "mongodb+srv://username:password@cluster.mongodb.net/greeting_db" --out ./backup
```

---

## 🌐 Domain Configuration

### DNS Records Setup

For domain `greeting.com`:

| Type  | Name | Value                   |
| ----- | ---- | ----------------------- |
| A     | @    | Vercel IP               |
| CNAME | www  | cname.vercel-dns.com    |
| MX    | @    | Mail server (if needed) |

### Update CORS Settings

**Backend** (`src/app.js`):

```javascript
const allowedOrigins = [
  "https://greeting.com",
  "https://www.greeting.com",
  "https://greeting-bh6x.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
  }),
);
```

### SSL/TLS Certificates

- Vercel: Auto-managed by Let's Encrypt
- Render: Auto-managed by Let's Encrypt
- No additional configuration needed

---

## 📊 Monitoring & Maintenance

### Vercel Monitoring

1. **Analytics**: View in **Settings > Analytics**
2. **Logs**: Real-time logs in **Deployments**
3. **Speed Insights**: Performance metrics
4. **Web Vitals**: User experience metrics

### Render Monitoring

1. **Logs**: Check runtime errors
2. **Metrics**: CPU, memory, response time
3. **Uptime**: Monitor service availability

### Error Tracking (Optional)

Consider adding:

- **Sentry**: Error tracking and monitoring
- **LogRocket**: User session recording
- **New Relic**: Performance monitoring

### Health Checks

Add endpoint for monitoring:

```javascript
// backend/src/app.js
app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    timestamp: new Date(),
    uptime: process.uptime(),
  });
});
```

Configure monitoring services to ping `/health` every 5 minutes.

---

## 🔒 Security Checklist

- [ ] All environment variables are secrets (not in code)
- [ ] HTTPS is enabled on both frontend and backend
- [ ] CORS is configured correctly
- [ ] Database credentials are rotated regularly
- [ ] MongoDB IP whitelist includes only necessary IPs
- [ ] API rate limiting is implemented
- [ ] Input validation on all endpoints
- [ ] No console.logs with sensitive data
- [ ] Regular dependency updates (`npm audit`)
- [ ] Database backups are automated

---

## 🐛 Troubleshooting

### Frontend Won't Load

**Symptom**: Blank page or 404 error

**Solutions**:

1. Check Vercel build logs
2. Verify environment variables
3. Ensure build command is correct
4. Check for missing dependencies

### API Connection Error

**Symptom**: CORS error or 500 response

**Solutions**:

1. Verify `VITE_API_URL` is correct
2. Check CORS settings in backend
3. Verify backend is running
4. Check API response in browser DevTools

### Database Connection Failed

**Symptom**: 503 Service Unavailable

**Solutions**:

1. Verify `MONGO_URI` connection string
2. Check MongoDB cluster is running
3. Verify IP whitelist includes server IP
4. Check database user credentials

### Cloudinary Upload Fails

**Symptom**: 400 Bad Request on image upload

**Solutions**:

1. Verify Cloudinary credentials
2. Check API key and secret
3. Ensure account has upload permissions
4. Verify image format is supported

### Deployment Stuck

**Symptom**: Deployment pending for > 10 minutes

**Solutions**:

1. Cancel and restart deployment
2. Check for build errors in logs
3. Verify all dependencies are available
4. Check for infinite loops in code

---

## 📝 Post-Deployment Checklist

- [ ] Test all features on production
- [ ] Verify database connectivity
- [ ] Check API endpoints with Postman
- [ ] Test image upload functionality
- [ ] Verify authentication (Clerk)
- [ ] Test mobile responsiveness
- [ ] Check performance metrics
- [ ] Monitor error logs
- [ ] Set up uptime monitoring
- [ ] Document any issues

---

## 🔄 CI/CD Pipeline

### Automated Deployments

1. **Push to main** → Frontend deploys
2. **Merge PR** → Build and test → Deploy
3. **New version tag** → Create release

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run lint
      - run: npm test
```

---

## 📞 Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Guide](https://docs.mongodb.com/atlas)
- [Clerk Documentation](https://clerk.com/docs)

---

**Version**: 1.0  
**Last Updated**: 2024

---

**Happy deploying! 🚀**

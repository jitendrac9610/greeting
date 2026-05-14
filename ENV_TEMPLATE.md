# Environment Variables Template

Copy this file and save it as `.env` in the corresponding directories.
**⚠️ NEVER commit .env files to version control!**

---

## Backend (.env)

Place this in the `backend/` directory.

```env
# ============================================
# DATABASE CONFIGURATION
# ============================================
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/greeting_db

# ============================================
# CLOUDINARY CONFIGURATION
# ============================================
# Get these from: https://cloudinary.com/console
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# ============================================
# AUTHENTICATION
# ============================================
# JWT secret for token signing (use a strong random string)
# Generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_super_secret_jwt_key_replace_with_random_string

# ============================================
# SERVER CONFIGURATION
# ============================================
PORT=5000
NODE_ENV=development

# ============================================
# CORS CONFIGURATION
# ============================================
# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173

# ============================================
# LOGGING
# ============================================
LOG_LEVEL=debug

```

### How to Generate Secure Values

**MongoDB URI**:

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Create a database user
4. Copy connection string
5. Replace `<username>` and `<password>`

**Cloudinary Credentials**:

1. Go to https://cloudinary.com/console
2. Copy Cloud Name, API Key, and API Secret
3. Paste into .env

**JWT Secret**:

```bash
# Run this command in terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Copy the output
```

---

## Frontend (.env)

Place this in the `client/` directory.

```env
# ============================================
# CLERK AUTHENTICATION
# ============================================
# Get this from: https://dashboard.clerk.com/apps
# Go to API Keys > Publishable key
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# ============================================
# API CONFIGURATION
# ============================================
# Backend API URL
# Development: http://localhost:5000
# Production: https://your-api-url.com
VITE_API_URL=http://localhost:5000

# ============================================
# APP CONFIGURATION
# ============================================
VITE_APP_NAME=Greeting Card App
VITE_APP_VERSION=1.0.0

```

### How to Get Clerk Keys

1. Go to https://clerk.com
2. Sign up/Login
3. Create an application
4. Go to **API Keys**
5. Copy **Publishable Key**
6. Paste into `VITE_CLERK_PUBLISHABLE_KEY`

---

## Production Configuration

### Backend Production (.env.production)

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/greeting_db_production
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_production_jwt_secret
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://greeting-bh6x.vercel.app
LOG_LEVEL=info
```

### Frontend Production (.env.production)

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key
VITE_API_URL=https://greeting-hbps.onrender.com
VITE_APP_NAME=Greeting Card App
```

---

## Environment Variables Reference

### Backend Variables

| Variable                | Required | Description               | Example                          |
| ----------------------- | -------- | ------------------------- | -------------------------------- |
| `MONGO_URI`             | ✅       | MongoDB connection string | `mongodb+srv://...`              |
| `CLOUDINARY_NAME`       | ✅       | Cloudinary cloud name     | `mycloud`                        |
| `CLOUDINARY_API_KEY`    | ✅       | Cloudinary API key        | `123456789`                      |
| `CLOUDINARY_API_SECRET` | ✅       | Cloudinary API secret     | `abc123xyz`                      |
| `JWT_SECRET`            | ✅       | JWT signing secret        | 32-char random string            |
| `PORT`                  | ❌       | Server port               | `5000`                           |
| `NODE_ENV`              | ❌       | Environment               | `development` or `production`    |
| `FRONTEND_URL`          | ❌       | Frontend CORS origin      | `http://localhost:5173`          |
| `LOG_LEVEL`             | ❌       | Logging level             | `debug`, `info`, `warn`, `error` |

### Frontend Variables

| Variable                     | Required | Description         | Example                 |
| ---------------------------- | -------- | ------------------- | ----------------------- |
| `VITE_CLERK_PUBLISHABLE_KEY` | ✅       | Clerk public key    | `pk_test_...`           |
| `VITE_API_URL`               | ✅       | Backend API URL     | `http://localhost:5000` |
| `VITE_APP_NAME`              | ❌       | Application name    | `Greeting Cards`        |
| `VITE_APP_VERSION`           | ❌       | Application version | `1.0.0`                 |

---

## .gitignore Configuration

Add this to `.gitignore` to prevent committing sensitive files:

```
# Environment variables
.env
.env.local
.env.*.local

# Logs
logs/
*.log
npm-debug.log*

# Dependencies
node_modules/

# Build outputs
dist/
build/
.next/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Temporary files
tmp/
temp/
.tmp/
```

---

## Setup Instructions

### Windows (PowerShell)

```powershell
# Backend
cd backend
Copy-Item ..\env.template.txt .env
# Edit .env with Notepad
notepad .env

# Frontend
cd ../client
Copy-Item ..\env.template.txt .env
notepad .env
```

### macOS / Linux

```bash
# Backend
cd backend
cp ../env.template.txt .env
nano .env
# Or use your preferred editor

# Frontend
cd ../client
cp ../env.template.txt .env
nano .env
```

---

## Verification

After creating `.env` files, verify they're not tracked:

```bash
git status
```

You should NOT see `.env` files listed.

---

## Common Issues

### MongoDB Connection Fails

- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions
- Try connection string in MongoDB Compass first

### Cloudinary Upload Fails

- Verify API key and secret are correct
- Check Cloudinary account settings
- Ensure upload preset is configured (if using)
- Check file size limits

### Clerk Authentication Issues

- Verify Publishable Key is correct
- Check Clerk dashboard for app configuration
- Ensure domain is whitelisted in Clerk
- Check browser console for error messages

---

## Security Best Practices

1. **Never commit .env** - Use .gitignore
2. **Use strong secrets** - Random 32+ character strings
3. **Rotate secrets** - Change periodically in production
4. **Different values per environment** - Dev, staging, prod
5. **Use Vercel/Render secrets** - Store in platform dashboards, not in code
6. **Limit file permissions** - `.env` should not be world-readable
7. **Use secret management** - Consider tools like HashiCorp Vault
8. **Audit access** - Monitor who accesses production secrets

---

## Retrieving from Production

### From Vercel

```bash
# List all environment variables
vercel env ls

# Pull production environment
vercel env pull
# Creates .env.production.local
```

### From Render

1. Go to Render Dashboard
2. Select your service
3. Go to **Environment**
4. Variables are shown (some may be hidden for security)

---

**⚠️ Remember: Never share your .env file or secrets with anyone!**

---

**Last Updated**: 2024  
**Version**: 1.0

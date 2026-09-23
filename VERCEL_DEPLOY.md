# 🚀 Deploy to Vercel - Complete Guide

## What is Vercel?

Vercel is a cloud platform for deploying web applications with:
- ✅ **Free hosting** (Hobby plan)
- ✅ **Automatic HTTPS**
- ✅ **Global CDN**
- ✅ **Automatic deployments** from Git
- ✅ **Custom domains**
- ✅ **No credit card required** for free tier

---

## Prerequisites

- ✅ GitHub account (to connect repository)
- ✅ Vercel account (free to create)
- ✅ Project pushed to GitHub

---

## Method 1: Deploy via Vercel Website (Easiest)

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

### Step 2: Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Find your repository: `document-text-replacer`
3. Click **"Import"**

### Step 3: Configure Project

**Framework Preset:** Select "Other"

**Root Directory:** Leave as `.` (project root)

**Build Command:** Leave empty (not needed)

**Output Directory:** Leave empty

**Install Command:** `npm install`

**Environment Variables:** None needed

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for deployment
3. Done! You'll get a URL like: `https://document-text-replacer.vercel.app`

---

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to login with GitHub.

### Step 3: Deploy

```bash
# Navigate to project
cd c:\Users\aksha\Downloads\converter

# Deploy to Vercel
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- What's your project's name? `document-text-replacer`
- In which directory is your code located? **./`**
- Want to override settings? **N**

### Step 4: Production Deployment

```bash
vercel --prod
```

---

## After Deployment

### Your Application URL

After deployment, you'll get:
- **Production URL:** `https://document-text-replacer.vercel.app`
- **Preview URLs:** Unique URL for each Git commit
- **Custom Domain:** Can be added in Vercel dashboard

### Access Your App

Open the URL in browser - it's live globally!

---

## Automatic Deployments

Once connected to GitHub:

1. **Every push to `main`** → Automatic production deployment
2. **Every push to other branches** → Preview deployment
3. **Every pull request** → Preview deployment

**No manual deployment needed after setup!**

---

## Important Notes for Vercel

### ⚠️ File Upload Limitations

**Vercel has a 4.5MB body size limit** for serverless functions.

**What this means:**
- Documents up to ~4MB will work
- Larger files will fail with error

**Solutions if needed:**
1. Use Vercel Blob Storage (requires upgrade)
2. Use external storage (AWS S3, Cloudinary)
3. Deploy to traditional server (Railway, Render, DigitalOcean)

### Temporary Storage

Vercel's serverless functions have **ephemeral file systems**:
- Files in `/tmp` are deleted after request
- Our app already cleans up files automatically
- This is already handled in the code ✅

---

## Configuration Files Explained

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

This tells Vercel:
- Use Node.js runtime
- Route all requests to server.js
- Deploy as serverless function

### Updated server.js

The code now works both locally AND on Vercel:
```javascript
// Local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, ...);
}

// Vercel (serverless)
module.exports = app;
```

---

## Vercel Dashboard Features

After deployment, in your Vercel dashboard you can:

### Deployments
- View all deployments
- Rollback to previous versions
- Preview deployments before production

### Domains
- Add custom domain (free)
- Automatic HTTPS
- DNS configuration

### Environment Variables
- Add secrets
- Different values for production/preview

### Logs
- View function logs
- Monitor errors
- Debug issues

### Analytics
- Page views
- Performance metrics
- Web Vitals

---

## Custom Domain Setup

### Step 1: Add Domain in Vercel

1. Go to project → **Settings** → **Domains**
2. Enter your domain: `yourdomain.com`
3. Click **Add**

### Step 2: Configure DNS

Add these records to your domain DNS:

**For root domain (yourdomain.com):**
```
A     @     76.76.21.21
```

**For www subdomain:**
```
CNAME www   cname.vercel-dns.com
```

### Step 3: Wait for Verification

- DNS propagation: 5 minutes to 48 hours
- HTTPS certificate: Automatic after verification

---

## Environment Variables (If Needed)

If you want to add environment variables:

### Via Dashboard:
1. Project → **Settings** → **Environment Variables**
2. Add key-value pairs
3. Select environments (Production/Preview/Development)

### Via CLI:
```bash
vercel env add SECRET_NAME
```

---

## Updating Your Deployment

### Automatic (Recommended)
Just push to GitHub:
```bash
git add .
git commit -m "Update feature"
git push
```

Vercel will automatically deploy!

### Manual
```bash
vercel --prod
```

---

## Monitoring & Debugging

### View Logs
```bash
vercel logs
```

### Check Deployment Status
```bash
vercel ls
```

### Open in Browser
```bash
vercel open
```

---

## Cost & Limits (Free Tier)

### Hobby Plan (Free)
- ✅ Unlimited projects
- ✅ Unlimited deployments  
- ✅ 100GB bandwidth/month
- ✅ Serverless function executions: 100GB-hours
- ✅ 1000 source images (image optimization)
- ⚠️ 4.5MB request body limit
- ⚠️ 10 second max function duration

### When to Upgrade
- More than 100GB bandwidth
- Need longer function execution time
- Need larger file uploads
- Commercial/business use

---

## Alternatives to Vercel

If file size limits are an issue:

### Railway.app
- Docker-based deployment
- No file size limits
- $5/month minimum

### Render.com
- Free tier available
- Traditional server
- No file size limits

### Heroku
- Free tier (with limitations)
- Traditional server
- No file size limits

### DigitalOcean App Platform
- $5/month minimum
- Full control
- No limits

---

## Testing Before Production

### Test Locally
```bash
npm start
# Test at http://localhost:3000
```

### Test on Vercel Preview
- Push to a branch (not main)
- Get preview URL
- Test functionality
- Merge to main when ready

---

## Rollback Deployment

If something goes wrong:

1. Go to **Deployments** in dashboard
2. Find previous working deployment
3. Click **"..."** → **"Promote to Production"**
4. Instant rollback!

---

## Vercel CLI Commands Reference

```bash
# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployments
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm deployment-url

# Open in browser
vercel open

# Check project info
vercel inspect

# Pull environment variables
vercel env pull

# Link local project
vercel link
```

---

## Security Best Practices

### Don't Commit Secrets
- Use environment variables
- Never commit API keys
- Use `.env` file locally
- Add secrets via Vercel dashboard

### Rate Limiting (If Needed)
Consider adding rate limiting for production:
```bash
npm install express-rate-limit
```

---

## Success Checklist

- [ ] Vercel account created
- [ ] Project connected to GitHub
- [ ] Deployed successfully
- [ ] URL accessible globally
- [ ] Upload and download working
- [ ] Multiple replacements working
- [ ] Mobile responsive working

---

## Getting Help

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Community:** [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Support:** support@vercel.com

---

## 🎉 Congratulations!

Your Document Text Replacer is now:
- ✅ **Live globally** with automatic HTTPS
- ✅ **Auto-deploying** from GitHub
- ✅ **Fast** with global CDN
- ✅ **Free** on Vercel's hobby plan
- ✅ **Professional** with custom domain option

Share your URL with anyone - they can use it instantly!

---

**Next Step:** Follow Method 1 (easiest) or Method 2 (CLI) above to deploy! 🚀

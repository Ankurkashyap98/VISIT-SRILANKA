# ⚡ Quick Vercel Deployment (15 Minutes)

## 🎯 For Shared Hosting Users Without SSH Access

### Step-by-Step Visual Guide

---

## ✅ Step 1: Prepare Your Local Environment (5 mins)

### 1.1 Test Your Build Locally
```bash
# Make sure you're in the project directory
cd E:\manish\srilanka-presentation\visitsrilanka

# Install dependencies (if not already done)
npm install

# Test the build
npm run build
```

**✅ Success?** You should see:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
...
```

### 1.2 Prepare Environment Variables
Create a file called `.env.production` with:

```env
# Database Connection (You'll need a cloud database - see Database Setup below)
DATABASE_URL="mysql://username:password@host:3306/srilanka_tourism"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="https://your-app-name.vercel.app"

# Production Environment
NODE_ENV="production"

# Optional: Unsplash API
UNSPLASH_ACCESS_KEY="your-unsplash-key"
```

**Generate NEXTAUTH_SECRET:**
```bash
# Run this in your terminal to generate a secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and use it as your `NEXTAUTH_SECRET`.

---

## ✅ Step 2: Setup GitHub (5 mins)

### 2.1 Create GitHub Account (if needed)
- Go to: https://github.com/signup
- Create free account

### 2.2 Create New Repository
1. Go to: https://github.com/new
2. **Repository name:** `visitsrilanka`
3. **Visibility:** Private (to keep your code secure)
4. **Don't** check any boxes (no README, no .gitignore)
5. Click **"Create repository"**

### 2.3 Push Your Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit with a message
git commit -m "Initial commit for Vercel deployment"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/visitsrilanka.git

# Push to GitHub
git push -u origin main
```

**If git asks for credentials:**
- Username: Your GitHub username
- Password: Use a Personal Access Token (not your password)
  - Generate token at: https://github.com/settings/tokens
  - Select: `repo` scope
  - Copy and use as password

**✅ Success?** Check https://github.com/YOUR_USERNAME/visitsrilanka - you should see your code!

---

## ✅ Step 3: Deploy on Vercel (5 mins)

### 3.1 Sign Up on Vercel
1. Go to: https://vercel.com/signup
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your repositories
4. ✅ Account created!

### 3.2 Import Your Project
1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. Click **"Import Git Repository"**
3. Find and select your `visitsrilanka` repository
4. Click **"Import"**

### 3.3 Configure Project
**Vercel will auto-detect Next.js settings:**
- Framework Preset: **Next.js** ✅
- Root Directory: `./` ✅
- Build Command: `npm run build` ✅
- Output Directory: `.next` ✅

**✅ These are all correct - don't change them!**

### 3.4 Add Environment Variables
Click **"Environment Variables"** section and add:

| Name | Value |
|------|-------|
| `DATABASE_URL` | Your cloud database URL (see Step 4) |
| `NEXTAUTH_SECRET` | The secret you generated earlier |
| `NEXTAUTH_URL` | `https://visitsrilanka.vercel.app` (or your chosen name) |
| `NODE_ENV` | `production` |

**💡 Tip:** You can add these now or after first deployment.

### 3.5 Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes ⏳
3. ✅ **Your app is live!**

You'll get a URL like: `https://visitsrilanka-abc123.vercel.app`

---

## ✅ Step 4: Setup Cloud Database (10 mins)

Your app needs a database. Since you can't use localhost on Vercel, use a cloud database:

### Option A: PlanetScale (Recommended - Free)

#### 4.1 Sign Up
1. Go to: https://auth.planetscale.com/sign-up
2. Sign up with GitHub
3. ✅ Account created!

#### 4.2 Create Database
1. Click **"Create a database"**
2. **Name:** `srilanka-tourism`
3. **Region:** Choose closest to your users (e.g., AWS ap-south-1 for Asia)
4. **Plan:** Hobby (Free - 5GB)
5. Click **"Create database"**

#### 4.3 Get Connection String
1. In your database dashboard, click **"Connect"**
2. **Connect with:** Prisma
3. Copy the connection string that looks like:
   ```
   mysql://xxxxx:pscale_pw_xxxxx@aws.connect.psdb.cloud/srilanka-tourism?sslaccept=strict
   ```

#### 4.4 Add to Vercel
1. Go to your Vercel project
2. Go to **Settings** → **Environment Variables**
3. Add/Update:
   - **Name:** `DATABASE_URL`
   - **Value:** [paste the PlanetScale connection string]
4. Click **"Save"**

#### 4.5 Setup Database Schema
```bash
# In your local terminal
# Update your .env.local with PlanetScale URL
DATABASE_URL="mysql://xxxxx:pscale_pw_xxxxx@aws.connect.psdb.cloud/srilanka-tourism?sslaccept=strict"

# Push schema to database
npx prisma db push

# Seed with initial data
npx prisma db seed
```

#### 4.6 Redeploy on Vercel
1. Go to your Vercel project
2. Go to **Deployments** tab
3. Click **"..."** on latest deployment
4. Click **"Redeploy"**
5. ✅ App now connected to database!

---

### Option B: Use Your Shared Hosting MySQL Database

If your shared hosting provides MySQL database with external access:

#### 4.1 Create Database in cPanel
1. Log into your cPanel
2. Go to **"MySQL Databases"**
3. Create database: `srilanka_tourism`
4. Create user with password
5. Add user to database with **ALL PRIVILEGES**

#### 4.2 Allow External Connections
1. In cPanel, go to **"Remote MySQL"**
2. Add host: `%` (to allow all, or specific IP)
3. Save

#### 4.3 Get Connection Details
Your DATABASE_URL will be:
```
mysql://db_user:db_password@your-shared-host.com:3306/db_srilanka_tourism
```

Replace:
- `db_user` - Your MySQL username from cPanel
- `db_password` - Your MySQL password
- `your-shared-host.com` - Your hosting server address
- `db_srilanka_tourism` - Your database name (usually prefixed by cPanel)

#### 4.4 Test Connection Locally
```bash
# Update .env.local
DATABASE_URL="mysql://db_user:db_password@your-shared-host.com:3306/db_srilanka_tourism"

# Test connection
npx prisma db push

# If successful, seed data
npx prisma db seed
```

#### 4.5 Add to Vercel
Same as PlanetScale step 4.4 above.

---

## 🎉 You're Done!

Your Sri Lanka Tourism App is now live at:
**`https://visitsrilanka-xyz.vercel.app`**

---

## 🚀 Next Steps

### Add Custom Domain (Optional - Free)
1. Buy a domain (e.g., from Namecheap, GoDaddy)
2. In Vercel, go to **Settings** → **Domains**
3. Add your domain: `visitsrilanka.com`
4. Follow DNS instructions
5. ✅ Free SSL included automatically!

### Automatic Deployments
**Every time you push to GitHub, Vercel auto-deploys! 🎉**

```bash
# Make changes to your code
# Then:
git add .
git commit -m "Updated homepage"
git push

# Vercel automatically deploys in 2-3 minutes!
```

### Monitor Your App
1. **Analytics:** Vercel dashboard shows visitor stats
2. **Logs:** View deployment logs in Vercel
3. **Performance:** See loading times and metrics

---

## 📊 Deployment Summary

| Task | Time | Status |
|------|------|--------|
| Local build test | 5 mins | ✅ |
| GitHub setup | 5 mins | ✅ |
| Vercel deployment | 5 mins | ✅ |
| Database setup | 10 mins | ✅ |
| **Total** | **25 mins** | **🎉 LIVE!** |

---

## 🆘 Troubleshooting

### Issue 1: Build Failed on Vercel
**Symptoms:** Red error in Vercel deployment
**Solutions:**
1. Check build logs in Vercel
2. Ensure `npm run build` works locally
3. Check all dependencies are in `package.json`
4. Verify environment variables are set

### Issue 2: Database Connection Error
**Symptoms:** "Can't connect to database" error
**Solutions:**
1. Verify DATABASE_URL is correct in Vercel
2. Check database allows external connections
3. Test connection locally with same URL
4. Ensure SSL is configured (`?sslaccept=strict` for PlanetScale)

### Issue 3: Environment Variables Not Working
**Symptoms:** App works locally but not on Vercel
**Solutions:**
1. Add variables in Vercel dashboard
2. Redeploy after adding variables
3. Check variable names match exactly (case-sensitive)

### Issue 4: Images Not Loading
**Symptoms:** Broken image icons
**Solutions:**
1. Verify `public/` folder is in GitHub
2. Check image paths are correct
3. Use Next.js `<Image>` component
4. Check Vercel logs for 404 errors

### Issue 5: Authentication Not Working
**Symptoms:** Can't login, NextAuth errors
**Solutions:**
1. Verify `NEXTAUTH_SECRET` is set
2. Update `NEXTAUTH_URL` to your Vercel URL
3. Redeploy after setting variables
4. Check database has User table

---

## 💰 Cost Breakdown

| Service | Plan | Cost |
|---------|------|------|
| **Vercel Hosting** | Hobby | **FREE** |
| **PlanetScale Database** | Hobby (5GB) | **FREE** |
| **GitHub Repository** | Public/Private | **FREE** |
| **SSL Certificate** | Included | **FREE** |
| **Custom Domain** | Optional | $10-15/year |
| **Total** | | **$0/month** 🎉 |

**Free tier includes:**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ 100 serverless function executions/hour
- ✅ Automatic scaling
- ✅ Global CDN

---

## 📈 Upgrade Options (If Needed Later)

**If you outgrow free tier:**

### Vercel Pro: $20/month
- Unlimited bandwidth
- Team collaboration
- Advanced analytics
- Commercial use

### PlanetScale Scale: $29/month
- 10GB database
- More connections
- Production branches

**But for most projects, free tier is sufficient! 🎉**

---

## 🎯 Summary

**What You Achieved:**
- ✅ Deployed Next.js app without SSH/root access
- ✅ No server management needed
- ✅ Automatic deployments on code changes
- ✅ Free hosting + database
- ✅ Professional SSL certificate
- ✅ Global CDN for fast loading
- ✅ Scalable infrastructure

**Total Time:** ~25 minutes
**Total Cost:** $0/month

**Your app is now live and accessible worldwide! 🌍**

---

## 📞 Support

**Need help?**
- **Vercel Discord:** https://vercel.com/discord
- **Vercel Docs:** https://vercel.com/docs
- **PlanetScale Docs:** https://planetscale.com/docs
- **Next.js Docs:** https://nextjs.org/docs

**Happy Deploying! 🚀**


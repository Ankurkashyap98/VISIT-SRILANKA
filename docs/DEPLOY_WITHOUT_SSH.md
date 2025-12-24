# 🚀 Deploy Without SSH Access - Quick Guide

## Your Situation
- ❌ No SSH/Putty access
- ❌ No root access
- ❌ Can't run terminal commands on server
- ✅ Need to deploy Next.js app

---

## ✅ SOLUTION: Deploy to Vercel (FREE)

**Time:** 15-25 minutes  
**Cost:** $0/month  
**Difficulty:** ⭐ Easy

---

## 📋 What You'll Need

1. ✅ GitHub account (free) - https://github.com/signup
2. ✅ Vercel account (free) - https://vercel.com/signup
3. ✅ Cloud database (free) - https://planetscale.com/signup
4. ✅ Your code (already have it!)

---

## 🎯 5-Step Deployment

### **Step 1: Test Locally (5 mins)**

```bash
cd E:\manish\srilanka-presentation\visitsrilanka
npm install
npm run build

# If successful, continue!
```

### **Step 2: Push to GitHub (5 mins)**

```bash
# Generate NEXTAUTH_SECRET first
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
# Copy the output - you'll need it later!

# Initialize Git
git init
git add .
git commit -m "Deploy to Vercel"

# Create repository at: https://github.com/new
# Then:
git remote add origin https://github.com/YOUR_USERNAME/visitsrilanka.git
git push -u origin main
```

**If prompted for password:** Use Personal Access Token from https://github.com/settings/tokens

### **Step 3: Deploy to Vercel (5 mins)**

1. Go to: https://vercel.com/signup
2. Click **"Continue with GitHub"**
3. Click **"Add New Project"**
4. Select your `visitsrilanka` repository
5. Click **"Import"**
6. Click **"Deploy"** (takes 2-3 minutes)

✅ **Your app is now live!** (but needs database)

### **Step 4: Setup Database (10 mins)**

#### Create Database:
1. Go to: https://planetscale.com/signup
2. Sign up with GitHub
3. Click **"Create database"**
   - Name: `srilanka-tourism`
   - Region: Choose closest to your users
   - Plan: Hobby (FREE)
4. Click **"Connect"**
5. Select **"Prisma"**
6. Copy the connection string

#### Setup Schema:
```bash
# On your local computer
# Create .env.local
DATABASE_URL="[paste PlanetScale connection string here]"

# Push schema to PlanetScale
npx prisma db push

# Seed with data
npx prisma db seed
```

### **Step 5: Connect Database to Vercel (5 mins)**

1. Go to your Vercel project
2. Click **"Settings"** → **"Environment Variables"**
3. Add these variables:

   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | [Your PlanetScale connection string] |
   | `NEXTAUTH_SECRET` | [The secret you generated in Step 2] |
   | `NEXTAUTH_URL` | `https://your-app.vercel.app` |
   | `NODE_ENV` | `production` |

4. Click **"Deployments"** tab
5. Click **"..."** on latest deployment → **"Redeploy"**

✅ **Done! Your app is fully functional!**

---

## 🎉 Result

**Your app is live at:** `https://visitsrilanka-xyz.vercel.app`

### What You Got:
- ✅ Production website
- ✅ Free SSL certificate
- ✅ Global CDN (fast worldwide)
- ✅ Automatic deployments
- ✅ Free database
- ✅ All features working

### To Update Your App:
```bash
# Make changes locally
git add .
git commit -m "Updated feature"
git push

# Vercel auto-deploys in 2-3 minutes! 🎉
```

---

## 🆘 Troubleshooting

### Build Failed
**Check:** Build logs in Vercel dashboard  
**Fix:** Ensure `npm run build` works locally

### Database Connection Error
**Check:** DATABASE_URL is correct in Vercel  
**Fix:** Verify connection string from PlanetScale

### Environment Variables Not Working
**Check:** Variables are saved in Vercel  
**Fix:** Redeploy after adding/changing variables

### Images Not Loading
**Check:** `public/` folder is in GitHub repository  
**Fix:** Ensure all images are committed and pushed

---

## 📞 Detailed Guides

If you need more details, check:
- **[QUICK_VERCEL_DEPLOY.md](./QUICK_VERCEL_DEPLOY.md)** - Full step-by-step
- **[SHARED_HOSTING_DEPLOYMENT.md](./SHARED_HOSTING_DEPLOYMENT.md)** - All alternatives
- **[DEPLOYMENT_OPTIONS.md](./DEPLOYMENT_OPTIONS.md)** - Compare all options

---

## 💰 Cost Breakdown

| Service | Cost |
|---------|------|
| Vercel Hosting | **FREE** |
| PlanetScale Database | **FREE** |
| GitHub Repository | **FREE** |
| SSL Certificate | **FREE** |
| CDN | **FREE** |
| **Total** | **$0/month** |

**Free tier includes:**
- 100GB bandwidth
- Unlimited projects
- 5GB database
- Global deployment

---

## 🔗 Quick Links

| Service | Sign Up | Docs |
|---------|---------|------|
| **Vercel** | https://vercel.com/signup | https://vercel.com/docs |
| **PlanetScale** | https://planetscale.com/signup | https://planetscale.com/docs |
| **GitHub** | https://github.com/signup | https://docs.github.com |

---

## ✨ Bonus: Add Custom Domain

After deployment, add your own domain:

1. Buy domain from: Namecheap, GoDaddy, etc.
2. In Vercel, go to **Settings** → **Domains**
3. Add your domain: `visitsrilanka.com`
4. Follow DNS setup instructions
5. ✅ Free SSL automatically applied!

**Result:** `https://visitsrilanka.com` instead of `*.vercel.app`

---

## 📊 Deployment Checklist

- [ ] Code works locally (`npm run build`)
- [ ] Generated NEXTAUTH_SECRET
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Initial deployment successful
- [ ] PlanetScale database created
- [ ] Database schema pushed
- [ ] Database seeded with data
- [ ] Environment variables added to Vercel
- [ ] Redeployed with database connection
- [ ] Tested app functionality
- [ ] ✅ **LIVE AND WORKING!**

---

## 🎯 Summary

**Problem:** Can't deploy to shared hosting without SSH  
**Solution:** Deploy to Vercel (free cloud platform)  
**Time:** 15-25 minutes  
**Cost:** $0  
**Result:** Professional production deployment

**No server management needed!**

---

## 🚀 Start Now

1. **Open terminal** in your project directory
2. **Follow Step 1** above (Test Locally)
3. **Continue through Steps 2-5**
4. **Celebrate!** 🎉

**Your Sri Lanka Tourism app will be live worldwide in ~25 minutes!**

---

**Need help? See [QUICK_VERCEL_DEPLOY.md](./QUICK_VERCEL_DEPLOY.md) for detailed walkthrough with screenshots.**

**Good luck! 🇱🇰🌍**


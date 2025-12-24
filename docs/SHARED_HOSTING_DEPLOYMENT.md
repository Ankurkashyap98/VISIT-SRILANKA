# 🚀 Shared Hosting Deployment Guide (No SSH/Root Access)

## 🎯 Problem
You have a shared server with:
- ❌ No SSH/Putty access
- ❌ No root access
- ❌ Can't run command-line commands
- ✅ Need to deploy Next.js application

---

## ✅ Solution 1: Vercel Deployment (RECOMMENDED - 100% Free)

**Why Vercel?**
- ✅ Built specifically for Next.js
- ✅ Zero server configuration needed
- ✅ No SSH/command-line required
- ✅ Automatic deployments from GitHub
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ **100% FREE** for hobby/personal projects

### Step-by-Step Vercel Deployment:

#### **Step 1: Prepare Your Code**
1. Make sure your code is working locally:
   ```bash
   npm install
   npm run build
   npm start
   ```

2. Ensure you have these files ready:
   - ✅ `next.config.ts` (already configured)
   - ✅ `package.json` (already exists)
   - ✅ `.env.local` (for environment variables)

#### **Step 2: Push to GitHub**
1. Create a GitHub account (if you don't have one): https://github.com
2. Create a new repository: 
   - Go to https://github.com/new
   - Name it: `visitsrilanka`
   - Make it **Private** (to keep your code secure)
   - Don't initialize with README

3. Push your code to GitHub:
   ```bash
   # Initialize git (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit for deployment"
   
   # Add remote
   git remote add origin https://github.com/YOUR_USERNAME/visitsrilanka.git
   
   # Push to GitHub
   git push -u origin main
   ```

#### **Step 3: Deploy on Vercel**
1. **Sign up on Vercel:**
   - Go to https://vercel.com
   - Click "Sign Up"
   - Choose "Continue with GitHub"
   - Authorize Vercel to access your repositories

2. **Import Project:**
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose your `visitsrilanka` repository
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)

4. **Add Environment Variables:**
   Click "Environment Variables" and add:
   ```
   DATABASE_URL=mysql://user:password@your-db-host:3306/srilanka_tourism
   NEXTAUTH_SECRET=your-generated-secret-key
   NEXTAUTH_URL=https://your-vercel-url.vercel.app
   NODE_ENV=production
   ```

   **Note:** For DATABASE_URL:
   - You'll need a cloud database (see "Database Options" below)
   - Don't use `localhost` - it won't work on Vercel

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - ✅ **Done!** Your app is live!

#### **Step 4: Access Your Site**
- You'll get a URL like: `https://visitsrilanka-xyz.vercel.app`
- Every time you push to GitHub, Vercel auto-deploys! 🎉

### **Vercel Features:**
- ✅ Automatic HTTPS/SSL
- ✅ Custom domain support (free)
- ✅ Automatic deployments on git push
- ✅ Preview deployments for branches
- ✅ Built-in analytics
- ✅ Edge functions support
- ✅ Zero configuration needed

---

## ✅ Solution 2: Static Export (If No Database Needed)

If your app doesn't need server-side features (auth, API routes, database), you can export to static HTML and host anywhere.

### Step-by-Step Static Export:

#### **Step 1: Modify next.config.ts**
```typescript
const nextConfig: NextConfig = {
  // Change this:
  output: 'standalone',
  
  // To this:
  output: 'export',
  
  // Add this for static images:
  images: {
    unoptimized: true,
  },
};
```

#### **Step 2: Build Static Site**
```bash
npm run build
```

This creates an `out/` folder with pure HTML/CSS/JS files.

#### **Step 3: Upload via FTP**
1. Connect to your shared hosting via FTP (FileZilla, WinSCP, cPanel File Manager)
2. Upload the entire `out/` folder to your `public_html/` or `www/` directory
3. ✅ Done! Your site is live!

**⚠️ Limitations:**
- ❌ No API routes
- ❌ No server-side rendering
- ❌ No authentication (NextAuth)
- ❌ No database operations
- ✅ Only static pages

---

## ✅ Solution 3: cPanel Node.js Application Manager

If your shared hosting has cPanel with Node.js support:

### Check if Your Host Supports Node.js:
1. Log into cPanel
2. Look for **"Setup Node.js App"** or **"Node.js Selector"**
3. If found, follow these steps:

#### **Step 1: Create Node.js Application in cPanel**
1. Go to **"Setup Node.js App"**
2. Click **"Create Application"**
3. Configure:
   - **Node.js version:** 18.x or higher
   - **Application mode:** Production
   - **Application root:** `visitsrilanka`
   - **Application URL:** `yourdomain.com` or subdomain
   - **Application startup file:** `.next/standalone/server.js`
   - **Environment variables:** (Add DATABASE_URL, NEXTAUTH_SECRET, etc.)

#### **Step 2: Upload Files via FTP**
1. Connect via FTP or cPanel File Manager
2. Upload these 3 folders to your application root:
   ```
   /home/username/visitsrilanka/.next/standalone/
   /home/username/visitsrilanka/.next/static/
   /home/username/visitsrilanka/public/
   ```

#### **Step 3: Install Dependencies**
1. Some cPanel versions have "Run NPM Install" button - click it
2. If not, you may need to contact support or use web-based SSH (if available)

#### **Step 4: Start Application**
1. In "Setup Node.js App", click **"Start"** or **"Restart"**
2. Your app should now be running!

**⚠️ Requirements:**
- Shared host must support Node.js 18+
- cPanel with "Setup Node.js App" feature
- Sufficient resources (RAM, CPU)

---

## ✅ Solution 4: Netlify (Alternative to Vercel)

Similar to Vercel, but with different features:

### Step-by-Step Netlify Deployment:

1. **Sign up:** https://netlify.com
2. **Connect GitHub:** Link your repository
3. **Configure:**
   - Build command: `npm run build`
   - Publish directory: `.next`
4. **Add environment variables** in Netlify dashboard
5. **Deploy!**

**Note:** Netlify works best with static exports. For full Next.js features, Vercel is better.

---

## ✅ Solution 5: Railway / Render / Heroku (Cloud Platforms)

These platforms offer free tiers and don't require server access:

### **Railway.app:**
1. Sign up: https://railway.app
2. Create new project from GitHub repo
3. Add environment variables
4. Deploy automatically
5. Free tier: $5/month credit

### **Render.com:**
1. Sign up: https://render.com
2. Create "Web Service" from GitHub
3. Configure build command: `npm run build`
4. Start command: `node .next/standalone/server.js`
5. Free tier available (with limitations)

### **Heroku (Paid):**
1. Heroku removed free tier
2. Starts at $5/month

---

## 🗄️ Database Options (For Cloud Deployment)

Since you can't use localhost database on cloud platforms:

### **Option 1: PlanetScale (MySQL) - FREE Tier**
- ✅ Free 5GB database
- ✅ MySQL compatible
- ✅ Global edge network
- 🔗 https://planetscale.com

**Setup:**
1. Create account at PlanetScale
2. Create database: `srilanka_tourism`
3. Get connection string
4. Add to Vercel environment variables:
   ```
   DATABASE_URL=mysql://user:pass@host.connect.psdb.cloud/srilanka_tourism?sslaccept=strict
   ```

### **Option 2: Aiven MySQL - FREE Tier**
- ✅ Free 1GB database
- ✅ Full MySQL support
- 🔗 https://aiven.io

### **Option 3: Your Existing Shared Host Database**
If your shared hosting provides MySQL database:
1. Create database in cPanel
2. Allow external connections (in cPanel -> Remote MySQL)
3. Use the connection string:
   ```
   DATABASE_URL=mysql://username:password@your-shared-host.com:3306/database_name
   ```

### **Option 4: AWS RDS MySQL - Paid**
- Production-grade
- Starts at ~$15/month
- 🔗 https://aws.amazon.com/rds/

---

## 📦 Pre-Deployment Preparation

### **1. Build Locally First**
```bash
# Test the build
npm run build

# Test the production build
node .next/standalone/server.js
```

### **2. Environment Variables Checklist**
Create a `.env.production` file with:
```env
# Database (use cloud database URL)
DATABASE_URL="mysql://user:password@cloud-host/database"

# NextAuth
NEXTAUTH_SECRET="generate-using-openssl-rand-base64-32"
NEXTAUTH_URL="https://your-domain.vercel.app"

# Node Environment
NODE_ENV="production"

# Optional: Unsplash API
UNSPLASH_ACCESS_KEY="your-key"
```

### **3. Generate Secure Secret**
Since you can't run commands on server, generate locally:

**Option A: Use Online Generator**
- Go to: https://generate-secret.vercel.app/32
- Copy the generated secret

**Option B: Use Node.js locally**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### **4. Setup Database**
```bash
# Run locally before deploying
npx prisma db push

# Seed data
npx prisma db seed
```

---

## 🎯 Recommended Solution Summary

| Solution | Best For | Cost | Difficulty | SSH Required |
|----------|----------|------|------------|--------------|
| **Vercel** | Production apps | Free | ⭐ Easy | ❌ No |
| Static Export | Simple sites | Free | ⭐⭐ Moderate | ❌ No |
| cPanel Node.js | Existing shared host | Host dependent | ⭐⭐⭐ Hard | ❌ No |
| Railway | Full-stack apps | $5/month | ⭐⭐ Moderate | ❌ No |
| Render | Full-stack apps | Free (limited) | ⭐⭐ Moderate | ❌ No |

---

## ✨ Final Recommendation

### **For Your Sri Lanka Tourism App:**

**🥇 Best Option: Vercel + PlanetScale**
- ✅ Free hosting on Vercel
- ✅ Free database on PlanetScale
- ✅ No SSH/root access needed
- ✅ Automatic deployments
- ✅ Professional URL
- ✅ SSL included
- ✅ Fast global CDN

**Total Cost: $0/month** 🎉

### **Deployment Time:**
- ⏱️ Setup: 15-20 minutes
- 🚀 Each deployment: 2-3 minutes (automatic)

---

## 🆘 Need Help?

### **Common Issues:**

#### Issue: "Module not found" on Vercel
**Solution:** Ensure all dependencies are in `package.json` dependencies (not devDependencies)

#### Issue: Database connection failed
**Solution:** 
1. Check DATABASE_URL is correct
2. Ensure database allows external connections
3. Use cloud database instead of localhost

#### Issue: Environment variables not working
**Solution:**
1. Add them in Vercel dashboard (Settings → Environment Variables)
2. Redeploy after adding variables

#### Issue: Images not loading
**Solution:**
1. Check `public/` folder is in repository
2. Use Next.js `<Image>` component
3. Set `images.unoptimized: true` for static export

---

## 📚 Additional Resources

- **Vercel Documentation:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **PlanetScale Docs:** https://planetscale.com/docs
- **Railway Docs:** https://docs.railway.app
- **Render Docs:** https://render.com/docs

---

## ✅ Quick Start (Vercel Deployment)

1. **Push code to GitHub** (5 minutes)
2. **Sign up on Vercel with GitHub** (2 minutes)
3. **Import repository** (1 minute)
4. **Add environment variables** (3 minutes)
5. **Deploy** (3 minutes)
6. **✅ Live on the internet!** (Total: ~15 minutes)

**Your app will be at:** `https://visitsrilanka-[random].vercel.app`

You can then:
- Add custom domain (free)
- Auto-deploy on every git push
- Monitor with built-in analytics
- Scale automatically

---

## 🎉 Ready to Deploy!

**No SSH? No Problem!** 🚀

Choose Vercel and deploy your Sri Lanka Tourism app to the cloud in minutes, not hours.


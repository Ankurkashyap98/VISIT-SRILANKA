# 🚀 Deployment Options - Choose Your Path

## Quick Decision Guide

**Answer these questions to find your best deployment option:**

1. **Do you have SSH/root access to your server?**
   - ❌ No → [Option A: Vercel (Free)](#option-a-vercel-free--easiest)
   - ✅ Yes → [Option C: VPS/Dedicated Server](#option-c-vpsded dedicated-server)

2. **Does your shared hosting have cPanel with Node.js support?**
   - ✅ Yes → [Option B: cPanel Deployment](#option-b-cpanel-shared-hosting)
   - ❌ No → [Option A: Vercel (Free)](#option-a-vercel-free--easiest)

3. **Do you need server-side features (auth, API, database)?**
   - ❌ No → [Option D: Static Export](#option-d-static-export)
   - ✅ Yes → Continue to Option A or C

---

## 📊 Comparison Table

| Feature | Vercel | cPanel | VPS/Server | Static Export |
|---------|--------|--------|------------|---------------|
| **SSH Required** | ❌ No | ❌ No | ✅ Yes | ❌ No |
| **Cost** | 💰 Free | 💰💰 Host fee | 💰💰💰 $5-50/mo | 💰 Free |
| **Setup Time** | ⏱️ 15 mins | ⏱️⏱️ 30 mins | ⏱️⏱️⏱️ 1-2 hours | ⏱️ 10 mins |
| **Difficulty** | ⭐ Easy | ⭐⭐ Moderate | ⭐⭐⭐ Advanced | ⭐ Easy |
| **Server-side Features** | ✅ Full | ✅ Full | ✅ Full | ❌ Static only |
| **Auto-deploy** | ✅ Yes | ❌ No | ⚠️ Setup needed | ❌ No |
| **SSL Certificate** | ✅ Free auto | ⚠️ Host dependent | ⚠️ Manual setup | ✅ Free auto |
| **Scaling** | ✅ Automatic | ❌ Limited | ⚠️ Manual | ✅ CDN |
| **Custom Domain** | ✅ Free | ✅ Yes | ✅ Yes | ✅ Yes |
| **Database** | 🔌 Cloud only | 🔌 Included | 🔌 Self-hosted | ❌ Not supported |
| **Best For** | Production | Budget hosting | Full control | Landing pages |

---

## Option A: Vercel (Free & Easiest)

### ✅ Best For:
- ✅ **Shared hosting without SSH access** ← YOUR SITUATION
- ✅ Quick production deployment
- ✅ Zero server management
- ✅ Automatic deployments

### 💰 Cost:
- **FREE** for hobby projects
- Includes: SSL, CDN, unlimited deployments
- 100GB bandwidth/month

### ⏱️ Setup Time:
**15-25 minutes**

### 📖 Guide:
👉 **[QUICK_VERCEL_DEPLOY.md](./QUICK_VERCEL_DEPLOY.md)** ← Start Here!

### 🎯 Steps Overview:
1. Push code to GitHub (5 mins)
2. Connect GitHub to Vercel (2 mins)
3. Import project (1 min)
4. Add environment variables (3 mins)
5. Deploy! (3 mins)
6. Setup cloud database (10 mins)

### ✨ What You Get:
- ✅ Live URL: `https://visitsrilanka.vercel.app`
- ✅ Free SSL certificate
- ✅ Global CDN (fast worldwide)
- ✅ Automatic deployments on git push
- ✅ Preview deployments for testing
- ✅ Built-in analytics

### 💾 Database Options:
- **PlanetScale** - Free 5GB MySQL
- **Your shared hosting MySQL** - If external access allowed

### 📱 After Deployment:
```bash
# Make changes locally
git add .
git commit -m "Updated feature"
git push

# Vercel auto-deploys in 2-3 minutes! 🎉
```

---

## Option B: cPanel Shared Hosting

### ✅ Best For:
- Already have shared hosting with cPanel
- cPanel has "Setup Node.js App" feature
- Want to use existing hosting

### 💰 Cost:
- Your existing hosting fee
- Usually $5-15/month

### ⏱️ Setup Time:
**30-45 minutes**

### 📖 Guide:
👉 **[SHARED_HOSTING_DEPLOYMENT.md](./SHARED_HOSTING_DEPLOYMENT.md#option-3-cpanel-nodejs-application-manager)**

### 🎯 Requirements:
- ✅ cPanel with "Setup Node.js App" or "Node.js Selector"
- ✅ Node.js 18+ support
- ✅ Sufficient resources (RAM, CPU)
- ✅ FTP/File Manager access

### 🎯 Steps Overview:
1. Build project locally
2. Upload 3 folders via FTP:
   - `.next/standalone/`
   - `.next/static/`
   - `public/`
3. Create Node.js app in cPanel
4. Configure startup file: `.next/standalone/server.js`
5. Add environment variables in cPanel
6. Start application

### ⚠️ Limitations:
- Manual redeployment needed for updates
- Resource limits may apply
- No automatic SSL (depends on host)
- May have performance limitations

### 💾 Database:
- Use cPanel MySQL (included)
- Create database in cPanel
- Allow external connections if needed

---

## Option C: VPS/Dedicated Server

### ✅ Best For:
- Full control needed
- High traffic expected
- Custom configurations
- Enterprise deployment

### 💰 Cost:
- VPS: $5-50/month (DigitalOcean, AWS, etc.)
- Dedicated: $50-200/month

### ⏱️ Setup Time:
**1-2 hours** (initial setup)

### 📖 Guide:
👉 **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#option-1-standalone-build-recommended-for-vpsserver)**

### 🎯 Requirements:
- ✅ SSH access
- ✅ Root/sudo access
- ✅ Linux knowledge
- ✅ Node.js 18+ installed

### 🎯 Steps Overview:
1. Setup server (Node.js, PM2, Nginx)
2. Upload build files
3. Configure PM2 process manager
4. Setup Nginx reverse proxy
5. Configure SSL with Let's Encrypt
6. Setup firewall

### ✨ What You Get:
- ✅ Full control over environment
- ✅ Custom configurations
- ✅ Can handle high traffic
- ✅ Multiple apps on same server
- ✅ Database on same server or cloud

### 📦 Upload Only These 3 Folders:
```
.next/standalone/  (app + dependencies)
.next/static/      (CSS, JS, assets)
public/           (images, icons)
```

### 🚀 Start Command:
```bash
cd /path/to/app/.next/standalone
pm2 start server.js --name srilanka-tourism
pm2 startup
pm2 save
```

### 🔧 Nginx Configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Option D: Static Export

### ✅ Best For:
- Landing pages
- Marketing sites
- Static content only
- Maximum compatibility

### 💰 Cost:
- **FREE** (Netlify, GitHub Pages, etc.)

### ⏱️ Setup Time:
**10-15 minutes**

### 📖 Guide:
👉 **[SHARED_HOSTING_DEPLOYMENT.md](./SHARED_HOSTING_DEPLOYMENT.md#solution-2-static-export-if-no-database-needed)**

### ⚠️ Limitations:
- ❌ **No API routes**
- ❌ **No authentication**
- ❌ **No database**
- ❌ **No server-side rendering**
- ❌ **No trip planner dynamic features**
- ✅ Only static pages

### 🎯 When to Use:
- Informational website only
- No user accounts needed
- No booking system needed
- Pure content display

### 🎯 Steps Overview:
1. Change `next.config.ts`:
   ```typescript
   output: 'export',
   images: { unoptimized: true },
   ```
2. Build: `npm run build`
3. Upload `out/` folder to any host
4. Done!

### 📦 Hosting Options:
- Netlify (free)
- GitHub Pages (free)
- Any web hosting via FTP

---

## 🎯 Recommendation Based on Your Situation

### **Your Situation:**
> "We have shared server and do not have root access so can't run command on Putty"

### **Best Solution:**
# 🏆 Option A: Vercel Deployment

### Why Vercel?
1. ✅ **No SSH/root access needed**
2. ✅ **No command-line on server needed**
3. ✅ **100% FREE for your use case**
4. ✅ **Professional hosting infrastructure**
5. ✅ **Automatic SSL + CDN**
6. ✅ **Easy to maintain & update**
7. ✅ **All features work (auth, booking, database)**

### 📖 Follow This Guide:
**[QUICK_VERCEL_DEPLOY.md](./QUICK_VERCEL_DEPLOY.md)**

---

## 📊 Decision Flow Chart

```
Do you have SSH access?
│
├─ NO ──────────────────────────────────┐
│                                       │
│   Does your host have cPanel          │
│   with Node.js support?               │
│   │                                   │
│   ├─ YES ──→ [Option B: cPanel]      │
│   │                                   │
│   └─ NO ───→ [Option A: Vercel] ✨   │← RECOMMENDED
│                                       │
│                                       │
└─ YES ─────────────────────────────────┘
            │
            │   Do you need full control?
            │   │
            │   ├─ YES ──→ [Option C: VPS]
            │   │
            │   └─ NO ───→ [Option A: Vercel] ✨
            │
            └── Also consider:
                [Option A: Vercel] for easier management
```

---

## 🔄 Migration Between Options

### From Static Export → Vercel:
1. Change config back to: `output: 'standalone'`
2. Follow Vercel deployment guide
3. Add environment variables
4. Deploy!

### From cPanel → Vercel:
1. Push code to GitHub
2. Follow Vercel deployment guide
3. Keep cPanel as backup

### From Vercel → VPS:
1. Setup VPS server
2. Download build from Vercel
3. Upload to VPS
4. Configure PM2 + Nginx

---

## 💡 Pro Tips

### For Vercel Deployment:
- ✅ Use preview deployments to test changes
- ✅ Connect custom domain after first deployment
- ✅ Use PlanetScale free tier for database
- ✅ Enable analytics in Vercel dashboard
- ✅ Set up deployment protection for production

### For cPanel Deployment:
- ⚠️ Test locally before uploading
- ⚠️ Keep backup of working deployment
- ⚠️ Monitor resource usage in cPanel
- ⚠️ Setup automated backups

### For VPS Deployment:
- ✅ Use PM2 for process management
- ✅ Setup monitoring (Uptime Kuma, etc.)
- ✅ Configure automatic backups
- ✅ Setup firewall (UFW)
- ✅ Use Let's Encrypt for free SSL
- ✅ Setup log rotation

---

## 📞 Need Help Choosing?

### Ask Yourself:

**"I want the easiest deployment with no server management"**
→ **[Option A: Vercel](./QUICK_VERCEL_DEPLOY.md)** ✨

**"I already pay for shared hosting and want to use it"**
→ **[Option B: cPanel](./SHARED_HOSTING_DEPLOYMENT.md)** (if supported)

**"I need full control and custom configurations"**
→ **[Option C: VPS](./DEPLOYMENT_GUIDE.md)**

**"I just need a simple website without backend features"**
→ **[Option D: Static Export](./SHARED_HOSTING_DEPLOYMENT.md)**

---

## 🎉 Ready to Deploy?

### For Your Situation (No SSH Access):

**Start Here:** 👉 **[QUICK_VERCEL_DEPLOY.md](./QUICK_VERCEL_DEPLOY.md)**

**Time to production:** 15-25 minutes
**Cost:** FREE
**Difficulty:** ⭐ Easy
**Result:** Professional, scalable, secure deployment

---

**Questions? Check the detailed guides above!**

**Good luck with your deployment! 🚀🇱🇰**


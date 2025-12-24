# Sri Lanka Tourism App - Production Deployment Guide

---

## ⚠️ **NO SSH ACCESS?** ⚠️

**If you have a shared server without root/SSH access:**

👉 **[DEPLOY_WITHOUT_SSH.md](./DEPLOY_WITHOUT_SSH.md)** - Quick 1-page guide  
👉 **[QUICK_VERCEL_DEPLOY.md](./QUICK_VERCEL_DEPLOY.md)** - Detailed walkthrough  
👉 **[DEPLOYMENT_OPTIONS.md](./DEPLOYMENT_OPTIONS.md)** - Compare all options

**Time:** 15-25 minutes | **Cost:** FREE | **No server commands needed!**

---

## 🚀 Quick Production Build (For VPS/Dedicated Servers)

### 1. Install Dependencies
```bash
npm install
```

### 2. Build for Production
```bash
npm run build
```

### 3. Start Production Server
**⚠️ IMPORTANT:** Since this project uses `output: 'standalone'` configuration, use:
```bash
node .next/standalone/server.js
```

**NOT:**
```bash
npm start  # ⚠️ This will show a warning!
```

## 📦 What Gets Built

After running `npm run build`, you get:
```
📁 .next/
   ├── standalone/        # ✅ Self-contained production build (50MB)
   │   ├── server.js      # Main server file
   │   ├── node_modules/  # Only production dependencies
   │   ├── .next/         # Compiled pages
   │   └── data/          # Your data files
   ├── static/            # ✅ Optimized static assets
   └── ...
📁 public/                # ✅ Public assets (images, icons)
```

## 🌐 Deployment Options

### **Option 1: Standalone Build (RECOMMENDED for VPS/Server)**

#### What to Upload:
Upload **ONLY** these 3 folders to your server:
```
📁 .next/standalone/   (complete app + dependencies)
📁 .next/static/       (CSS, JS, fonts)
📁 public/             (images, icons, manifest)
```

**Total size: ~50-100MB** (vs 500MB+ for full project)

#### Server Setup:
```bash
# 1. Upload the 3 folders to your server
# 2. Create .env file in standalone/ folder
# 3. Start the server

cd .next/standalone
node server.js
```

#### Production Start Command:
```bash
# On your server
PORT=3000 node .next/standalone/server.js
```

#### Process Manager (PM2):
```bash
# Install PM2
npm install -g pm2

# Start app
pm2 start .next/standalone/server.js --name "srilanka-tourism"

# Auto-restart on reboot
pm2 startup
pm2 save
```

### **Option 2: Vercel (Easiest - Fully Managed)**
1. Push code to GitHub repository
2. Connect to Vercel dashboard
3. Import project from GitHub
4. Configure environment variables
5. Deploy automatically (Vercel handles standalone build)

**Advantages:**
- Zero server management
- Automatic HTTPS
- Global CDN
- Automatic scaling
- Built-in monitoring

### **Option 3: Docker (Standalone Build)**
```dockerfile
FROM node:18-alpine AS base

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy standalone build
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public

EXPOSE 3000

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t srilanka-tourism .
docker run -p 3000:3000 srilanka-tourism
```

### **Option 4: Traditional VPS with Nginx**

#### 1. Upload Files
```bash
# Upload these folders to /var/www/srilanka-tourism/
.next/standalone/
.next/static/
public/
```

#### 2. Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

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

#### 3. Start with PM2
```bash
cd /var/www/srilanka-tourism/.next/standalone
pm2 start server.js --name srilanka-tourism
```

## 📦 Build Options

### Standard Build (Recommended)
```bash
npm run build
```
Output: `.next/standalone/` + `.next/static/` + optimized pages

### Turbopack Build (Faster Development)
```bash
npm run build:turbo
```
⚠️ Note: Turbopack is for development. Production still uses standard build.

### Mock API Build (For Testing)
```bash
npm run build:mock
```

## 🔧 Environment Variables

**For Standalone Build:** Create `.env` file in `.next/standalone/` folder:
**For Development/Full Build:** Create `.env.local` file in project root:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/srilanka_tourism"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl"
NEXTAUTH_URL="https://yourdomain.com"

# Unsplash API (optional - for dynamic images)
UNSPLASH_ACCESS_KEY="your-unsplash-key"

# Production settings
NODE_ENV="production"
PORT=3000
```

### Generate Secure Secret:
```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32
```

## 📊 Performance Optimizations

### Already Configured:
- ✅ Image optimization
- ✅ Bundle splitting
- ✅ Compression
- ✅ Caching headers
- ✅ TypeScript compilation
- ✅ ESLint validation

### Build Output:
- Static files in `.next/static/`
- Server files in `.next/server/`
- Standalone output ready for deployment

## 🔍 Build Analysis

To analyze bundle size:
```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Analyze build
npm run build
npm run analyze
```

## 🚨 Pre-Deployment Checklist

### Build & Files
- [ ] Run `npm run build` successfully
- [ ] Verify `.next/standalone/` folder exists
- [ ] Verify `.next/static/` folder exists
- [ ] Check `public/` folder has all images

### Environment & Configuration
- [ ] Environment variables configured (`.env` in standalone folder)
- [ ] Database connection string updated
- [ ] NEXTAUTH_SECRET generated (use `openssl rand -base64 32`)
- [ ] NEXTAUTH_URL set to production domain
- [ ] NODE_ENV set to "production"

### Server Setup
- [ ] Node.js 18+ installed on server
- [ ] Upload 3 folders: `standalone/`, `static/`, `public/`
- [ ] Test startup: `node .next/standalone/server.js`
- [ ] PM2 or process manager configured
- [ ] Firewall configured (port 3000 or custom)

### Web Server & Security
- [ ] Nginx/Apache reverse proxy configured
- [ ] SSL certificate installed
- [ ] Domain DNS configured
- [ ] HTTPS enforced (redirect HTTP to HTTPS)
- [ ] Security headers configured

### Database & APIs
- [ ] Database schema pushed (`npm run db:push`)
- [ ] Database seeded with initial data
- [ ] API endpoints tested
- [ ] Mock data vs real data verified

### Testing
- [ ] Homepage loads correctly
- [ ] Trip planner flow works (all 7 steps)
- [ ] Medical information saves correctly
- [ ] Booking system functional
- [ ] Admin dashboard accessible
- [ ] User authentication working
- [ ] Images loading correctly
- [ ] Mobile responsive testing

### Monitoring & Performance
- [ ] Error logging configured
- [ ] Performance monitoring setup
- [ ] Uptime monitoring enabled
- [ ] Analytics integrated (Google Analytics, etc.)
- [ ] Backup strategy configured

## 📈 Monitoring

### Production Monitoring:
- Error tracking (Sentry)
- Performance monitoring
- Uptime monitoring
- Analytics integration

## 🔐 Security

### Headers Configured:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin

### Additional Security:
- HTTPS enforced
- Secure cookies
- CSRF protection
- Rate limiting

## 📱 Mobile Optimization

- Responsive design ✅
- Touch-friendly UI ✅
- Fast loading ✅
- Offline support (PWA ready)

## 🌍 Internationalization

- Multi-language support ready
- Currency conversion
- Local date/time formats
- Regional preferences

## 📋 Quick Reference

### Local Testing (After Build):
```bash
# Build the app
npm run build

# Test standalone build locally
node .next/standalone/server.js

# Open browser to http://localhost:3000
```

### Server Deployment (3 Simple Steps):
```bash
# Step 1: Upload these 3 folders to your server
.next/standalone/
.next/static/
public/

# Step 2: Create .env file in .next/standalone/
DATABASE_URL="..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://yourdomain.com"
NODE_ENV="production"

# Step 3: Start the server
cd .next/standalone
node server.js
```

### With PM2 (Recommended):
```bash
# Install PM2 globally
npm install -g pm2

# Start app with PM2
pm2 start .next/standalone/server.js --name srilanka-tourism

# Enable auto-restart on server reboot
pm2 startup
pm2 save

# Monitor logs
pm2 logs srilanka-tourism

# Restart app
pm2 restart srilanka-tourism
```

### Troubleshooting:

#### Issue: "Cannot find module"
```bash
# Solution: Ensure all 3 folders are uploaded
- .next/standalone/
- .next/static/
- public/
```

#### Issue: Port already in use
```bash
# Solution: Use different port
PORT=8080 node .next/standalone/server.js
```

#### Issue: Images not loading
```bash
# Solution: Check public/ folder is in the correct location
# Should be at same level as .next/ folder
```

#### Issue: Database connection failed
```bash
# Solution: Verify DATABASE_URL in .env file
# Test connection: mysql -h host -u user -p database
```

---

## 🎉 **Ready for Production!**

Your Sri Lanka Tourism App with:
- ✅ **7-step Trip Planner** with medical information
- ✅ **AI Itinerary Generation** 
- ✅ **Complete Booking System**
- ✅ **Admin Dashboard**
- ✅ **Medical Tourism Features**
- ✅ **Multi-language Support**

**Deploy with confidence! 🚀**

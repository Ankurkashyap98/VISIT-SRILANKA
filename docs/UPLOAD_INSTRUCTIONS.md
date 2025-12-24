# 🚀 Upload Instructions for Hostinger Shared Hosting

## Target URL
**www.primewayz.com/srilankatourism**

---

## ✅ What to Upload

### Upload the **`dist/` folder contents** to your server

**Location on server:**
```
/public_html/srilankatourism/
```

---

## 📦 Step-by-Step Instructions

### Step 1: Build the Application (Already Done ✅)
```bash
npm run build
```
This creates the `dist/` folder with all production files.

### Step 2: Upload Files via cPanel File Manager

1. **Log in to Hostinger cPanel**
2. **Open File Manager**
3. **Navigate to `public_html`**
4. **Create folder**: `srilankatourism` (if it doesn't exist)
5. **Open the `srilankatourism` folder**
6. **Upload ALL contents** from your local `dist/` folder:
   - `index.html`
   - `assets/` folder (with all files inside)
   - `images/` folder (with all files inside)
   - All `.svg` files
   - `site.webmanifest`
   - Any other files in `dist/`

### Step 3: Upload .htaccess File

**IMPORTANT**: You need to add a `.htaccess` file in `public_html/srilankatourism/`:

1. In File Manager, navigate to `public_html/srilankatourism/`
2. Click "New File" and name it `.htaccess`
3. Paste this content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /srilankatourism/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /srilankatourism/index.html [L]
</IfModule>
```

4. Save the file

---

## 📁 Expected File Structure on Server

```
public_html/
└── srilankatourism/
    ├── .htaccess          ← ADD THIS FILE
    ├── index.html         ← Main HTML file
    ├── assets/
    │   ├── index-[hash].js
    │   ├── index-[hash].css
    │   └── index-[hash].js.map
    ├── images/
    │   ├── [all image files]
    │   └── ...
    ├── file.svg
    ├── globe.svg
    ├── next.svg
    ├── vercel.svg
    ├── window.svg
    └── site.webmanifest
```

---

## ✅ Configuration Already Applied

The following has been configured for subdirectory deployment:

1. ✅ **Vite base path**: Set to `/srilankatourism/` in `vite.config.ts`
2. ✅ **React Router basename**: Set to `/srilankatourism` in `src/main.tsx`

---

## 🔍 Verify Deployment

After uploading, visit:
- **www.primewayz.com/srilankatourism**

Check:
- [ ] Homepage loads correctly
- [ ] All images display
- [ ] Navigation works (try clicking menu items)
- [ ] Browser console shows no errors
- [ ] Routes work (try `/destinations`, `/about`, etc.)

---

## ⚠️ Important Notes

### API Server
Your Express API server (`server/index.js`) needs to be deployed separately:

**Options:**
1. **Deploy API to a Node.js hosting service** (Railway, Render, Heroku, etc.)
   - Update API URLs in your frontend code to point to the API server
   
2. **Or use PHP/other backend** on Hostinger if Node.js is not available

### If Assets Don't Load
- Make sure you uploaded ALL files from `dist/` folder
- Check that `base: '/srilankatourism/'` is in `vite.config.ts`
- Clear browser cache and try again

### If Routes Don't Work
- Verify `.htaccess` file exists and is correct
- Check that mod_rewrite is enabled on your server (usually is by default)
- Try accessing directly: `www.primewayz.com/srilankatourism/index.html`

---

## 📝 Quick Checklist

- [ ] Run `npm run build` (already done ✅)
- [ ] Open cPanel File Manager
- [ ] Navigate to `public_html`
- [ ] Create `srilankatourism` folder (if needed)
- [ ] Upload ALL contents from `dist/` folder
- [ ] Create and upload `.htaccess` file
- [ ] Test the website: www.primewayz.com/srilankatourism
- [ ] Verify all pages work correctly

---

## 🆘 Troubleshooting

**Problem**: 404 errors on routes
- **Solution**: Check `.htaccess` file is present and correct

**Problem**: Assets (CSS/JS) don't load
- **Solution**: Verify all files in `assets/` folder are uploaded

**Problem**: Images don't show
- **Solution**: Check `images/` folder is uploaded with all files

**Problem**: API calls fail
- **Solution**: API server needs to be deployed separately, or update API URLs

---

**Your application is ready to upload!** 🎉


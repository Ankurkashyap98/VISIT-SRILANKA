# Deployment Guide for Shared Hosting (Hostinger)

## Target URL
- **Production URL**: `www.primewayz.com/srilankatourism`

## Build Folder to Upload

### ✅ Upload the `dist/` folder contents

After building, upload **ALL contents** from the `dist/` folder to:
```
/public_html/srilankatourism/
```

**Note**: Upload the **contents** of the `dist/` folder, not the `dist/` folder itself.

## Steps to Deploy

### 1. Build the Application

```bash
npm run build
```

This will create/update the `dist/` folder with all production files.

### 2. Upload Files

Upload all files and folders from the `dist/` directory to your server:

**On Hostinger cPanel File Manager:**
1. Navigate to `public_html`
2. Create folder: `srilankatourism` (if it doesn't exist)
3. Upload all contents from your local `dist/` folder to `public_html/srilankatourism/`

**Via FTP:**
- Upload everything inside `dist/` to `/public_html/srilankatourism/`

### 3. Expected Structure on Server

```
public_html/
└── srilankatourism/
    ├── index.html
    ├── assets/
    │   ├── index-[hash].js
    │   ├── index-[hash].css
    │   └── ...
    ├── images/
    │   └── ...
    └── [other static files]
```

## API Server Configuration

### Option 1: Separate API Server (Recommended)

Since you have an Express API server (`server/index.js`), you have two options:

**A. Deploy API to a Node.js hosting service:**
- Deploy `server/index.js` to services like:
  - Railway
  - Render
  - Heroku
  - DigitalOcean App Platform
  - Or any Node.js hosting

**B. Set up API on Hostinger with Node.js:**
- If Hostinger supports Node.js:
  - Upload `server/` folder
  - Upload `data/` folder
  - Configure environment variables
  - Run the Node.js server

### Option 2: Update API URLs in Frontend

If you deploy the API separately, update the API base URL in your frontend code to point to your API server URL.

## Configuration Applied

✅ **Vite base path**: Set to `/srilankatourism/` in `vite.config.ts`

This ensures:
- All asset paths are correctly prefixed
- React Router will work correctly in the subdirectory
- All relative paths resolve correctly

## Verify Deployment

After uploading:

1. Visit: `www.primewayz.com/srilankatourism`
2. Check browser console for errors
3. Test navigation between pages
4. Verify images load correctly
5. Test API calls (if API is configured)

## Troubleshooting

### If assets don't load:
- Check that `base: '/srilankatourism/'` is set in `vite.config.ts`
- Rebuild: `npm run build`
- Re-upload the `dist/` folder contents

### If routes don't work:
- Ensure you have `.htaccess` configured for SPA routing (see below)

### If API calls fail:
- Check CORS settings in your API server
- Update API URLs to use absolute URLs
- Verify API server is running and accessible

## .htaccess Configuration

Create a `.htaccess` file in `public_html/srilankatourism/`:

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

This ensures React Router routes work correctly.

## Files to Upload

### From `dist/` folder (after build):
- ✅ `index.html`
- ✅ `assets/` folder (all contents)
- ✅ `images/` folder (all contents)
- ✅ All other files in `dist/`

### Do NOT upload:
- ❌ `dist/` folder itself
- ❌ `node_modules/`
- ❌ `src/` folder
- ❌ `server/` folder (unless setting up API on same server)
- ❌ Source files

## Quick Checklist

- [ ] Run `npm run build`
- [ ] Check `dist/` folder exists and has files
- [ ] Upload all `dist/` contents to `public_html/srilankatourism/`
- [ ] Create/upload `.htaccess` file for SPA routing
- [ ] Set up API server (separate or on same hosting)
- [ ] Test the deployed application
- [ ] Verify all routes work correctly


# Application Cleanup Report

## Analysis Date
2025-12-17

## Application Structure
- **Framework**: Vite + React (React Router)
- **Backend**: Express API Server
- **Entry Point**: `src/main.tsx`
- **Config**: `vite.config.ts`

## Files/Directories That Can Be Safely Removed

### 1. Next.js Specific Files (Unused)
These files are from the Next.js migration and are not used by the Vite application:

- ✅ `app/` directory - Entire Next.js App Router structure (87+ files)
- ✅ `middleware.ts` - Next.js middleware
- ✅ `next.config.ts` - Next.js configuration
- ✅ `next.config.dev.js` - Next.js dev configuration  
- ✅ `next.config.prod.js` - Next.js prod configuration
- ✅ `next-env.d.ts` - Next.js TypeScript definitions

**Reason**: The application uses Vite, not Next.js. All active code is in `src/` directory.

### 2. Root-Level Duplicate Directories
These directories contain Next.js versions of components that are duplicated in `src/`:

- ✅ `components/` - 54 files (Next.js versions using `next/link`, `next/image`, etc.)
- ✅ `context/` - 3 files (may be duplicates, but `src/context/` is used)
- ✅ `lib/` - 12 files (Next.js specific utilities)
- ✅ `hooks/` - 6 files (not imported by src codebase)
- ✅ `store/` - 1 file (not imported by src codebase)
- ✅ `stores/` - 3 files (not imported by src codebase)

**Reason**: The `src/` directory contains the active React Router versions. Root-level versions use Next.js APIs.

### 3. Test Connection Scripts (Root Level)
These appear to be one-time test scripts:

- ✅ `test-connection-multiple.js`
- ✅ `test-db-connection.js`
- ✅ `test-user-connection.js`

**Reason**: These are temporary test scripts, not part of the application.

### 4. Build Artifacts
- ✅ `deployment-package/` - Old build artifacts
- ✅ `tsconfig.tsbuildinfo` - TypeScript build cache (can be regenerated)

### 5. Package.json Cleanup
- ⚠️ `package.json` line 69: `"main": "next.config.dev.js"` - Should be removed or updated
- ⚠️ `package.json` lines 70-73: `directories` field references Next.js structure

## Files to Keep

### Essential Application Files
- ✅ `src/` - Active application code
- ✅ `server/` - Express API server
- ✅ `data/` - JSON data files (used by API)
- ✅ `public/` - Static assets
- ✅ `index.html` - Vite entry point
- ✅ `vite.config.ts` - Vite configuration
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `tailwind.config.js` - Tailwind CSS configuration
- ✅ `postcss.config.js` - PostCSS configuration
- ✅ `package.json` - Dependencies (needs minor cleanup)
- ✅ `package-lock.json` - Dependency lock file
- ✅ `eslint.config.mjs` - ESLint configuration
- ✅ `prisma/` - Database schema and seed
- ✅ `scripts/` - Test scripts (may want to keep for development)

### Documentation (Consider Consolidating)
- ✅ `README.md` - Main documentation
- ℹ️ All other `.md` files can be moved to `docs/` directory or removed if outdated

## Summary

**Total files/directories recommended for removal**: ~150+ files
- Next.js app directory: ~87 files
- Root-level duplicate directories: ~79 files  
- Config/test files: ~8 files
- Build artifacts: 1 directory + 1 file

## Sanity Test Checklist

After cleanup, verify:
- [ ] Application builds successfully (`npm run build`)
- [ ] Development server starts (`npm run dev`)
- [ ] API server starts (`npm run dev:server`)
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] API endpoints respond correctly
- [ ] No broken imports in console


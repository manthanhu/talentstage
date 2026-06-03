# Quick Fix: Missing Dependencies

## Error You're Seeing
```
Module not found: Can't resolve 'zustand'
```

## Fix (Choose One)

### ⚡ Fastest Fix (Windows)
```bash
.\install.bat
```
This batch file automatically runs npm install for you.

### 📦 Standard Fix (All Platforms)
```bash
npm install
```
Wait 1-2 minutes while it downloads ~500 MB of packages.

### 🧹 Complete Fresh Install
```bash
# Remove old files
rm -r node_modules
rm package-lock.json

# Fresh install
npm install
```

## Then Try Again
```bash
npm run dev
```
Your app should now start at http://localhost:3000

## What's Happening
- Your `package.json` lists dependencies (zustand, jest, etc.)
- But `node_modules` folder doesn't have them installed yet
- `npm install` downloads and installs everything from `package.json`
- Takes 1-2 minutes the first time

## Verification
```bash
# Confirm zustand is installed
npm list zustand

# Should show: zustand@4.4.0
```

## Need More Help?
See [FIX_DEPENDENCIES.md](./FIX_DEPENDENCIES.md) for detailed troubleshooting.

---

**TL;DR: Run `npm install` and wait 2 minutes** ✅

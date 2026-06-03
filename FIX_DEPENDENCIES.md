# Fix: Module Not Found - 'zustand'

## Problem
The build is failing because `zustand` dependency is not installed in `node_modules`.

```
Module not found: Can't resolve 'zustand'
```

## Cause
The `package-lock.json` is outdated and doesn't include the zustand package. We recently added it to `package.json`, but it wasn't installed.

## Solution (Choose One)

### Option 1: Run Install Batch File (Easiest for Windows)
```bash
# In the project directory, run:
.\install.bat
```

This will automatically:
- Navigate to the project directory
- Run `npm install` to install all dependencies
- Show a success message

### Option 2: Manual npm Install
Open Command Prompt or PowerShell in the project directory and run:

```bash
npm install
```

This will:
1. Read `package.json`
2. Install all missing dependencies (zustand, testing libraries, etc.)
3. Update `package-lock.json` with exact versions
4. Add ~500 MB to node_modules (takes 1-2 minutes)

### Option 3: Clean Install (If Option 2 fails)
```bash
# Delete old node_modules and package-lock
rm -r node_modules
rm package-lock.json

# Fresh install
npm install
```

## Verification

After installation completes, verify zustand is installed:

```bash
# Check if zustand exists
ls node_modules/zustand
# or on Windows:
dir node_modules\zustand
```

You should see zustand folder with:
```
node_modules/
└── zustand/
    ├── package.json
    ├── dist/
    ├── esm/
    └── ...
```

## Try the Build Again

Once installation is complete:

```bash
npm run build
```

Or start development:

```bash
npm run dev
# Opens at http://localhost:3000
```

## If You Still Get Errors

If you still see the error after installing:

1. **Clear Next.js cache:**
   ```bash
   rm -r .next
   npm run build
   ```

2. **Check if zustand is actually installed:**
   ```bash
   npm list zustand
   ```

3. **Try a clean install:**
   ```bash
   npm cache clean --force
   npm install
   ```

4. **Check npm version (should be 8+):**
   ```bash
   npm --version
   ```

5. **Check node version (should be 18+):**
   ```bash
   node --version
   ```

## What Was Added to package.json

Recent additions that need installation:
- `zustand@^4.4.0` - State management (MAIN DEPENDENCY)
- `@testing-library/jest-dom@^6.1.5` - Testing utilities
- `@testing-library/react@^14.1.2` - React testing
- `jest@^29.7.0` - Test runner
- `jest-environment-jsdom@^29.7.0` - DOM test environment
- `@types/jest@^29.5.11` - TypeScript types for Jest

## Why This Happened

The project was recently enhanced with:
1. Testing infrastructure (Jest, React Testing Library)
2. State management (Zustand)
3. Test scripts in package.json

All of these require `npm install` to download the packages.

## Next Steps

After dependencies are installed:

1. ✅ `npm run dev` - Start development server
2. ✅ `npm run build` - Build for production
3. ✅ `npm run test` - Run tests
4. ✅ Deploy to Vercel/Docker

---

**Still having issues?** Check TROUBLESHOOTING.md or see SETUP.md for more help.

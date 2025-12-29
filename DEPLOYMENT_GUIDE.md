# 🚀 Deployment Guide - EventMage

## Quick Deployment to GitHub Pages

### Step 1: Build the Project

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Step 2: Install gh-pages (if not already installed)

```bash
npm install --save-dev gh-pages
```

### Step 3: Update package.json

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Step 4: Update vite.config.ts

Make sure your `vite.config.ts` has the base path:

```typescript
export default defineConfig({
  base: './', // Use relative paths for GitHub Pages
  // ... rest of config
});
```

### Step 5: Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
1. Build your project
2. Create a `gh-pages` branch
3. Push the `dist` folder to GitHub
4. Make your site live at: `https://yourusername.github.io/eventmage-1`

### Step 6: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Select source: **gh-pages branch**
4. Your site will be live in a few minutes!

---

## Alternative: Deploy to Vercel (Recommended - Easier!)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **New Project**
4. Import your repository
5. Vercel auto-detects settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click **Deploy**

**That's it!** Your site will be live at: `https://your-project.vercel.app`

**Benefits**:
- ✅ Free HTTPS
- ✅ Auto-deploys on every push
- ✅ Custom domain support
- ✅ Fast CDN
- ✅ No configuration needed

---

## Alternative: Deploy to Netlify

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click **New site from Git**
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click **Deploy site**

Your site will be live at: `https://your-project.netlify.app`

---

## Fix Common Issues

### Issue 1: Routes not working after deployment

**Solution**: Add `_redirects` file in `public` folder:

```
/*    /index.html   200
```

Or update `vite.config.ts`:
```typescript
export default defineConfig({
  base: './',
  // ... rest
});
```

### Issue 2: Assets not loading

**Solution**: Make sure `vite.config.ts` has:
```typescript
base: './'
```

### Issue 3: 404 errors on refresh

**Solution**: This is normal for SPAs. The redirects file above fixes it.

---

## Environment Variables

If you need environment variables:

1. Create `.env` file:
```env
VITE_API_URL=https://your-api-url.com
```

2. Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

3. **Important**: Add `.env` to `.gitignore` (already done)

---

## Pre-Deployment Checklist

- [ ] Build completes without errors: `npm run build`
- [ ] Test locally: `npm run preview`
- [ ] All routes work
- [ ] No console errors
- [ ] Responsive design tested
- [ ] Demo credentials work
- [ ] All features functional

---

## Post-Deployment

1. **Test your live site**
2. **Share the URL**: `https://yourusername.github.io/eventmage-1`
3. **Update README.md** with live URL
4. **Test on mobile devices**

---

## Quick Commands

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy

# Start development server
npm run dev
```

---

**Your site is now live! 🎉**



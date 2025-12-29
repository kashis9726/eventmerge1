# Deployment Guide for EventForce

## 🚀 Quick Start - Run Locally

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to `http://localhost:5173` or the URL shown in terminal

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

## 🌐 Deploy to Vercel (Recommended - Easiest)

### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your Git repository
5. Vercel will auto-detect Vite settings
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Deploy to production
vercel --prod
```

**Vercel Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## 🌐 Deploy to Netlify

### Option 1: Drag and Drop

1. Build your project: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `dist` folder

### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

**Netlify Configuration (netlify.toml):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🌐 Deploy to GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/eventmage-1"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Update vite.config.ts**:
   ```typescript
   export default defineConfig({
     base: '/eventmage-1/', // Your repo name
     // ... rest of config
   })
   ```

## 🔧 Fix Common Issues

### Issue: Blank page after deployment
**Solution**: Add this to `vite.config.ts`:
```typescript
export default defineConfig({
  base: './', // Use relative paths
  // ... rest
})
```

### Issue: Routes not working
**Solution**: Configure server to redirect all routes to `index.html`:
- Vercel: Auto-handled
- Netlify: Use `netlify.toml` (see above)
- GitHub Pages: Not recommended for SPA routing

### Issue: Build errors
**Solution**: 
1. Clear cache: `rm -rf node_modules dist`
2. Reinstall: `npm install`
3. Rebuild: `npm run build`

## ✅ Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] Build completes without errors (`npm run build`)
- [ ] No console errors in browser
- [ ] All routes working
- [ ] Responsive design tested on mobile
- [ ] Git repository initialized
- [ ] README.md updated
- [ ] .gitignore configured

## 🎯 Testing Your Deployment

1. **Check all pages load**:
   - `/` - Landing page
   - `/login` - Login page
   - `/register` - Registration page
   - `/dashboard/organizer` - Organizer dashboard
   - `/dashboard/worker` - Worker dashboard
   - `/dashboard/vendor` - Vendor dashboard

2. **Test user flows**:
   - Register as different user types
   - Login and navigate dashboards
   - Post an event (as organizer)
   - Browse jobs (as worker)
   - Apply for jobs
   - View applications

3. **Check responsiveness**:
   - Test on mobile viewport
   - Test on tablet viewport
   - Test on desktop

## 📝 Environment Variables (Future)

If you need environment variables later:

1. Create `.env` file:
   ```env
   VITE_API_URL=https://api.example.com
   ```

2. Use in code:
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL
   ```

3. Add to `.gitignore` (already done)

## 🔗 Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check for linting errors

# Git
git add .            # Stage all changes
git commit -m "..."  # Commit changes
git push             # Push to repository
```

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify all dependencies installed: `npm install`
3. Clear cache and rebuild
4. Check network tab for failed requests

---

**Happy Deploying! 🚀**


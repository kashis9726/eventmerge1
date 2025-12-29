# 🚀 Quick Start Guide - EventForce

## Step 1: Start the Development Server

Open your terminal in the project folder and run:

```bash
npm run dev
```

You should see:
```
  VITE v5.4.19  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## Step 2: Open in Browser

Open your browser and go to:
```
http://localhost:5173
```

## Step 3: Test the Application

### Test as Event Organizer:

1. **Login**:
   - Go to `/login`
   - Use email: `organizer@test.com` (or any email with "organizer" in it)
   - Password: any password
   - You'll be redirected to Organizer Dashboard

2. **Post an Event**:
   - Click "Post Event" button
   - Fill in event details
   - Submit the form

3. **View Events**:
   - Go to "My Events" tab
   - See all your posted events

4. **Manage Applications**:
   - Click "View Applications" on any event
   - Accept or reject applications
   - View worker details

### Test as Worker/Manpower:

1. **Login**:
   - Use email: `worker@test.com` (or any email without "organizer" or "vendor")
   - You'll be redirected to Worker Dashboard

2. **Browse Jobs**:
   - Click "Browse Jobs" or go to `/dashboard/worker/jobs`
   - Use filters: City, Category, Payment Range, Work Type
   - Click "Apply Now" on any job

3. **Track Applications**:
   - Go to "My Applications" tab
   - See application status

4. **View Payments**:
   - Go to "Track Payments"
   - See payment history

### Test as Vendor:

1. **Login**:
   - Use email: `vendor@test.com` (or any email with "vendor" in it)
   - You'll be redirected to Vendor Dashboard

2. **View Services**:
   - Go to "My Services" tab
   - See your service listings

3. **View Requests**:
   - Go to "New Requests" tab
   - See event service requests
   - Send quotes

## Step 4: Navigate Features

### Organizer Features:
- ✅ Post Events
- ✅ View All Events
- ✅ Manage Applications
- ✅ Track Payments
- ✅ Accept/Reject Workers

### Worker Features:
- ✅ Browse Jobs with Advanced Filters
- ✅ Filter by Payment, Location, Work Type
- ✅ Apply for Jobs
- ✅ Track Applications
- ✅ View Payment History
- ✅ XP System & Levels

### Vendor Features:
- ✅ Manage Services
- ✅ View Service Requests
- ✅ Send Quotes
- ✅ Track Bookings
- ✅ View Revenue

## Step 5: Create Git Repository

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: EventForce platform"

# Connect to GitHub (replace with your repo URL)
git remote add origin https://github.com/yourusername/eventforce.git

# Push to GitHub
git push -u origin main
```

## Step 6: Deploy to Production

### Option A: Vercel (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Click "Deploy"

### Option B: Netlify

1. Build: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `dist` folder

## 🐛 Troubleshooting

### Port Already in Use?
```bash
# Kill process on port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use different port
npm run dev -- --port 3000
```

### Build Errors?
```bash
# Clear and reinstall
rm -rf node_modules
npm install
npm run build
```

### Styles Not Loading?
```bash
# Rebuild
npm run build
```

## ✨ Features to Explore

1. **3D Background**: Notice the animated 3D gradient background on all dashboards
2. **Filters**: Test advanced filtering on job browse page
3. **Application Flow**: Apply as worker, accept as organizer
4. **Payment Tracking**: See payment status management
5. **Responsive Design**: Resize browser to see mobile view

## 📱 Test on Mobile

1. Open dev tools (F12)
2. Click device toolbar icon
3. Select mobile device
4. Test all features

---

**Enjoy exploring EventForce! 🎉**


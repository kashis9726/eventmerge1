# EventMage - Viva Preparation Guide

## 🎯 Project Overview

**EventMage** (EventForce) is a comprehensive event management platform that connects Event Organizers, Manpower/Workers, and Vendors. The platform facilitates event posting, job applications, payment tracking, and real-time notifications.

---

## 🛠️ Technology Stack

### **Frontend Technologies**

#### 1. **React 18.3.1** (Core Framework)
- **Why Used**: Component-based architecture, virtual DOM for performance, large ecosystem
- **Features**: 
  - Single Page Application (SPA)
  - Component reusability
  - State management with Context API

#### 2. **TypeScript 5.8.3** (Type Safety)
- **Why Used**: Type safety, better IDE support, fewer runtime errors
- **Benefits**: Catches errors at compile time, improves code maintainability

#### 3. **Vite 5.4.19** (Build Tool)
- **Why Used**: Fast development server, instant HMR (Hot Module Replacement)
- **Advantages**: 
  - Lightning-fast builds
  - Optimized production builds
  - Better than Create React App

#### 4. **React Router DOM 6.30.1** (Routing)
- **Why Used**: Client-side routing for SPA
- **Features**: 
  - Dynamic routing
  - Protected routes
  - Navigation without page reload

#### 5. **Tailwind CSS 3.4.17** (Styling)
- **Why Used**: Utility-first CSS framework
- **Benefits**: 
  - Rapid UI development
  - Responsive design
  - No CSS conflicts

#### 6. **Shadcn UI** (Component Library)
- **Why Used**: Beautiful, accessible components built on Radix UI
- **Components Used**: 
  - Buttons, Cards, Dialogs, Dropdowns
  - Forms, Inputs, Badges
  - Toast notifications

#### 7. **Framer Motion 12.23.26** (Animations)
- **Why Used**: Smooth animations and transitions
- **Features**: 
  - Page transitions
  - Component animations
  - Gesture support

#### 8. **TanStack Query 5.83.0** (Data Fetching)
- **Why Used**: Server state management, caching, synchronization
- **Features**: 
  - Automatic caching
  - Background updates
  - Optimistic updates

#### 9. **Date-fns 3.6.0** (Date Utilities)
- **Why Used**: Date formatting and manipulation
- **Usage**: Format timestamps in notifications

### **Backend Technologies**

#### 1. **Node.js** (Runtime)
- **Why Used**: JavaScript runtime for server-side
- **Benefits**: Same language for frontend and backend

#### 2. **Express.js** (Web Framework)
- **Why Used**: Minimal, flexible Node.js framework
- **Features**: 
  - RESTful API routes
  - Middleware support
  - Easy routing

#### 3. **MongoDB** (Database)
- **Why Used**: NoSQL database, flexible schema
- **Schema**: 
  - Users (name, email, password, role)
  - Events (title, organizer, date, location, payment)
  - Applications (eventId, workerId, status)

#### 4. **Mongoose** (ODM)
- **Why Used**: MongoDB object modeling
- **Features**: 
  - Schema validation
  - Middleware hooks
  - Query building

#### 5. **JWT (JSON Web Tokens)** (Authentication)
- **Why Used**: Stateless authentication
- **Implementation**: 
  - Token-based auth
  - Secure user sessions
  - Role-based access

#### 6. **Bcrypt.js** (Password Hashing)
- **Why Used**: Secure password storage
- **Security**: 
  - One-way hashing
  - Salt rounds (10)
  - Prevents plain text storage

---

## 🎨 Key Features & Implementation

### 1. **Multi-Role Authentication System**

**Technology**: React Context API + JWT

**How it Works**:
```typescript
// AuthContext manages user state
- Stores JWT token in localStorage
- Decodes token to get user role
- Provides login/logout functions
- Role-based route protection
```

**User Roles**:
- **Event Organizer**: Post events, manage applications, track payments
- **Manpower/Worker**: Browse jobs, apply for events, track earnings
- **Vendor/Supplier**: List services, receive bookings

**Demo Mode**: Works without backend using localStorage

---

### 2. **Event Management System**

**Technology**: React Context API

**Features**:
- **Post Events**: Organizers can create events with details
- **Browse Events**: Workers can search and filter events
- **Real-time Updates**: Context API provides instant updates

**Event Data Structure**:
```typescript
{
  id: number
  title: string
  organizer: string
  category: "Government" | "Corporate" | "Marriage" | "Tournament"
  date: string
  location: string
  payment: string
  requirements: string[]
  benefits: string[]
}
```

**Real Events Examples**:
- PSI Exam Biometric Volunteers
- Police Constable Exam Volunteers
- Inter-College Cricket Tournament
- College Fest Volunteers

---

### 3. **Application Management**

**Technology**: React Context API

**How it Works**:
```typescript
// ApplicationContext manages applications
- Workers apply for events
- Organizers review applications
- Status: pending → accepted/rejected
- Real-time status updates
```

**Application Flow**:
1. Worker browses events
2. Clicks "Apply Now"
3. Application added to context
4. Notification sent
5. Organizer reviews in dashboard
6. Accept/Reject updates status

---

### 4. **Notification System**

**Technology**: React Context API + LocalStorage

**Features**:
- Real-time notifications
- Unread count badge
- Click to mark as read
- Role-based notifications
- Persistent storage

**Notification Types**:
- ✅ Success: Application accepted
- ⚠️ Warning: Payment pending
- ❌ Error: Application rejected
- ℹ️ Info: New event posted

**Implementation**:
```typescript
// NotificationContext
- Stores notifications in localStorage
- Filters by user role
- Provides mark as read functionality
- Auto-updates unread count
```

---

### 5. **Payment Tracking System**

**Technology**: React Context API (Frontend Demo)

**Features**:
- Track payments for workers
- Payment history
- Status: Pending, Completed, Failed
- Organizer payment management

**Future Implementation**:
- Integration with payment gateways (Razorpay, Stripe)
- Secure payment processing
- Transaction history

---

### 6. **Responsive Design**

**Technology**: Tailwind CSS + Mobile-first approach

**Breakpoints**:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Features**:
- Mobile navigation menu
- Responsive grid layouts
- Touch-friendly buttons
- Adaptive typography

---

## 🔐 Security Features

### 1. **Password Security**
- **Bcrypt hashing**: Passwords never stored in plain text
- **Salt rounds**: 10 rounds for security
- **JWT tokens**: Secure, stateless authentication

### 2. **Authentication**
- **Token-based**: JWT tokens for sessions
- **Role-based access**: Different dashboards per role
- **Protected routes**: Only authenticated users access dashboards

### 3. **Data Validation**
- **Frontend**: Form validation with TypeScript
- **Backend**: Schema validation with Mongoose
- **Input sanitization**: Prevents XSS attacks

---

## 🚀 Future Implementations

### 1. **Real-Time Messaging**

**Technologies to Use**:

#### Option A: **Socket.io**
```javascript
// Server
const io = require('socket.io')(server);
io.on('connection', (socket) => {
  socket.on('message', (data) => {
    io.emit('message', data);
  });
});

// Client
import io from 'socket.io-client';
const socket = io('http://localhost:5000');
socket.on('message', (data) => {
  // Update UI
});
```

**Why Socket.io**:
- Real-time bidirectional communication
- WebSocket fallback
- Room-based messaging
- Easy to implement

#### Option B: **WebSockets (Native)**
```javascript
const ws = new WebSocket('ws://localhost:5000');
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  // Handle message
};
```

**Implementation Steps**:
1. Install Socket.io on server
2. Create message schema in MongoDB
3. Set up Socket.io client in React
4. Create Chat component
5. Real-time message updates

---

### 2. **Secure Payment System**

**Technologies to Use**:

#### **Razorpay Integration** (Recommended for India)
```javascript
// Backend
const Razorpay = require('razorpay');
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create order
app.post('/api/payments/create-order', async (req, res) => {
  const order = await razorpay.orders.create({
    amount: req.body.amount * 100, // in paise
    currency: 'INR',
    receipt: req.body.receipt
  });
  res.json(order);
});
```

**Security Features**:
- **HTTPS**: All payment requests over HTTPS
- **Webhook verification**: Verify payment status
- **Idempotency**: Prevent duplicate payments
- **PCI DSS compliance**: Razorpay handles card data

**Payment Flow**:
1. Worker completes event
2. Organizer initiates payment
3. Create Razorpay order
4. Worker pays via Razorpay
5. Webhook confirms payment
6. Update payment status in database

#### **Alternative: Stripe** (International)
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paymentIntent = await stripe.paymentIntents.create({
  amount: amount * 100,
  currency: 'usd'
});
```

**Security Best Practices**:
- Never store card details
- Use payment gateway tokens
- Implement webhook signature verification
- Log all transactions
- Implement refund system

---

## 📊 How the Platform Works

### **User Flow**

#### **1. Event Organizer Flow**:
```
1. Register/Login as Organizer
2. Post Event (title, date, location, payment, requirements)
3. Event appears in job listings
4. Workers apply for event
5. Review applications in dashboard
6. Accept/Reject applications
7. Track payments
8. Complete event
```

#### **2. Worker/Manpower Flow**:
```
1. Register/Login as Worker
2. Browse available events
3. Filter by location, category, payment
4. Apply for events
5. Track application status
6. Receive notifications
7. Complete assigned events
8. Receive payments
```

#### **3. Vendor Flow**:
```
1. Register/Login as Vendor
2. List services (catering, decoration, etc.)
3. Receive service requests
4. Accept/Reject requests
5. Manage bookings
6. Track payments
```

---

## 🗄️ Database Schema

### **Users Collection**
```javascript
{
  name: String (required)
  email: String (required, unique)
  password: String (hashed, required)
  role: Enum ['organizer', 'manpower', 'vendor']
  profile: {
    bio: String
    skills: [String]
    experience: String
  }
  timestamps: true
}
```

### **Events Collection** (Future)
```javascript
{
  title: String
  organizer: ObjectId (ref: User)
  category: String
  date: Date
  location: String
  payment: Number
  requirements: [String]
  benefits: [String]
  status: Enum ['active', 'completed', 'cancelled']
  workersNeeded: Number
  timestamps: true
}
```

### **Applications Collection** (Future)
```javascript
{
  eventId: ObjectId (ref: Event)
  workerId: ObjectId (ref: User)
  status: Enum ['pending', 'accepted', 'rejected']
  appliedDate: Date
  timestamps: true
}
```

---

## 🔄 State Management

### **Context API Usage**

1. **AuthContext**: User authentication state
2. **EventContext**: Event listings
3. **ApplicationContext**: Job applications
4. **NotificationContext**: Notifications

**Why Context API**:
- Built-in React solution
- No external dependencies
- Perfect for global state
- Easy to understand

**Alternative (Future)**: Redux Toolkit for complex state

---

## 📱 API Endpoints (Backend)

### **Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### **Events** (Future)
- `GET /api/events` - Get all events
- `POST /api/events` - Create event
- `GET /api/events/:id` - Get event details
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### **Applications** (Future)
- `POST /api/applications` - Apply for event
- `GET /api/applications` - Get applications
- `PUT /api/applications/:id` - Update status

### **Payments** (Future)
- `POST /api/payments/create-order` - Create payment
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments` - Get payment history

---

## 🎯 Key Points for Viva

### **1. Why React?**
- Component reusability
- Virtual DOM for performance
- Large ecosystem
- Industry standard

### **2. Why TypeScript?**
- Type safety
- Better IDE support
- Catches errors early
- Improves code quality

### **3. Why MongoDB?**
- Flexible schema
- Easy to scale
- JSON-like documents
- Good for rapid development

### **4. Why JWT?**
- Stateless authentication
- Scalable
- Secure
- Works across domains

### **5. Why Context API?**
- Built-in React
- No external dependencies
- Perfect for global state
- Easy to implement

---

## 🚀 Deployment

### **GitHub Pages Deployment**
1. Build the project: `npm run build`
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add to package.json:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
4. Deploy: `npm run deploy`

### **Vercel Deployment** (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Auto-deploys on push
4. Free HTTPS included

### **Netlify Deployment**
1. Push to GitHub
2. Connect to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

---

## 📝 Demo Credentials

### **Event Organizer**
- Email: `organizer@demo.com`
- Password: `demo123`

### **Manpower/Worker**
- Email: `manpower@demo.com`
- Password: `demo123`

### **Vendor**
- Email: `vendor@demo.com`
- Password: `demo123`

---

## ✅ Testing Checklist

- [x] User registration works
- [x] User login works
- [x] Role-based routing works
- [x] Event browsing works
- [x] Application submission works
- [x] Notifications work
- [x] Logout works
- [x] Responsive design works
- [x] Demo mode works without backend

---

## 🎓 Questions You Might Get Asked

### **Q: Why did you choose React over other frameworks?**
**A**: React has a large ecosystem, component reusability, virtual DOM for performance, and is widely used in industry. It's perfect for building interactive UIs.

### **Q: How does authentication work?**
**A**: We use JWT tokens. When user logs in, server generates a JWT token containing user ID and role. This token is stored in localStorage and sent with each request. Server validates token to authenticate user.

### **Q: How would you implement real-time messaging?**
**A**: I would use Socket.io. It provides WebSocket-based real-time communication. Server would handle message routing, and clients would connect via Socket.io client. Messages would be stored in MongoDB and broadcasted to relevant users.

### **Q: How would you secure payments?**
**A**: I would integrate Razorpay/Stripe. Never store card details. Use payment gateway tokens. Implement webhook verification. Use HTTPS for all payment requests. Log all transactions for audit.

### **Q: What are the limitations of your current implementation?**
**A**: Currently using demo mode with localStorage. Backend is not fully connected. Real-time features not implemented. Payment system is UI-only. These would be implemented in production.

---

**Good Luck with your Viva! 🎉**



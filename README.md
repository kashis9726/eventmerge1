# 🎉 EventMage (EventForce) - Event Management Platform

A comprehensive event management platform connecting Event Organizers, Manpower/Workers, and Vendors.

## 🚀 Live Demo

**GitHub Pages**: [View Live Site](https://yourusername.github.io/eventmage-1)

**Demo Credentials**:
- **Event Organizer**: `organizer@demo.com` / `demo123`
- **Manpower/Worker**: `manpower@demo.com` / `demo123`
- **Vendor**: `vendor@demo.com` / `demo123`

## ✨ Features

### 🎯 Multi-Role System
- **Event Organizers**: Post events, manage applications, track payments
- **Manpower/Workers**: Browse jobs, apply for events, track earnings
- **Vendors/Suppliers**: List services, receive bookings

### 📱 Key Features
- ✅ User Authentication (Login/Register)
- ✅ Role-based Dashboards
- ✅ Event Posting & Browsing
- ✅ Job Applications System
- ✅ Real-time Notifications
- ✅ Payment Tracking
- ✅ Responsive Design
- ✅ Demo Mode (Works without backend)

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - UI Framework
- **TypeScript 5.8.3** - Type Safety
- **Vite 5.4.19** - Build Tool
- **React Router DOM 6.30.1** - Routing
- **Tailwind CSS 3.4.17** - Styling
- **Shadcn UI** - Component Library
- **Framer Motion 12.23.26** - Animations
- **TanStack Query 5.83.0** - Data Fetching

### Backend (Ready for Implementation)
- **Node.js** - Runtime
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt.js** - Password Hashing

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/eventmage-1.git

# Navigate to project
cd eventmage-1

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

### GitHub Pages
```bash
npm run deploy
```

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Auto-deploys!

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Header, Footer
│   ├── ui/             # Shadcn UI components
│   └── NotificationDropdown.tsx
├── context/            # React Context providers
│   ├── AuthContext.tsx
│   ├── EventContext.tsx
│   ├── ApplicationContext.tsx
│   └── NotificationContext.tsx
├── pages/              # Page components
│   ├── dashboard/      # Dashboard pages
│   ├── Login.tsx
│   ├── Register.tsx
│   └── PostEvent.tsx
├── lib/                # Utility functions
└── hooks/              # Custom React hooks
```

## 🎯 Real Event Examples

- **PSI Exam - Biometric Volunteers** (Government)
- **Police Constable Exam Volunteers** (Government)
- **Inter-College Cricket Tournament** (Tournament)
- **College Fest Volunteers** (College Event)
- **Tech Startup Expo** (Corporate)

## 🔐 Security

- Password hashing with Bcrypt
- JWT token-based authentication
- Role-based access control
- Input validation
- Secure API endpoints

## 📚 Documentation

- [Viva Preparation Guide](./VIVA_PREPARATION.md) - Complete technical documentation
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Step-by-step deployment
- [Demo Credentials](./DEMO_CREDENTIALS.md) - Test accounts

## 🚧 Future Enhancements

- [ ] Real-time messaging (Socket.io)
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Email notifications
- [ ] File uploads
- [ ] Advanced search & filters
- [ ] Rating & review system

## 👨‍💻 Development

```bash
# Development server
npm run dev

# Build
npm run build

# Lint
npm run lint
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

# EventForce - Smart Event Hiring Platform

A comprehensive platform connecting Event Organizers, Manpower/Workers, and Vendors for seamless event management.

## 🚀 Features

### For Event Organizers
- **Post Events**: Create detailed event listings with requirements, budget, and specifications
- **Manage Applications**: Review, accept, or reject worker applications
- **Payment Tracking**: Track and manage payments to workers
- **Event Management**: View all posted events with status tracking

### For Manpower/Workers
- **Job Browsing**: Advanced filtering by location, category, payment range, work type
- **Application Tracking**: Monitor application status (Pending, Accepted, Rejected)
- **Payment History**: Track earnings and payment status
- **XP System**: Level progression with verified expert badges

### For Vendors/Suppliers
- **Service Management**: List and manage your services
- **Request Handling**: Receive and respond to service requests from organizers
- **Booking Management**: Track confirmed bookings and revenue

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn UI** components
- **React Router** for navigation
- **Framer Motion** for animations
- **React Context** for state management

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd eventmage-1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎯 Getting Started

1. **Run the app locally**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

2. **Test different user roles**
   - **Organizer**: Login with email containing "organizer"
   - **Vendor**: Login with email containing "vendor"
   - **Worker**: Login with any other email

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── 3DBackground.tsx    # 3D animated background
│   ├── layout/         # Layout components
│   └── ui/             # Shadcn UI components
├── context/            # React Context providers
│   ├── EventContext.tsx
│   └── ApplicationContext.tsx
├── pages/              # Page components
│   ├── dashboard/      # Dashboard pages for each role
│   ├── Login.tsx
│   ├── Register.tsx
│   └── PostEvent.tsx
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Deploy to Vercel

1. Install Vercel CLI
   ```bash
   npm i -g vercel
   ```

2. Deploy
   ```bash
   vercel
   ```

### Deploy to Netlify

1. Install Netlify CLI
   ```bash
   npm i -g netlify-cli
   ```

2. Deploy
   ```bash
   netlify deploy --prod
   ```

### Deploy to GitHub Pages

1. Install gh-pages
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy
   ```bash
   npm run deploy
   ```

## 📝 Environment Variables

Create a `.env` file for environment-specific variables (if needed in future):

```env
VITE_API_URL=your_api_url
VITE_APP_NAME=EventForce
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

EventForce Team

## 🙏 Acknowledgments

- Shadcn UI for beautiful components
- Vite for blazing fast builds
- React community for amazing tools

---

**Built with ❤️ using React + TypeScript + Vite**


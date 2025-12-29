import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrganizerDashboard from "./pages/dashboard/OrganizerDashboard";
import WorkerDashboard from "./pages/dashboard/WorkerDashboard";
import VendorDashboard from "./pages/dashboard/VendorDashboard";
import NotFound from "./pages/NotFound";
import PostEvent from "./pages/PostEvent";
import PaymentTracker from "./pages/dashboard/Organizer/PaymentTracker";
import JobBrowse from "./pages/dashboard/JobBrowse";
import WorkerPayments from "./pages/dashboard/WorkerPayments";
import VendorMyServices from "./pages/dashboard/VendorMyServices";
import VendorNewRequests from "./pages/dashboard/VendorNewRequests";
import OrganizerEvents from "./pages/dashboard/OrganizerEvents";
import OrganizerEventApplications from "./pages/dashboard/OrganizerEventApplications";
import WorkerApplications from "./pages/dashboard/WorkerApplications";

import { EventProvider } from "./context/EventContext";
import { ApplicationProvider } from "./context/ApplicationContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <NotificationProvider userRole={user?.role}>
      <BrowserRouter>
        <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/post-event" element={<PostEvent />} />
              <Route path="/dashboard/organizer" element={<OrganizerDashboard />} />
              <Route path="/dashboard/organizer/payments" element={<PaymentTracker />} />
              <Route path="/dashboard/organizer/events" element={<OrganizerEvents />} />
              <Route path="/dashboard/organizer/events/:id/applications" element={<OrganizerEventApplications />} />
              <Route path="/dashboard/worker" element={<WorkerDashboard />} />
              <Route path="/dashboard/worker/jobs" element={<JobBrowse />} />
              <Route path="/dashboard/worker/payments" element={<WorkerPayments />} />
              <Route path="/dashboard/worker/applications" element={<WorkerApplications />} />
              <Route path="/dashboard/vendor" element={<VendorDashboard />} />
              <Route path="/dashboard/vendor/services" element={<VendorMyServices />} />
              <Route path="/dashboard/vendor/requests" element={<VendorNewRequests />} />
              <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  );
};

const App = () => (
  <AuthProvider>
    <EventProvider>
      <ApplicationProvider>
        <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </TooltipProvider>
      </QueryClientProvider>
      </ApplicationProvider>
    </EventProvider>
  </AuthProvider>
);

export default App;

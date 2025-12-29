import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  Bell,
  LogOut,
  Zap,
  IndianRupee,
  Star,
  Package,
  TrendingUp,
  MessageCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Store,
  Users,
  Plus,
  DollarSign,
} from "lucide-react";
import { ThreeDGradientBackground } from "@/components/3DGradientBackground";

const stats = [
  { label: "Total Services", value: "2", icon: Package, color: "text-blue-500", subtext: "Active listings" },
  { label: "Total Bookings", value: "20", icon: Clock, color: "text-blue-500", subtext: "+5 this month", subtextColor: "text-green-500" },
  { label: "New Requests", value: "3", icon: Bell, color: "text-blue-500", subtext: "Needs response", subtextColor: "text-red-500" },
  { label: "Revenue", value: "₹2,45,000", icon: DollarSign, color: "text-blue-500", subtext: "This month" },
];

const services = [
  {
    id: 1,
    name: "Premium Catering",
    category: "Catering",
    rate: "₹500/person",
    bookings: 23,
    rating: 4.9,
    active: true,
  },
  {
    id: 2,
    name: "Stage Decoration",
    category: "Decor",
    rate: "₹25,000/event",
    bookings: 15,
    rating: 4.8,
    active: true,
  },
];

const requests = [
  {
    id: 1,
    event: "Tech Conference 2024",
    organizer: "Grand Events Co.",
    service: "Premium Catering",
    date: "Jan 15, 2024",
    budget: "₹75,000",
    guests: 150,
    status: "pending",
  },
  {
    id: 2,
    event: "Sharma Wedding",
    organizer: "Sharma Family",
    service: "Stage Decoration",
    date: "Jan 20, 2024",
    budget: "₹50,000",
    guests: 500,
    status: "pending",
  },
];

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative">
      <ThreeDGradientBackground />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border relative">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">EF</span>
                </div>
                <span className="text-xl font-bold text-foreground">
                  EventForce
                </span>
                <Badge variant="secondary" className="ml-2 bg-purple-100 text-purple-700">Vendor</Badge>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <MessageCircle className="w-5 h-5 text-muted-foreground" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  DU
                </div>
                <span className="text-sm font-medium">Demo User</span>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 relative z-10">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, Demo User! 👋
          </h1>
          <p className="text-muted-foreground">Manage your services and connect with clients</p>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={stat.label} className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <div className={`w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className={`text-xs ${stat.subtextColor || "text-muted-foreground"}`}>{stat.subtext}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger 
              value="services"
              onClick={() => {
                setActiveTab("services");
                navigate("/dashboard/vendor/services");
              }}
            >
              My Services
            </TabsTrigger>
            <TabsTrigger 
              value="requests"
              onClick={() => {
                setActiveTab("requests");
                navigate("/dashboard/vendor/requests");
              }}
            >
              New Requests
            </TabsTrigger>
            <TabsTrigger value="bookings">Confirmed Bookings</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Services Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2"
              >
                <Card className="border-border">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Your Services</CardTitle>
                      <CardDescription>Manage your service listings</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/vendor/services")}>
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          className="p-4 rounded-xl border border-border hover:border-vendor/30 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-foreground">{service.name}</h4>
                              <p className="text-sm text-muted-foreground">{service.category}</p>
                            </div>
                            <Badge variant={service.active ? "default" : "secondary"}>
                              {service.active ? "Active" : "Paused"}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-bold text-vendor">{service.rate}</span>
                            <div className="flex items-center gap-3 text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {service.bookings}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-amber-500" />
                                {service.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Requests Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Booking Requests</CardTitle>
                    <CardDescription>New service requests</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {requests.map((request) => (
                      <div key={request.id} className="p-4 rounded-xl border border-border hover:bg-secondary/30 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-foreground text-sm">{request.event}</p>
                            <p className="text-xs text-muted-foreground">{request.organizer}</p>
                          </div>
                          <span className="text-sm font-bold text-vendor">{request.budget}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {request.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {request.guests} guests
                          </span>
                        </div>
                        <p className="text-xs text-primary mb-3">Service: {request.service}</p>
                        
                        {request.status === "pending" && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="default" className="flex-1 h-8 bg-vendor hover:bg-vendor/90">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Accept
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 h-8">
                              <XCircle className="w-3 h-3 mr-1" />
                              Decline
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" onClick={() => navigate("/dashboard/vendor/requests")}>
                      View All Requests
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Add Service Button */}
            <div>
              <Button variant="default" className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                Add New Service
              </Button>
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Management</CardTitle>
                <CardDescription>Track your earnings and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Payment tracking coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Confirmed Bookings</CardTitle>
                <CardDescription>Your confirmed service bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No confirmed bookings yet.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default VendorDashboard;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Plus,
  Bell,
  Settings,
  LogOut,
  Zap,
  MapPin,
  Clock,
  IndianRupee,
  CheckCircle2,
  XCircle,
  MessageCircle,
  TrendingUp,
  CalendarDays,
  UserCheck,
  DollarSign,
  Package,
  ShoppingCart,
} from "lucide-react";
import { ThreeDGradientBackground } from "@/components/3DGradientBackground";
import { useApplicationContext } from "@/context/ApplicationContext";

const stats = [
  { label: "Active Events", value: "5", icon: Calendar, color: "text-blue-500", subtext: "Ongoing events" },
  { label: "Total Applications", value: "23", icon: Users, color: "text-blue-500", subtext: "From workers" },
  { label: "Completed Events", value: "47", icon: CheckCircle2, color: "text-green-500", subtext: "All time" },
  { label: "Total Spent", value: "₹2.4L", icon: DollarSign, color: "text-amber-500", subtext: "This month" },
];

const events = [
  {
    id: 1,
    title: "Tech Conference 2024",
    category: "Corporate",
    date: "Jan 15, 2024",
    location: "Mumbai Convention Center",
    workersNeeded: 25,
    applications: 12,
    status: "active",
    budget: "₹50,000",
  },
  {
    id: 2,
    title: "Sharma Wedding Reception",
    category: "Marriage",
    date: "Jan 20, 2024",
    location: "Grand Hyatt, Delhi",
    workersNeeded: 40,
    applications: 35,
    status: "active",
    budget: "₹1,20,000",
  },
  {
    id: 3,
    title: "Startup Expo",
    category: "Corporate",
    date: "Jan 25, 2024",
    location: "BKC, Mumbai",
    workersNeeded: 15,
    applications: 8,
    status: "upcoming",
    budget: "₹30,000",
  },
];

const recentApplications = [
  { id: 1, name: "Rahul Sharma", role: "Server", event: "Tech Conference", rating: 4.8, status: "pending" },
  { id: 2, name: "Priya Patel", role: "Decorator", event: "Sharma Wedding", rating: 4.9, status: "accepted" },
  { id: 3, name: "Amit Kumar", role: "Photographer", event: "Tech Conference", rating: 4.7, status: "pending" },
  { id: 4, name: "Sneha Gupta", role: "Coordinator", event: "Startup Expo", rating: 4.6, status: "rejected" },
];

const OrganizerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { applications } = useApplicationContext();

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
                <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">Organizer</Badge>
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
          <p className="text-muted-foreground">Manage your events and connect with professionals</p>
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
                <p className="text-xs text-muted-foreground">{stat.subtext}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Events */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2"
              >
                <Card className="border-border">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Recent Events</CardTitle>
                      <CardDescription>Manage your active and upcoming events</CardDescription>
                    </div>
                    <Link to="/post-event">
                      <Button variant="default" size="sm" className="gap-2">
                        <Plus className="w-4 h-4" />
                        Post Event
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className="p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary/30 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-foreground">{event.title}</h4>
                              <Badge variant={event.status === "active" ? "default" : "secondary"}>
                                {event.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{event.category}</p>
                          </div>
                          <span className="text-lg font-bold text-primary">{event.budget}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.applications}/{event.workersNeeded} applied
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Applications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Review worker applications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentApplications.map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                            {app.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">{app.name}</p>
                            <p className="text-xs text-muted-foreground">{app.role} • ⭐ {app.rating}</p>
                          </div>
                        </div>
                        {app.status === "pending" && (
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 rounded-lg bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors">
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                        {app.status === "accepted" && (
                          <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                            Accepted
                          </Badge>
                        )}
                        {app.status === "rejected" && (
                          <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                            Rejected
                          </Badge>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>My Events</CardTitle>
                  <CardDescription>All your events and their status</CardDescription>
                </div>
                <Link to="/post-event">
                  <Button variant="default" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Post New Event
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/dashboard/organizer/events")}
                >
                  View All Events & Manage Applications
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Applications</CardTitle>
                <CardDescription>Review and manage worker applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                        {app.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{app.name}</p>
                        <p className="text-sm text-muted-foreground">{app.role} • {app.event} • ⭐ {app.rating}</p>
                      </div>
                    </div>
                    {app.status === "pending" && (
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="default" className="gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2">
                          <XCircle className="w-4 h-4" />
                          Reject
                        </Button>
                      </div>
                    )}
                    {app.status === "accepted" && (
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600 text-sm px-4 py-2">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Accepted
                      </Badge>
                    )}
                    {app.status === "rejected" && (
                      <Badge variant="secondary" className="bg-destructive/10 text-destructive text-sm px-4 py-2">
                        <XCircle className="w-4 h-4 mr-1" />
                        Rejected
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Management</CardTitle>
                <CardDescription>Track and manage payments for your events</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate("/dashboard/organizer/payments")} variant="default" className="gap-2">
                  <DollarSign className="w-4 h-4" />
                  View Payment Tracker
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default OrganizerDashboard;

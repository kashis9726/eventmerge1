import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  Bell,
  LogOut,
  Zap,
  IndianRupee,
  Star,
  Briefcase,
  CheckCircle2,
  MessageCircle,
  Key,
  Target,
  Wallet,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    label: "Jobs Applied",
    value: "24",
    subtext: "All time applications",
    icon: Briefcase,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    subtextColor: "text-blue-500",
  },
  {
    label: "Completed",
    value: "18",
    subtext: "75% success rate",
    icon: CheckCircle2,
    color: "text-green-500",
    bgColor: "bg-green-50",
    subtextColor: "text-green-500",
    icon2: Target,
  },
  {
    label: "Avg Rating",
    value: "4.8",
    subtext: "From 15 reviews",
    icon: Star,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    subtextColor: "text-red-500",
  },
  {
    label: "Total Earned",
    value: "₹28,500",
    subtext: "This month",
    icon: Wallet,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    subtextColor: "text-red-500",
    icon2: Wallet,
  },
];

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const currentXP = 750;
  const maxXP = 1000;
  const currentLevel = 7;
  const xpPercentage = (currentXP / maxXP) * 100;
  const xpToNextLevel = maxXP - currentXP;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">EventForce</span>
                <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">
                  Manpower
                </Badge>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <MessageCircle className="w-5 h-5 text-muted-foreground" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  K
                </div>
                <span className="text-sm font-medium">kashis</span>
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
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            Welcome back, kashis! 👋
            <Bell className="w-5 h-5 text-green-500" />
          </h1>
          <p className="text-muted-foreground">Discover amazing opportunities waiting for you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Level Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <Card className="border-0 bg-gradient-to-br from-green-500 to-teal-500 text-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <Key className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">Level {currentLevel} Pro</h2>
                <div className="flex justify-center mb-4">
                  <Badge className="bg-orange-500 text-white border-0">
                    <Star className="w-3 h-3 mr-1" />
                    Verified Expert
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{currentXP} XP</span>
                    <span>{maxXP} XP</span>
                  </div>
                  <Progress value={xpPercentage} className="h-2 bg-white/20" />
                  <p className="text-center text-sm mt-2">
                    {xpToNextLevel} XP to reach Level {currentLevel + 1}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center ${stat.color}`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="flex items-end gap-2 mb-2">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      {stat.label === "Avg Rating" && (
                        <Star className="w-4 h-4 text-orange-500 mb-1" />
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <p className={`text-xs ${stat.subtextColor || "text-muted-foreground"}`}>
                        {stat.subtext}
                      </p>
                      {stat.icon2 && (
                        <stat.icon2 className={`w-3 h-3 ${stat.subtextColor || "text-muted-foreground"}`} />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/dashboard/worker/jobs")}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Browse Jobs</h3>
                  <p className="text-sm text-muted-foreground">Find new opportunities matching your skills</p>
                </div>
                <Briefcase className="w-12 h-12 text-worker opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/dashboard/worker/payments")}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Track Payments</h3>
                  <p className="text-sm text-muted-foreground">View your earnings and payment history</p>
                </div>
                <IndianRupee className="w-12 h-12 text-green-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default WorkerDashboard;

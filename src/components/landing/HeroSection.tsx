import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Users, Briefcase, Store, CheckCircle2 } from "lucide-react";

const stats = [
  { value: "10K+", label: "Events Completed" },
  { value: "50K+", label: "Professionals" },
  { value: "2K+", label: "Vendors" },
  { value: "98%", label: "Satisfaction" },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen gradient-hero pt-24 pb-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-secondary-foreground">
              Smart Hiring Platform for Events
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
          >
            Bridge the Gap Between{" "}
            <span className="text-gradient">Event Organizers</span> and{" "}
            <span className="text-gradient">Skilled Professionals</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Connect with verified manpower and vendors for weddings, festivals, 
            corporate events, and more. Make your events extraordinary.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/register">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-16"
          >
            {["Verified Professionals", "Secure Payments", "24/7 Support"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Role Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {/* Organizer Card */}
          <Link to="/register?role=organizer" className="group">
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border hover:border-primary/50 hover:shadow-soft transition-all duration-300 h-full">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Event Organizer</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Post events, hire professionals, and manage your workforce efficiently.
              </p>
              <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Manpower Card */}
          <Link to="/register?role=worker" className="group">
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border hover:border-worker/50 hover:shadow-soft transition-all duration-300 h-full">
              <div className="w-14 h-14 rounded-xl bg-worker/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-7 h-7 text-worker" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Manpower / Worker</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Find event jobs, build your reputation, and earn with your skills.
              </p>
              <div className="flex items-center gap-2 text-worker font-medium text-sm group-hover:gap-3 transition-all">
                <span>Find Jobs</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Vendor Card */}
          <Link to="/register?role=vendor" className="group">
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border hover:border-vendor/50 hover:shadow-soft transition-all duration-300 h-full">
              <div className="w-14 h-14 rounded-xl bg-vendor/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Store className="w-7 h-7 text-vendor" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Vendor / Supplier</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Offer your services, receive bookings, and grow your business.
              </p>
              <div className="flex items-center gap-2 text-vendor font-medium text-sm group-hover:gap-3 transition-all">
                <span>List Services</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-20"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

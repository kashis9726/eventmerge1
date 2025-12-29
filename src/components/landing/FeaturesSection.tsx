import { motion } from "framer-motion";
import {
  Shield,
  MessageCircle,
  Star,
  MapPin,
  CreditCard,
  Bell,
  Search,
  Calendar,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Professionals",
    description: "All workers and vendors go through our verification process for trust and reliability.",
  },
  {
    icon: MessageCircle,
    title: "Real-time Chat",
    description: "Communicate directly with organizers, workers, and vendors in real-time.",
  },
  {
    icon: Star,
    title: "Rating & Reviews",
    description: "Make informed decisions with our comprehensive rating and review system.",
  },
  {
    icon: MapPin,
    title: "Location Based",
    description: "Find professionals and events near you with smart location matching.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Track payments and ensure secure transactions for all parties.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Stay updated with real-time notifications for applications and events.",
  },
  {
    icon: Search,
    title: "Smart Matching",
    description: "AI-powered suggestions to find the perfect match for your events.",
  },
  {
    icon: Calendar,
    title: "Event Categories",
    description: "Specialized support for weddings, festivals, corporate events, and more.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4"
          >
            Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Everything You Need for{" "}
            <span className="text-gradient">Successful Events</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            Our platform provides all the tools and features you need to organize, 
            work, or provide services for events of any scale.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

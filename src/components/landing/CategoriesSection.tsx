import { motion } from "framer-motion";
import { Heart, Building2, Music, Briefcase, GraduationCap } from "lucide-react";

const categories = [
  {
    icon: Heart,
    name: "Marriage & Reception",
    description: "Weddings, receptions, and private ceremonies",
    roles: ["Decorators", "Servers", "Photographers", "Makeup Artists"],
    color: "bg-rose-500/10 text-rose-600",
    borderColor: "hover:border-rose-300",
  },
  {
    icon: Building2,
    name: "Government Events",
    description: "Public meetings, inaugurations, civic functions",
    roles: ["Security", "Volunteers", "Setup Crew", "Coordinators"],
    color: "bg-blue-500/10 text-blue-600",
    borderColor: "hover:border-blue-300",
  },
  {
    icon: Music,
    name: "Festival & Cultural",
    description: "Navratri, Diwali, Garba, local fairs",
    roles: ["Stage Crew", "Security", "Performers", "Technicians"],
    color: "bg-amber-500/10 text-amber-600",
    borderColor: "hover:border-amber-300",
  },
  {
    icon: Briefcase,
    name: "Corporate Events",
    description: "Seminars, conferences, office parties",
    roles: ["Waiters", "Tech Staff", "Ushers", "Cleaners"],
    color: "bg-slate-500/10 text-slate-600",
    borderColor: "hover:border-slate-300",
  },
  {
    icon: GraduationCap,
    name: "College Fests",
    description: "Tech fests, annual days, exhibitions",
    roles: ["Volunteers", "Anchors", "Coordinators", "Helpers"],
    color: "bg-violet-500/10 text-violet-600",
    borderColor: "hover:border-violet-300",
  },
];

export const CategoriesSection = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4"
          >
            Event Categories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Tailored for{" "}
            <span className="text-gradient">Every Occasion</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            From intimate weddings to large-scale festivals, we support 
            all types of events with specialized workforce solutions.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group bg-card rounded-2xl p-8 border border-border ${category.borderColor} shadow-card hover:shadow-soft transition-all duration-300`}
            >
              <div className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center mb-6`}>
                <category.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {category.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.roles.map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

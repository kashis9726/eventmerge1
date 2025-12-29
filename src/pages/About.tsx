import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Target, Users, Shield, Award, Heart, Zap } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Every professional is verified to ensure reliability and safety for all parties.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "We build meaningful connections between organizers, workers, and vendors.",
  },
  {
    icon: Award,
    title: "Quality Matters",
    description: "Our rating system ensures only the best professionals rise to the top.",
  },
  {
    icon: Heart,
    title: "Fair Opportunities",
    description: "Everyone deserves access to quality work and fair compensation.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
                About EventForce
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Revolutionizing the{" "}
                <span className="text-gradient">Event Industry</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                EventForce is India's leading platform connecting event organizers with 
                skilled professionals and trusted vendors. We're making event staffing 
                simple, transparent, and efficient.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We believe every event deserves the perfect team. Our mission is to 
                  democratize access to quality event staffing, making it easy for 
                  organizers to find verified professionals while providing workers 
                  with fair opportunities and growth.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  From intimate weddings to large-scale festivals, we're building 
                  the infrastructure that powers India's event industry.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { value: "50K+", label: "Professionals" },
                  { value: "10K+", label: "Events" },
                  { value: "2K+", label: "Vendors" },
                  { value: "98%", label: "Satisfaction" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-card rounded-2xl p-6 border border-border text-center">
                    <p className="text-3xl font-bold text-gradient mb-2">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Drives Us Forward
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-6 border border-border hover:shadow-card transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

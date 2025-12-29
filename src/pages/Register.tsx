import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Users, 
  Store, 
  ArrowRight, 
  ArrowLeft,
  Mail,
  Lock,
  User,
  Phone,
  CheckCircle2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Role = "organizer" | "worker" | "vendor";

const roles = [
  {
    id: "organizer" as Role,
    icon: Briefcase,
    title: "Event Organizer",
    description: "Post events and hire professionals for your events",
    color: "primary",
    features: ["Post unlimited events", "Access verified workforce", "Manage payments"],
  },
  {
    id: "worker" as Role,
    icon: Users,
    title: "Manpower / Worker",
    description: "Find event-based jobs and build your career",
    color: "worker",
    features: ["Browse job listings", "Build your profile", "Track earnings"],
  },
  {
    id: "vendor" as Role,
    icon: Store,
    title: "Vendor / Supplier",
    description: "Offer your services and grow your business",
    color: "vendor",
    features: ["List your services", "Receive bookings", "Manage clients"],
  },
];

const Register = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") as Role | null;
  const [selectedRole, setSelectedRole] = useState<Role | null>(initialRole);
  const [step, setStep] = useState(initialRole ? 2 : 1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const { toast } = useToast();

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Account created!",
      description: "Welcome to EventForce. Please login to continue.",
    });
  };

  const selectedRoleData = roles.find((r) => r.id === selectedRole);

  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      <main className="pt-24 pb-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Step 1: Role Selection */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Join EventForce
                </h1>
                <p className="text-muted-foreground mb-12">
                  Select your role to get started
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {roles.map((role, index) => (
                    <motion.button
                      key={role.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleRoleSelect(role.id)}
                      className="group text-left bg-card rounded-2xl p-8 border border-border hover:border-primary/50 hover:shadow-soft transition-all duration-300"
                    >
                      <div className={`w-14 h-14 rounded-xl bg-${role.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <role.icon className={`w-7 h-7 text-${role.color}`} />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {role.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {role.description}
                      </p>
                      <ul className="space-y-2">
                        {role.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-2 text-primary font-medium text-sm mt-6 group-hover:gap-3 transition-all">
                        <span>Select</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </motion.button>
                  ))}
                </div>

                <p className="text-muted-foreground text-sm mt-8">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary font-medium hover:underline">
                    Sign in
                  </Link>
                </p>
              </motion.div>
            )}

            {/* Step 2: Registration Form */}
            {step === 2 && selectedRoleData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto"
              >
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Change role</span>
                </button>

                <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-12 h-12 rounded-xl bg-${selectedRoleData.color}/10 flex items-center justify-center`}>
                      <selectedRoleData.icon className={`w-6 h-6 text-${selectedRoleData.color}`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        Create Account
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        as {selectedRoleData.title}
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="fullName"
                          name="fullName"
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" variant="hero" className="w-full" size="lg">
                      Create Account
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </form>

                  <p className="text-center text-muted-foreground text-sm mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary font-medium hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;

import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
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
import { useAuth } from "@/context/AuthContext";
import { DEMO_CREDENTIALS } from "@/lib/demoCredentials";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, loginDemo } = useAuth();

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedRole) {
      toast({
        title: "Please select a role",
        description: "You must select a role to continue.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Map frontend role to backend role
    // Frontend uses "worker" but backend uses "manpower"
    const backendRole = selectedRole === "worker" ? "manpower" : selectedRole;

    // Try API registration first
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: backendRole,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Registration failed");
      }

      // Store token and update auth context
      login(data.token);

      // Decode token to get user role
      const base64Url = data.token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const decoded = JSON.parse(jsonPayload);
      const userRole = decoded.user.role;

      // Redirect based on actual user role
      if (userRole === "organizer") {
        navigate("/dashboard/organizer");
      } else if (userRole === "vendor") {
        navigate("/dashboard/vendor");
      } else if (userRole === "manpower") {
        navigate("/dashboard/worker");
      } else {
        navigate("/dashboard/worker");
      }

      toast({
        title: "Account created!",
        description: "Welcome to EventForce. You have been logged in.",
      });
    } catch (error: any) {
      // If API fails, use demo mode
      console.warn("Backend not available, using demo mode:", error);
      
      // Use demo mode with the selected role
      const demoRole = backendRole === "manpower" ? "manpower" : backendRole;
      const demoCred = DEMO_CREDENTIALS[demoRole as keyof typeof DEMO_CREDENTIALS];
      
      if (demoCred) {
        loginDemo({
          id: `demo-${demoRole}-${Date.now()}`,
          role: demoCred.role,
          name: formData.fullName,
          email: formData.email,
        });

        // Redirect based on role
        if (demoCred.role === "organizer") {
          navigate("/dashboard/organizer");
        } else if (demoCred.role === "vendor") {
          navigate("/dashboard/vendor");
        } else {
          navigate("/dashboard/worker");
        }

        toast({
          title: "Account created! (Demo Mode)",
          description: "Backend not available. Using demo mode. You can test all features!",
        });
      } else {
        toast({
          title: "Registration failed",
          description: error.message || "Backend not available and demo mode failed. Please try demo login instead.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
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

                    <Button 
                      type="submit" 
                      variant="hero" 
                      className="w-full" 
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? "Creating account..." : "Create Account"}
                      {!loading && <ArrowRight className="w-5 h-5" />}
                    </Button>
                  </form>

                  {/* Demo Credentials Info */}
                  <div className="mt-6 p-4 bg-secondary/50 rounded-xl border border-border">
                    <p className="text-xs font-semibold text-foreground mb-2 text-center">
                      💡 Demo Mode Available
                    </p>
                    <p className="text-xs text-muted-foreground text-center mb-3">
                      If backend is not available, registration will automatically use demo mode. You can also use demo credentials to login:
                    </p>
                    <div className="space-y-1.5">
                      {Object.entries(DEMO_CREDENTIALS).map(([key, cred]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between p-2 bg-background rounded text-xs"
                        >
                          <div className="flex-1">
                            <span className="font-medium capitalize">{key}:</span>{" "}
                            <span className="text-muted-foreground">
                              {cred.email} / {cred.password}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-3">
                      <Link to="/login" className="text-primary hover:underline">
                        Or login with demo credentials →
                      </Link>
                    </p>
                  </div>

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

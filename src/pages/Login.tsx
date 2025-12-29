import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { DEMO_CREDENTIALS } from "@/lib/demoCredentials";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, loginDemo } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Check if it's a demo credential
    const demoUser = Object.values(DEMO_CREDENTIALS).find(
      (cred) => cred.email === formData.email && cred.password === formData.password
    );

    if (demoUser) {
      // Use demo mode
      loginDemo({
        id: `demo-${demoUser.role}`,
        role: demoUser.role,
        name: demoUser.name,
        email: demoUser.email,
      });

      // Redirect based on role
      if (demoUser.role === "organizer") {
        navigate("/dashboard/organizer");
      } else if (demoUser.role === "vendor") {
        navigate("/dashboard/vendor");
      } else {
        navigate("/dashboard/worker");
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully logged in (Demo Mode).",
      });
      setLoading(false);
      return;
    }

    // Try API login
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Login failed");
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
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (error: any) {
      // If API fails, suggest using demo credentials
      toast({
        title: "Login failed",
        description: error.message || "Backend not available. Please use demo credentials below.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      <main className="pt-24 pb-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-soft">
                  <Zap className="w-8 h-8 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Welcome Back
                </h1>
                <p className="text-muted-foreground text-sm">
                  Sign in to continue to EventForce
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
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

                <Button 
                  type="submit" 
                  variant="hero" 
                  className="w-full" 
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-secondary/50 rounded-xl border border-border">
                <p className="text-xs font-semibold text-foreground mb-3 text-center">
                  🎭 Demo Credentials (Backend not required)
                </p>
                <div className="space-y-2">
                  {Object.entries(DEMO_CREDENTIALS).map(([key, cred]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-2 bg-background rounded-lg text-xs"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-foreground capitalize">{key}</div>
                        <div className="text-muted-foreground">
                          {cred.email} / {cred.password}
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          setFormData({ email: cred.email, password: cred.password });
                        }}
                      >
                        Use
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-center text-muted-foreground text-sm mt-6">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;

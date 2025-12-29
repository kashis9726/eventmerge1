import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  role: "organizer" | "manpower" | "vendor";
  name?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  loginDemo: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Helper function to decode JWT token
const decodeToken = (token: string): User | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const decoded = JSON.parse(jsonPayload);
    return {
      id: decoded.user.id,
      role: decoded.user.role,
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize user from stored token or demo user
    const storedToken = localStorage.getItem("token");
    const demoUser = localStorage.getItem("demo_user");
    
    if (demoUser) {
      try {
        const user = JSON.parse(demoUser);
        setToken("demo_token");
        setUser(user);
      } catch (error) {
        localStorage.removeItem("demo_user");
      }
    } else if (storedToken && storedToken !== "demo_token") {
      const decodedUser = decodeToken(storedToken);
      if (decodedUser) {
        setToken(storedToken);
        setUser(decodedUser);
      } else {
        // Invalid token, remove it
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = (newToken: string) => {
    const decodedUser = decodeToken(newToken);
    if (decodedUser) {
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(decodedUser);
    }
  };

  const loginDemo = (demoUser: User) => {
    localStorage.setItem("demo_user", JSON.stringify(demoUser));
    setToken("demo_token");
    setUser(demoUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("demo_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        loginDemo,
        logout,
        isAuthenticated: !!user && !!token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


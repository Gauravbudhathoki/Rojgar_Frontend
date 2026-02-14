"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getUserData, clearAuthCookies } from "@/lib/actions/auth-action";

interface User {
  id?: string;
  email: string;
  username?: string;
  role?: "admin" | "user";
  profilePicture?: string | null;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string) => void;
  logout: () => void;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const userData = await getUserData();
      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      await refreshUser();
      setLoading(false);
    };
    loadUser();
  }, [refreshUser]);

  const login = (email: string) => {
    const newUser: User = { 
      email, 
      username: email.split("@")[0],
      role: email === "admin@rojgar.com" ? "admin" : "user" 
    };
    setUser(newUser);
  };

  const logout = async () => {
    try {
      await clearAuthCookies();
      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
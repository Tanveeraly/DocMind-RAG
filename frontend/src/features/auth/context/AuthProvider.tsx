"use client";

import { createContext, useCallback, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getToken, setToken, clearToken } from "@/lib/token";
import * as authService from "../services/auth.service";
import type { User } from "../types";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On first load, if a token exists, ask the backend who it belongs to
  useEffect(() => {
    if (!getToken()) {
      setLoading(false);
      return;
    }
    authService
      .getMe()
      .then(setUser)
      .catch(() => clearToken())
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { user, token } = await authService.login(email, password);
    setToken(token);
    setUser(user);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const { user, token } = await authService.register(name, email, password);
    setToken(token);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    router.replace("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
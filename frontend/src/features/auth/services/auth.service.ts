import { api } from "@/lib/api";
import type { AuthResponse, User } from "../types";

export const register = (name: string, email: string, password: string) =>
  api<AuthResponse>("/api/auth/register", { method: "POST", body: { name, email, password } });

export const login = (email: string, password: string) =>
  api<AuthResponse>("/api/auth/login", { method: "POST", body: { email, password } });

export async function getMe(): Promise<User> {
  const data = await api<{ user?: User } & Partial<User>>("/api/auth/me");
  return (data.user ?? data) as User; // works whether the backend returns { user } or the user itself
}
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ErrorBanner from "@/components/ui/ErrorBanner";
import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.replace("/chat");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <ErrorBanner message={error} />
      <Input id="email" label="Email" type="email" required autoComplete="email"
        value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      <Input id="password" label="Password" type="password" required autoComplete="current-password"
        value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
      <Button type="submit" loading={submitting}>Sign in</Button>
      <p className="text-center text-sm text-slate-400">
        No account?{" "}
        <Link href="/register" className="text-indigo-400 hover:underline">Create one</Link>
      </p>
    </form>
  );
}
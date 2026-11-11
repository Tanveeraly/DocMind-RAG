"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ErrorBanner from "@/components/ui/ErrorBanner";
import { useAuth } from "../hooks/useAuth";

export default function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await register(name, email, password);
      router.replace("/chat");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <ErrorBanner message={error} />
      <Input id="name" label="Name" required autoComplete="name"
        value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      <Input id="email" label="Email" type="email" required autoComplete="email"
        value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      <Input id="password" label="Password" type="password" required autoComplete="new-password"
        value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Choose a password" />
      <Button type="submit" loading={submitting}>Create account</Button>
      <p className="text-center text-sm text-slate-500">
        Already registered?{" "}
        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">Sign in</Link>
      </p>
    </form>
  );
}
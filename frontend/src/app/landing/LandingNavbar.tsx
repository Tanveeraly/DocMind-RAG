"use client";

import Link from "next/link";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function LandingNavbar() {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm">
            D
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            DocMind
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <a href="#features" className="transition-colors hover:text-slate-900">
            Features
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-slate-900">
            How It Works
          </a>
          <a href="#guide" className="transition-colors hover:text-slate-900">
            Guide
          </a>
          <a href="#tech" className="transition-colors hover:text-slate-900">
            Tech Stack
          </a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href="/chat"
              className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.98]"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-xl px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 sm:inline-flex"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.98]"
              >
                Get Started Free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

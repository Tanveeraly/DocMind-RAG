"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const [year, setYear] = useState(2024);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);
  return (
    <footer className="border-t border-slate-200/60 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
              D
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-900">
              DocMind
            </span>
            <span className="text-xs text-slate-400">— RAG Assistant</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-500">
            <Link href="/register" className="transition-colors hover:text-slate-900">
              Get Started
            </Link>
            <Link href="/login" className="transition-colors hover:text-slate-900">
              Log In
            </Link>
            <a href="#features" className="transition-colors hover:text-slate-900">
              Features
            </a>
            <a href="#guide" className="transition-colors hover:text-slate-900">
              Guide
            </a>
            <a
              href="https://github.com/Tanveeraly/docmind-rag"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-slate-900"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
          <p>
            Built with ❤️ by{" "}
            <a
              href="https://github.com/Tanveeraly"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-500 hover:text-slate-700"
            >
              Tanveer Ali
            </a>{" "}
            · © {year} DocMind. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

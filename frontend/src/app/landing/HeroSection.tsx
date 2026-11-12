"use client";

import Link from "next/link";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function HeroSection() {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-100/70 via-indigo-50/50 to-transparent blur-3xl" />
        <div className="absolute top-40 -right-32 h-72 w-72 rounded-full bg-blue-50/60 blur-3xl" />
        <div className="absolute top-60 -left-20 h-56 w-56 rounded-full bg-indigo-50/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
          </span>
          Powered by Gemini &amp; OpenAI
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Ask your documents
          <span className="relative ml-2">
            <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              anything
            </span>
            <span className="absolute -bottom-1 left-0 -z-0 h-3 w-full rounded bg-blue-100/60" />
          </span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
          Upload your PDFs, and DocMind will read, understand, and answer your
          questions — with{" "}
          <span className="font-semibold text-slate-800">exact source citations</span>{" "}
          from the document. No hallucinations, just grounded answers.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {user ? (
            <Link
              href="/chat"
              className="group inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 active:scale-[0.98]"
            >
              Go to Dashboard
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
          ) : (
            <>
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 active:scale-[0.98]"
              >
                Get Started — It&apos;s Free
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98]"
              >
                Log In
              </Link>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-8 border-t border-slate-200/60 pt-10">
          {[
            { value: "RAG", label: "Architecture" },
            { value: "2", label: "AI Providers" },
            { value: "100%", label: "Source-Grounded" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-extrabold text-blue-600">{stat.value}</p>
              <p className="mt-1 text-xs font-medium text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

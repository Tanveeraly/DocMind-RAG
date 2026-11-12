"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Spinner from "@/components/ui/Spinner";
import Sidebar from "@/components/layout/Sidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  if (loading || !user) return <Spinner />;

  return (
    <div className="flex h-screen h-[100dvh] w-full overflow-hidden bg-slate-50">
      {/* Sidebar with Desktop & Mobile Drawer */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Top Header (ChatGPT / Claude style) */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:scale-95"
            aria-label="Open menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href="/chat" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
              D
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-900">DocMind</span>
          </Link>

          <Link
            href="/chat"
            className="flex h-9 items-center gap-1.5 rounded-xl bg-blue-50 px-2.5 text-xs font-semibold text-blue-600 hover:bg-blue-100 active:scale-95"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>New</span>
          </Link>
        </header>

        {/* Page children */}
        <main className="flex flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

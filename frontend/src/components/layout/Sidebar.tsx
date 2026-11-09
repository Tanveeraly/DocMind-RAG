"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";

const links = [
  { href: "/chat", label: "Chat" },
  { href: "/documents", label: "Documents" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <div className="px-5 py-5 text-lg font-bold tracking-tight text-indigo-600">DocMind</div>

      <nav className="flex-1 space-y-1 px-3">
        {links.map((l) => {
          const active = pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                active ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <p className="truncate text-sm font-medium">{user?.name}</p>
        <p className="mb-3 truncate text-xs text-slate-500">{user?.email}</p>
        <button
          onClick={() => { logout(); router.push("/login"); }}
          className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
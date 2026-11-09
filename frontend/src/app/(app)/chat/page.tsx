"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function ChatPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="p-8">
      <p className="mb-4">Signed in as <b>{user?.name}</b> ({user?.email})</p>
      <button
        onClick={() => { logout(); router.push("/login"); }}
        className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white"
      >
        Log out
      </button>
    </div>
  );
}
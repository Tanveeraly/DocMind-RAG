"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useConversations } from "../hooks/useConversations";

export default function ConversationList() {
  const pathname = usePathname();
  const { conversations, loading } = useConversations(pathname);

  return (
    <div className="flex h-full w-64 flex-col border-r border-slate-200 bg-slate-50/50">
      <div className="p-3">
        <Link
          href="/chat"
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-2xs transition-all duration-150 hover:bg-blue-700 hover:shadow-xs active:scale-[0.99]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New chat
        </Link>
      </div>
      <ul className="flex-1 space-y-1 overflow-y-auto px-2 pb-3">
        {!loading && conversations.length === 0 && (
          <li className="px-3 py-4 text-center text-xs text-slate-400">No chats yet</li>
        )}
        {conversations.map((c) => (
          <li key={c.id}>
            <Link
              href={`/chat/${c.id}`}
              className={`block truncate rounded-xl px-3 py-2 text-sm transition-all duration-150 ${
                pathname === `/chat/${c.id}`
                  ? "bg-white font-semibold text-blue-700 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900"
              }`}
            >
              {c.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useConversations } from "../hooks/useConversations";

export default function ConversationList() {
  const pathname = usePathname();
  const { conversations, loading } = useConversations(pathname);

  return (
    <div className="flex h-full w-64 flex-col border-r border-slate-200 bg-slate-50">
      <div className="p-3">
        <Link
          href="/chat"
          className="block rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700"
        >
          + New chat
        </Link>
      </div>
      <ul className="flex-1 space-y-1 overflow-y-auto px-2 pb-3">
        {!loading && conversations.length === 0 && (
          <li className="px-3 py-2 text-sm text-slate-500">No chats yet</li>
        )}
        {conversations.map((c) => (
          <li key={c.id}>
            <Link
              href={`/chat/${c.id}`}
              className={`block truncate rounded-lg px-3 py-2 text-sm ${
                pathname === `/chat/${c.id}`
                  ? "bg-white font-medium text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
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
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useConversations } from "@/features/chat/hooks/useConversations";

type SidebarProps = {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

export default function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { conversations, loading: loadingConversations } = useConversations(pathname);

  const isChatActive = pathname.startsWith("/chat");
  const isDocsActive = pathname.startsWith("/documents");

  const handleLinkClick = () => {
    if (onMobileClose) onMobileClose();
  };

  const sidebarContent = (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Brand & Mobile Close Button */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3.5 sm:px-5">
        <Link href="/chat" onClick={handleLinkClick} className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-xs">
            D
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-slate-900">DocMind</span>
            <span className="text-[10px] font-medium text-slate-400">RAG Assistant</span>
          </div>
        </Link>
        {onMobileClose && (
          <button
            onClick={onMobileClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 md:hidden"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* New Chat Action Button (Claude / ChatGPT style) */}
      <div className="p-3">
        <Link
          href="/chat"
          onClick={handleLinkClick}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs transition-all duration-150 hover:bg-blue-700 active:scale-[0.99]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>New chat</span>
        </Link>
      </div>

      {/* Primary Navigation */}
      <nav className="space-y-1 px-3 pb-2">
        <Link
          href="/chat"
          onClick={handleLinkClick}
          className={`group flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-150 ${
            isChatActive
              ? "bg-blue-50 text-blue-700 shadow-2xs font-semibold"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <svg
            className={`h-4 w-4 transition-colors ${
              isChatActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          All Chats
        </Link>

        <Link
          href="/documents"
          onClick={handleLinkClick}
          className={`group flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-150 ${
            isDocsActive
              ? "bg-blue-50 text-blue-700 shadow-2xs font-semibold"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <svg
            className={`h-4 w-4 transition-colors ${
              isDocsActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Documents
        </Link>
      </nav>

      {/* Recent Chats List */}
      <div className="flex-1 overflow-hidden border-t border-slate-100 px-3 pt-3">
        <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Recent Chats
        </p>
        <div className="h-[calc(100%-28px)] space-y-1 overflow-y-auto pb-4">
          {!loadingConversations && conversations.length === 0 && (
            <p className="px-2 py-4 text-center text-xs text-slate-400">No chats yet</p>
          )}
          {conversations.map((c) => {
            const isSelected = pathname === `/chat/${c.id}`;
            return (
              <Link
                key={c.id}
                href={`/chat/${c.id}`}
                onClick={handleLinkClick}
                className={`group flex items-center gap-2 truncate rounded-xl px-2.5 py-1.5 text-xs transition-all duration-150 ${
                  isSelected
                    ? "bg-slate-100 font-semibold text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <svg
                  className={`h-3.5 w-3.5 shrink-0 ${
                    isSelected ? "text-blue-600" : "text-slate-400 group-hover:text-slate-500"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className="truncate">{c.title || "Untitled Chat"}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Info & Logout */}
      <div className="border-t border-slate-200 p-3 sm:p-4">
        <div className="mb-2.5 flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-800">{user?.name || "User"}</p>
            <p className="truncate text-[10px] text-slate-400">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-2xs transition-all duration-150 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.99]"
        >
          <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (overlay + drawer) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={onMobileClose}
          />
          {/* Slide-over Drawer */}
          <aside className="relative flex h-full w-72 max-w-[85vw] flex-col border-r border-slate-200 bg-white shadow-2xl transition-transform duration-200 ease-out">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}

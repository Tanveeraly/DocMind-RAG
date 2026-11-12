"use client";

import { useState } from "react";
import ErrorBanner from "@/components/ui/ErrorBanner";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useChat } from "../hooks/useChat";
import type { DocOption } from "../types";

type Props = {
  conversationId?: number;
  documents?: DocOption[];
  onConversationCreated?: (id: number) => void;
};

export default function ChatWindow({ conversationId, documents = [], onConversationCreated }: Props) {
  const { messages, loadingHistory, sending, error, send } = useChat(conversationId, onConversationCreated);
  const [documentId, setDocumentId] = useState("");

  const isNewChat = !conversationId && messages.length === 0;

  return (
    <div className="flex h-full w-full flex-1 flex-col overflow-hidden bg-white sm:bg-slate-50">
      {/* Document Context Selector (Claude / ChatGPT style model/context selector) */}
      {isNewChat && documents.length > 0 && (
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-3 py-2 sm:px-6 sm:py-2.5">
          <div className="flex items-center gap-2 overflow-x-auto text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-slate-500">
              <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden sm:inline">Document Context:</span>
              <span className="sm:hidden">Doc:</span>
            </span>
            <select
              id="scope"
              value={documentId}
              onChange={(e) => setDocumentId(e.target.value)}
              className="max-w-[180px] truncate rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 sm:max-w-xs"
            >
              <option value="">All Documents</option>
              {documents.map((d) => (
                <option key={d.id} value={d.id}>{d.original_name}</option>
              ))}
            </select>
          </div>
          <span className="hidden text-[11px] text-slate-400 sm:inline">
            {documents.length} available
          </span>
        </div>
      )}

      {/* Main Messages & Empty State Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {loadingHistory ? (
          <div className="flex flex-1 items-center justify-center">
            <Spinner />
          </div>
        ) : isNewChat ? (
          <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
            <div className="w-full max-w-md text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-xs sm:h-14 sm:w-14">
                <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                What can I help you find?
              </h2>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                {documents.length === 0
                  ? "You have no documents yet. Upload a PDF in Documents to start asking questions."
                  : "Ask any question about your uploaded documents. Answers will cite exact sources."}
              </p>
            </div>
          </div>
        ) : (
          <MessageList messages={messages} sending={sending} />
        )}
      </div>

      {/* Error notification if any */}
      {error && (
        <div className="mx-auto w-full max-w-3xl px-3 pb-2 sm:px-6">
          <ErrorBanner message={error} />
        </div>
      )}

      {/* Chat Input Container */}
      <div className="shrink-0">
        <ChatInput
          disabled={sending || loadingHistory}
          onSend={(q) => send(q, documentId ? Number(documentId) : undefined)}
        />
      </div>
    </div>
  );
}

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
    <div className="flex h-full flex-1 flex-col">
      {isNewChat && documents.length > 0 && (
        <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-6 py-3 text-sm">
          <label htmlFor="scope" className="text-slate-600">Chat with:</label>
          <select
            id="scope"
            value={documentId}
            onChange={(e) => setDocumentId(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-2 py-1.5"
          >
            <option value="">All my documents</option>
            {documents.map((d) => (
              <option key={d.id} value={d.id}>{d.original_name}</option>
            ))}
          </select>
        </div>
      )}

      {loadingHistory ? (
        <Spinner />
      ) : isNewChat ? (
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="max-w-md">
            <EmptyState
              title="Ask anything about your documents"
              hint={
                documents.length === 0
                  ? "You have no documents yet. Upload a PDF on the Documents page first."
                  : "For example: What are the main points of this document?"
              }
            />
          </div>
        </div>
      ) : (
        <MessageList messages={messages} sending={sending} />
      )}

      {error && (
        <div className="px-6 pb-2">
          <ErrorBanner message={error} />
        </div>
      )}

      <ChatInput
        disabled={sending || loadingHistory}
        onSend={(q) => send(q, documentId ? Number(documentId) : undefined)}
      />
    </div>
  );
}
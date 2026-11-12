"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import type { ChatMessage } from "../types";

type Props = { messages: ChatMessage[]; sending: boolean };

export default function MessageList({ messages, sending }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  return (
    <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-3xl space-y-4 sm:space-y-6">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {sending && (
          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-2xs">
              D
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200/90 bg-white px-4 py-3 text-xs font-medium text-slate-500 shadow-2xs sm:text-sm">
              <span className="flex h-2 w-2">
                <span className="h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
              </span>
              <span>Thinking and searching documents...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

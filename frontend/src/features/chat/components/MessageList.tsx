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
    <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
      ))}
      {sending && (
        <div className="flex justify-start">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-500">
            Thinking...
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
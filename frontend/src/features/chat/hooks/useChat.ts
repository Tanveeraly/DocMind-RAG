"use client";

import { useCallback, useEffect, useState } from "react";
import * as service from "../services/chat.service";
import type { ChatMessage } from "../types";

export function useChat(
  initialConversationId?: number,
  onConversationCreated?: (id: number) => void
) {
  const [conversationId, setConversationId] = useState<number | undefined>(initialConversationId);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(Boolean(initialConversationId));
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // Load saved messages when opening an existing conversation
  useEffect(() => {
    if (!initialConversationId) return;
    let cancelled = false;
    service
      .getMessages(initialConversationId)
      .then((rows) => !cancelled && setMessages(rows))
      .catch((err) => !cancelled && setError(err instanceof Error ? err.message : "Could not load chat"))
      .finally(() => !cancelled && setLoadingHistory(false));
    return () => {
      cancelled = true;
    };
  }, [initialConversationId]);

  const send = useCallback(
    async (question: string, documentId?: number) => {
      setError("");
      setMessages((m) => [...m, { id: `u-${Date.now()}`, role: "user", content: question }]);
      setSending(true);
      try {
        const res = await service.ask(question, conversationId, documentId);
        setMessages((m) => [
          ...m,
          { id: `a-${Date.now()}`, role: "assistant", content: res.answer, sources: res.sources },
        ]);
        if (!conversationId) {
          setConversationId(res.conversationId);
          onConversationCreated?.(res.conversationId);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setSending(false);
      }
    },
    [conversationId, onConversationCreated]
  );

  return { messages, loadingHistory, sending, error, send, conversationId };
}
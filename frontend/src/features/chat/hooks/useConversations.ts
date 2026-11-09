"use client";

import { useEffect, useState } from "react";
import * as service from "../services/chat.service";
import type { Conversation } from "../types";

// `refreshKey` changes whenever the URL changes, so the list refreshes after a new chat is created
export function useConversations(refreshKey: string) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    service
      .listConversations()
      .then((list) => !cancelled && setConversations(list))
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  return { conversations, loading };
}
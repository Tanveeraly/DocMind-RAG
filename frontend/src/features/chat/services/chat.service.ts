import { api } from "@/lib/api";
import type { AskResponse, ChatMessage, Conversation } from "../types";

export const ask = (question: string, conversationId?: number, documentId?: number) =>
  api<AskResponse>("/api/chat", {
    method: "POST",
    body: { question, conversationId, documentId },
  });

export const listConversations = async (): Promise<Conversation[]> =>
  (await api<{ conversations: Conversation[] }>("/api/chat/conversations")).conversations;

export const getMessages = async (conversationId: number): Promise<ChatMessage[]> =>
  (await api<{ messages: ChatMessage[] }>(`/api/chat/conversations/${conversationId}/messages`)).messages;
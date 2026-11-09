"use client";

import { useParams } from "next/navigation";
import ChatWindow from "@/features/chat/components/ChatWindow";

export default function ConversationPage() {
  const params = useParams<{ conversationId: string }>();
  const id = Number(params.conversationId);

  // key makes React reset the chat when you switch between conversations
  return <ChatWindow key={id} conversationId={id} />;
}
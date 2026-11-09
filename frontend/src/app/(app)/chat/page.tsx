"use client";

import { useRouter } from "next/navigation";
import ChatWindow from "@/features/chat/components/ChatWindow";
import { useDocuments } from "@/features/documents/hooks/useDocuments";

export default function NewChatPage() {
  const router = useRouter();
  const { documents } = useDocuments();

  return (
    <ChatWindow
      documents={documents}
      onConversationCreated={(id) => router.replace(`/chat/${id}`)}
    />
  );
}
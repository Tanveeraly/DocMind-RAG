export type Source = {
  chunkId: number;
  document: string;
  chunkIndex: number;
  score: number;
  snippet: string;
};

export type ChatMessage = {
  id: string | number;
  role: "user" | "assistant";
  content: string;
  sources?: Source[] | null;
};

export type Conversation = {
  id: number;
  document_id: number | null;
  title: string;
  created_at: string;
};

export type AskResponse = {
  conversationId: number;
  answer: string;
  sources: Source[];
};

// Minimal shape the chat needs for the "which document" dropdown
export type DocOption = { id: number; original_name: string };

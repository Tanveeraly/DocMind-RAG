import { api } from "@/lib/api";
import type { DocumentItem } from "../types";

export const listDocuments = async (): Promise<DocumentItem[]> =>
  (await api<{ documents: DocumentItem[] }>("/api/documents")).documents;

export const uploadDocument = (file: File) => {
  const form = new FormData();
  form.append("file", file); // the field name must be "file"
  return api<unknown>("/api/documents", { method: "POST", body: form });
};

export const deleteDocument = (id: number) =>
  api<unknown>(`/api/documents/${id}`, { method: "DELETE" });

export const getDownloadUrl = async (id: number): Promise<string> =>
  (await api<{ url: string }>(`/api/documents/${id}/download`)).url;
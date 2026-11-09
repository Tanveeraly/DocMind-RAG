"use client";

import { useCallback, useEffect, useState } from "react";
import * as service from "../services/documents.service";
import type { DocumentItem } from "../types";

export function useDocuments() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setError("");
      setDocuments(await service.listDocuments());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load documents");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const remove = useCallback(async (id: number) => {
    try {
      await service.deleteDocument(id);
      setDocuments((docs) => docs.filter((d) => d.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }, []);

  const download = useCallback(async (id: number) => {
    try {
      window.open(await service.getDownloadUrl(id), "_blank", "noopener");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed");
    }
  }, []);

  return { documents, loading, error, refresh, remove, download };
}
"use client";

import { useState } from "react";
import { uploadDocument } from "../services/documents.service";

const MAX_BYTES = 10 * 1024 * 1024;

export function useUpload(onDone: () => void) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setError("");
    if (file.type !== "application/pdf") return setError("Only PDF files are allowed.");
    if (file.size > MAX_BYTES) return setError("File is too large (max 10 MB).");

    setUploading(true);
    try {
      await uploadDocument(file);
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return { upload, uploading, error };
}
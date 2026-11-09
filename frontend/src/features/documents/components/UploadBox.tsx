"use client";

import { useRef, useState, type DragEvent } from "react";
import ErrorBanner from "@/components/ui/ErrorBanner";

type Props = { onFile: (file: File) => void; uploading: boolean; error: string };

export default function UploadBox({ onFile, uploading, error }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  }

  return (
    <div className="space-y-3">
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition ${
          dragging ? "border-indigo-500 bg-indigo-50" : "border-slate-300 bg-white hover:border-indigo-400"
        }`}
      >
        <p className="font-medium text-slate-700">
          {uploading ? "Uploading and processing your PDF..." : "Drag a PDF here, or click to choose"}
        </p>
        <p className="mt-1 text-sm text-slate-500">PDF only, up to 10 MB. Scanned PDFs are not supported yet.</p>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFile(file);
            e.target.value = ""; // allows choosing the same file again
          }}
        />
      </div>
      {error && <ErrorBanner message={error} />}
    </div>
  );
}
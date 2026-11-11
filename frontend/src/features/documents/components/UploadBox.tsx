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
        className={`group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-200 ${
          dragging
            ? "border-blue-500 bg-blue-50/70"
            : "border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50/50"
        }`}
      >
        <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
          dragging ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"
        }`}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-slate-800">
          {uploading ? "Uploading and processing your PDF..." : "Drag a PDF here, or click to browse"}
        </p>
        <p className="mt-1 text-xs text-slate-400">PDF documents only, up to 10 MB</p>
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
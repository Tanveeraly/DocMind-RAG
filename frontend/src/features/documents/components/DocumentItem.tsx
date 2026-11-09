import type { DocumentItem as Doc } from "../types";

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

type Props = { doc: Doc; onDownload: (id: number) => void; onDelete: (id: number) => void };

export default function DocumentItem({ doc, onDownload, onDelete }: Props) {
  return (
    <li className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4">
      <div className="min-w-0">
        <p className="truncate font-medium">{doc.original_name}</p>
        <p className="text-xs text-slate-500">
          {formatSize(doc.size_bytes)} · {doc.chunk_count} chunks · {new Date(doc.uploaded_at).toLocaleDateString()}
        </p>
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          onClick={() => onDownload(doc.id)}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100"
        >
          Download
        </button>
        <button
          onClick={() => confirm(`Delete "${doc.original_name}"?`) && onDelete(doc.id)}
          className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
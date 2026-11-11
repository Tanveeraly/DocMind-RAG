import type { Source } from "../types";

export default function SourcesPanel({ sources }: { sources: Source[] }) {
  if (!sources.length) return null;
  return (
    <details className="mt-2.5 text-xs text-slate-500">
      <summary className="cursor-pointer select-none font-semibold text-blue-600 hover:text-blue-700">
        Sources ({sources.length})
      </summary>
      <ul className="mt-2 space-y-2">
        {sources.map((s, i) => (
          <li key={s.chunkId} className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-2.5">
            <p className="font-semibold text-slate-700">
              [{i + 1}] {s.document} · match {(s.score * 100).toFixed(0)}%
            </p>
            <p className="mt-1 whitespace-pre-wrap text-slate-600">{s.snippet}...</p>
          </li>
        ))}
      </ul>
    </details>
  );
}
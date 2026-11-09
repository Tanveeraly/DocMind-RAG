import type { Source } from "../types";

export default function SourcesPanel({ sources }: { sources: Source[] }) {
  if (!sources.length) return null;
  return (
    <details className="mt-2 text-xs text-slate-500">
      <summary className="cursor-pointer select-none font-medium text-indigo-600">
        Sources ({sources.length})
      </summary>
      <ul className="mt-2 space-y-2">
        {sources.map((s, i) => (
          <li key={s.chunkId} className="rounded-lg border border-slate-200 bg-slate-50 p-2">
            <p className="font-medium text-slate-700">
              [{i + 1}] {s.document} · match {s.score}
            </p>
            <p className="mt-1 whitespace-pre-wrap">{s.snippet}...</p>
          </li>
        ))}
      </ul>
    </details>
  );
}
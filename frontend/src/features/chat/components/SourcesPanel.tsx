import type { Source } from "../types";

export default function SourcesPanel({ sources }: { sources: Source[] }) {
  if (!sources.length) return null;
  return (
    <details className="mt-2.5 text-xs text-slate-500">
      <summary className="cursor-pointer select-none font-semibold text-blue-600 transition-colors hover:text-blue-700">
        Sources ({sources.length})
      </summary>
      <ul className="mt-2 space-y-2">
        {sources.map((s, i) => (
          <li key={s.chunkId} className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-2.5">
            <p className="truncate font-semibold text-slate-700">
              [{i + 1}] {s.document} · match {(s.score * 100).toFixed(0)}%
            </p>
            <p className="mt-1 whitespace-pre-wrap break-words text-[11px] leading-relaxed text-slate-600 sm:text-xs">
              {s.snippet}...
            </p>
          </li>
        ))}
      </ul>
    </details>
  );
}

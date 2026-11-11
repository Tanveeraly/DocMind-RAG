"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";

type Props = { onSend: (text: string) => void; disabled: boolean };

export default function ChatInput({ onSend, disabled }: Props) {
  const [text, setText] = useState("");

  function submit(e?: FormEvent) {
    e?.preventDefault();
    const question = text.trim();
    if (!question || disabled) return;
    onSend(question);
    setText("");
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Enter sends, Shift+Enter adds a new line
      submit();
    }
  }

  return (
    <form onSubmit={submit} className="flex items-end gap-3 border-t border-slate-200 bg-white p-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        maxLength={1000}
        rows={1}
        placeholder="Ask a question about your documents..."
        className="max-h-40 min-h-[46px] flex-1 resize-none rounded-2xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-150 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="flex h-[46px] items-center justify-center gap-1.5 rounded-2xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-xs transition-all duration-150 hover:bg-blue-700 hover:shadow active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-blue-600 disabled:hover:shadow-none"
      >
        <span>Send</span>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </form>
  );
}
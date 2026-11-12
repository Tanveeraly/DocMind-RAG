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
      e.preventDefault(); // Enter sends, Shift+Enter adds new line
      submit();
    }
  }

  return (
    <div className="border-t border-slate-200/80 bg-white/95 px-3 py-3 backdrop-blur-sm sm:px-6 sm:py-4">
      <form onSubmit={submit} className="mx-auto max-w-3xl">
        <div className="relative flex items-end rounded-2xl border border-slate-300 bg-slate-50/70 p-1.5 shadow-xs transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 sm:rounded-3xl sm:p-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            maxLength={1000}
            rows={1}
            placeholder="Ask a question about your documents..."
            className="max-h-36 min-h-[42px] flex-1 resize-none bg-transparent px-3 py-2 text-base text-slate-900 placeholder:text-slate-400 outline-none sm:min-h-[46px] sm:px-4 sm:py-2.5 sm:text-sm"
          />
          <button
            type="submit"
            disabled={disabled || !text.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs transition-all duration-150 hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-blue-600 sm:h-10 sm:w-10 sm:rounded-2xl"
            aria-label="Send message"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
        <p className="mt-1.5 hidden text-center text-[11px] text-slate-400 sm:block">
          DocMind answers using your uploaded PDFs · Shift + Enter for a new line
        </p>
      </form>
    </div>
  );
}

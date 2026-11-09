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
        className="max-h-40 min-h-[44px] flex-1 resize-none rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}
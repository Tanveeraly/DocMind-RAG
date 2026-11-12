import SourcesPanel from "./SourcesPanel";
import type { ChatMessage } from "../types";

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[88%] rounded-2xl rounded-tr-xs bg-blue-600 px-4 py-2.5 text-sm leading-relaxed text-white shadow-xs sm:max-w-[78%] sm:px-4 sm:py-3">
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5 sm:gap-3">
      {/* Assistant Avatar */}
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-2xs">
        D
      </div>

      <div className="max-w-[90%] flex-1 overflow-hidden sm:max-w-[85%]">
        <div className="rounded-2xl rounded-tl-xs border border-slate-200/90 bg-white px-4 py-3 text-sm leading-relaxed text-slate-800 shadow-2xs">
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
          {message.sources && <SourcesPanel sources={message.sources} />}
        </div>
      </div>
    </div>
  );
}

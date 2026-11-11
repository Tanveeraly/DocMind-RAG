import SourcesPanel from "./SourcesPanel";
import type { ChatMessage } from "../types";

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} px-2`}>
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed transition-all ${
          isUser
            ? "bg-blue-600 text-white shadow-xs"
            : "border border-slate-200/90 bg-white text-slate-800 shadow-2xs"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {!isUser && message.sources && <SourcesPanel sources={message.sources} />}
      </div>
    </div>
  );
}
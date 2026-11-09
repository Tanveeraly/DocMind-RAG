import SourcesPanel from "./SourcesPanel";
import type { ChatMessage } from "../types";

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
          isUser ? "bg-indigo-600 text-white" : "border border-slate-200 bg-white text-slate-800"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {!isUser && message.sources && <SourcesPanel sources={message.sources} />}
      </div>
    </div>
  );
}
const techCategories = [
  {
    category: "AI & Machine Learning",
    items: [
      {
        name: "Google Gemini API",
        role: "Embeddings & Chat",
        detail: "gemini-embedding-001 for vector embeddings (768 dims) • gemini-3.1-flash-lite for chat answers",
        color: "blue",
      },
      {
        name: "OpenAI API",
        role: "Embeddings & Chat",
        detail: "text-embedding-3-small for vector embeddings • gpt-4o-mini for chat answers • Swappable provider",
        color: "emerald",
      },
    ],
  },
  {
    category: "Backend & Database",
    items: [
      {
        name: "Node.js + Express",
        role: "RESTful API Server",
        detail: "Modular architecture: routes → controllers → services → models",
        color: "lime",
      },
      {
        name: "PostgreSQL + pgvector",
        role: "Vector Database",
        detail: "Cosine similarity search on stored embeddings • 5 tables: users, documents, chunks, conversations, messages",
        color: "indigo",
      },
    ],
  },
  {
    category: "Frontend & Storage",
    items: [
      {
        name: "Next.js 16 + React 19",
        role: "Modern Web UI",
        detail: "Tailwind CSS v4 • TypeScript • App Router • Feature-based architecture",
        color: "cyan",
      },
      {
        name: "AWS S3",
        role: "Secure File Storage",
        detail: "Private bucket • Presigned URLs for downloads • IAM-scoped access",
        color: "amber",
      },
    ],
  },
];

const colorMap: Record<string, { bg: string; text: string; dot: string }> = {
  blue:    { bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-500" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  lime:    { bg: "bg-lime-50",    text: "text-lime-700",    dot: "bg-lime-500" },
  indigo:  { bg: "bg-indigo-50",  text: "text-indigo-700",  dot: "bg-indigo-500" },
  cyan:    { bg: "bg-cyan-50",    text: "text-cyan-700",    dot: "bg-cyan-500" },
  amber:   { bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-500" },
};

export default function TechStack() {
  return (
    <section id="tech" className="scroll-mt-20 bg-slate-50/70 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Powered By
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Built with Modern Tech Stack
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Two swappable AI providers, vector search, and a production-ready
            full-stack architecture.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-14 space-y-8">
          {techCategories.map((cat) => (
            <div key={cat.category}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                {cat.category}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {cat.items.map((item) => {
                  const c = colorMap[item.color];
                  return (
                    <div
                      key={item.name}
                      className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${c.dot}`} />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">
                              {item.name}
                            </h4>
                            <span
                              className={`rounded-full ${c.bg} px-2.5 py-0.5 text-[10px] font-semibold ${c.text}`}
                            >
                              {item.role}
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

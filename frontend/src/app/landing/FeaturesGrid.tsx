const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
    title: "Smart Document Upload",
    description:
      "Drag & drop your PDFs. DocMind extracts text, splits it into intelligent overlapping chunks, and indexes everything for instant retrieval.",
    color: "blue",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: "AI-Powered Semantic Search",
    description:
      "Your questions are converted to vector embeddings and matched against document chunks using cosine similarity — far beyond keyword search.",
    color: "indigo",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Conversational Q&A",
    description:
      "Chat naturally with your documents. Every answer comes with clickable source citations showing the exact passages used.",
    color: "violet",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Secure & Private",
    description:
      "Per-user data isolation, bcrypt-hashed passwords, JWT authentication, and private S3 storage with presigned URLs. Your data stays yours.",
    color: "emerald",
  },
];

const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
  blue:    { bg: "bg-blue-50",    icon: "text-blue-600",    border: "border-blue-100" },
  indigo:  { bg: "bg-indigo-50",  icon: "text-indigo-600",  border: "border-indigo-100" },
  violet:  { bg: "bg-violet-50",  icon: "text-violet-600",  border: "border-violet-100" },
  emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", border: "border-emerald-100" },
};

export default function FeaturesGrid() {
  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to chat with your documents
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            From upload to answers — DocMind handles the entire RAG pipeline
            so you can focus on getting insights.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => {
            const c = colorMap[f.color];
            return (
              <div
                key={f.title}
                className={`group relative rounded-2xl border ${c.border} bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md`}
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${c.bg} ${c.icon} transition-colors`}
                >
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

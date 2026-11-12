const steps = [
  {
    num: "01",
    title: "Upload",
    subtitle: "PDF → Secure Storage",
    description:
      "Your PDF is uploaded to a private AWS S3 bucket. The text content is extracted automatically.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    color: "blue",
  },
  {
    num: "02",
    title: "Chunk",
    subtitle: "Smart Text Splitting",
    description:
      "Text is split into overlapping chunks so no context is lost at the edges. Each chunk preserves meaning.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
    color: "indigo",
  },
  {
    num: "03",
    title: "Embed",
    subtitle: "Text → Vectors",
    description:
      "Each chunk is converted into a high-dimensional vector embedding using Gemini or OpenAI's embedding models.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "violet",
  },
  {
    num: "04",
    title: "Store",
    subtitle: "PostgreSQL + pgvector",
    description:
      "Vectors are stored in PostgreSQL with the pgvector extension, enabling lightning-fast similarity search.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    color: "cyan",
  },
  {
    num: "05",
    title: "Retrieve",
    subtitle: "Cosine Similarity Search",
    description:
      "Your question is embedded and matched against all stored chunks. The most relevant passages are retrieved.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    color: "amber",
  },
  {
    num: "06",
    title: "Answer",
    subtitle: "LLM Generates Response",
    description:
      "The retrieved chunks and your question are sent to the LLM. It generates a grounded answer citing exact sources.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: "emerald",
  },
];

const colorMap: Record<string, { bg: string; text: string; num: string; line: string }> = {
  blue:    { bg: "bg-blue-50",    text: "text-blue-600",    num: "text-blue-300",    line: "from-blue-400" },
  indigo:  { bg: "bg-indigo-50",  text: "text-indigo-600",  num: "text-indigo-300",  line: "from-indigo-400" },
  violet:  { bg: "bg-violet-50",  text: "text-violet-600",  num: "text-violet-300",  line: "from-violet-400" },
  cyan:    { bg: "bg-cyan-50",    text: "text-cyan-600",    num: "text-cyan-300",    line: "from-cyan-400" },
  amber:   { bg: "bg-amber-50",   text: "text-amber-600",   num: "text-amber-300",   line: "from-amber-400" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", num: "text-emerald-300", line: "from-emerald-400" },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-slate-50/70 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            The RAG Pipeline — From Upload to Answer
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Retrieval-Augmented Generation ensures every answer is backed by
            real content from your documents — no hallucinations.
          </p>
        </div>

        {/* Steps grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => {
            const c = colorMap[step.color];
            return (
              <div
                key={step.num}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Step number watermark */}
                <span className={`absolute -right-2 -top-4 text-7xl font-black ${c.num} opacity-30 select-none`}>
                  {step.num}
                </span>

                {/* Icon */}
                <div className={`relative mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${c.bg} ${c.text}`}>
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="relative text-base font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className={`mt-0.5 text-xs font-semibold ${c.text}`}>
                  {step.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Flow summary */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-slate-500">
          {["Upload PDF", "Extract & Chunk", "Generate Embeddings", "Store in pgvector", "Similarity Search", "LLM Answer"].map(
            (label, i, arr) => (
              <span key={label} className="flex items-center gap-2">
                <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm border border-slate-200/80">
                  {label}
                </span>
                {i < arr.length - 1 && (
                  <svg className="h-4 w-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}

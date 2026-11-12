const steps = [
  {
    step: 1,
    title: "Create Your Account",
    description:
      "Sign up with your email and password. Your account is secured with bcrypt-hashed passwords and JWT authentication.",
    detail: "Click \"Get Started\" above or go to the Register page.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    step: 2,
    title: "Upload Your PDF",
    description:
      "Navigate to the Documents page. Drag and drop your PDF file into the upload area, or click to browse your files.",
    detail: "Supported: PDF files up to 10 MB. The system will automatically extract and process the text.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    step: 3,
    title: "Wait for Processing",
    description:
      "DocMind extracts text from your PDF, splits it into smart overlapping chunks, generates vector embeddings, and stores them in the database.",
    detail: "This takes a few seconds depending on the document size. You'll see a progress indicator.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
      </svg>
    ),
  },
  {
    step: 4,
    title: "Start Chatting",
    description:
      "Go to the Chat page. Optionally select a specific document to search, or query across all your uploads. Type your question in natural language.",
    detail: "Example: \"What are the key findings in chapter 3?\" or \"Summarize the methodology section.\"",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    step: 5,
    title: "Get Grounded Answers",
    description:
      "The AI reads the most relevant passages from your document and generates an answer based ONLY on that content. No hallucinations.",
    detail: "Click \"Sources\" below any answer to see the exact passages and their similarity scores.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    step: 6,
    title: "Continue Anytime",
    description:
      "All your conversations are automatically saved. Come back anytime and pick up exactly where you left off.",
    detail: "Your conversation history is accessible from the Chat sidebar.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function HowToUse() {
  return (
    <section id="guide" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Step-by-Step Guide
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            How to Use DocMind
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            From sign-up to getting your first AI-powered answer — in under
            2 minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14">
          {/* Vertical line connector */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-blue-200 via-blue-100 to-transparent sm:block" />

          <div className="space-y-6">
            {steps.map((s) => (
              <div key={s.step} className="group relative flex gap-6">
                {/* Step circle */}
                <div className="relative z-10 hidden shrink-0 sm:block">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-blue-200 bg-white text-sm font-extrabold text-blue-600 shadow-sm transition-all group-hover:border-blue-400 group-hover:shadow-md">
                    {s.step}
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:flex md:hidden lg:flex">
                      {s.icon}
                    </div>
                    <div className="flex-1">
                      {/* Mobile step number */}
                      <p className="mb-1 text-xs font-bold text-blue-600 sm:hidden">
                        Step {s.step}
                      </p>
                      <h3 className="text-base font-bold text-slate-900">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {s.description}
                      </p>
                      <p className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-500">
                        💡 {s.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

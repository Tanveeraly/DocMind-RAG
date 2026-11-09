export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl">
        <h1 className="mb-1 text-2xl font-semibold text-white">DocMind</h1>
        <p className="mb-6 text-sm text-slate-400">Ask questions about your documents.</p>
        {children}
      </div>
    </main>
  );
}
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-lg shadow-sm">
            D
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">DocMind</h1>
          <p className="mt-1 text-sm text-slate-500">Ask questions and unlock insights from your documents</p>
        </div>
        {children}
      </div>
    </main>
  );
}
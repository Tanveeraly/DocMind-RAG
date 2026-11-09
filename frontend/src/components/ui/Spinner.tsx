export default function Spinner() {
  return (
    <div className="flex h-full min-h-[200px] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-indigo-500" />
    </div>
  );
}
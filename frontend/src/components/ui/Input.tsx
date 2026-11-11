import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string };

export default function Input({ label, id, className = "", ...rest }: Props) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
        {label}
      </label>
      <input
        id={id}
        {...rest}
        className={`w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-150 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 ${className}`}
      />
    </div>
  );
}
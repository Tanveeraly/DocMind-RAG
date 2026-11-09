import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean };

export default function Button({ loading, children, disabled, className = "", ...rest }: Props) {
  return (
    <button
      disabled={disabled || loading}
      className={`w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...rest}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
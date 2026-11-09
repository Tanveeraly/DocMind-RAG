import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import AuthProvider from "@/features/auth/context/AuthProvider";

export const metadata: Metadata = {
  title: "DocMind",
  description: "Ask questions about your documents",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
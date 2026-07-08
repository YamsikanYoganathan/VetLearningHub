import React from "react";
import Link from "next/link";
import { Cross, BookOpen, Search, ShieldCheck } from "lucide-react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Sleek, clinical-grade navigation bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-sm group-hover:bg-teal-700 transition-colors">
                  <Cross className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-serif font-semibold text-lg text-slate-900 tracking-tight block leading-none">
                    VetLearnHub
                  </span>
                  <span className="text-[11px] font-sans font-medium text-teal-600 tracking-wider uppercase block mt-0.5">
                    Clinical Reference
                  </span>
                </div>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/#subjects"
                className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
              >
                Clinical Subjects
              </Link>
              <Link
                href="/#protocols"
                className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
              >
                Diagnostic Protocols
              </Link>
              <Link
                href="/#formulary"
                className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
              >
                Formulary Notes
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/overview"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>Admin Workbench</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-grow">{children}</main>

      {/* Footer with clinical disclaimer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="max-w-md">
              <div className="flex items-center gap-2 text-white mb-2">
                <Cross className="w-5 h-5 text-teal-400" />
                <span className="font-serif font-semibold text-lg tracking-tight">VetLearnHub</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400">
                A disciplined veterinary reference platform. Clinical protocols, dosage guidelines, and diagnostic notes are curated for professional veterinary use and veterinary medical education.
              </p>
            </div>
            <div className="text-xs text-slate-500 md:text-right space-y-1">
              <p>© {new Date().getFullYear()} Veterinary Learning Hub. All clinical rights reserved.</p>
              <p>Designed with intentional typography and clinical rigor.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

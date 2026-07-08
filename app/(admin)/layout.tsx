import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Settings, 
  LogOut, 
  Cross, 
  ChevronRight,
  ShieldAlert,
  PlusCircle
} from "lucide-react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Administrative Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 flex-shrink-0">
        <div>
          {/* Brand header */}
          <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800 bg-slate-950/40">
            <div className="w-8 h-8 rounded-md bg-teal-600 flex items-center justify-center text-white font-bold">
              <Cross className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif font-semibold text-white tracking-tight block leading-none">
                VetLearnHub
              </span>
              <span className="text-[10px] font-sans font-semibold text-teal-400 tracking-widest uppercase block mt-1">
                Admin Workbench
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1">
            <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Clinical Management
            </div>
            <Link
              href="/overview"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium bg-slate-800 text-white transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-teal-400" />
              <span>Overview</span>
            </Link>
            <Link
              href="/subjects"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800/60 hover:text-white transition-colors"
            >
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>Subjects Catalog</span>
            </Link>
            <Link
              href="/notes"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800/60 hover:text-white transition-colors"
            >
              <FileText className="w-4 h-4 text-teal-400" />
              <span>Clinical Notes</span>
            </Link>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 transition-all"
          >
            <span>Return to Public Hub</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <div className="px-3 py-2 text-[11px] text-slate-500 flex items-center justify-between">
            <span>RLS Protected</span>
            <span className="inline-block w-2 h-2 rounded-full bg-teal-500"></span>
          </div>
        </div>
      </aside>

      {/* Main Admin Workbench Content */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="font-semibold text-slate-900">Workbench</span>
            <span>/</span>
            <span className="text-teal-600 font-medium">System Overview</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium shadow-sm transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Author New Protocol</span>
            </button>
          </div>
        </header>

        <main className="flex-grow p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

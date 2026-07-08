"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  LogOut,
  Cross,
  ChevronRight,
  PlusCircle,
  Loader2,
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // If on login page, skip auth check redirect
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/admin/login");
      } else {
        setAuthenticated(true);
        setLoading(false);
      }
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (pathname !== "/admin/login") {
        if (!session) {
          router.replace("/admin/login");
        } else {
          setAuthenticated(true);
          setLoading(false);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  // If rendering login page, return children without admin sidebar/header
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-slate-50 font-sans">{children}</div>;
  }

  // Show loading spinner while verifying session
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-sky-600 mb-3" />
        <span className="text-sm font-semibold text-slate-600 tracking-normal">
          Verifying editorial credentials...
        </span>
      </div>
    );
  }

  // Determine active nav item
  const isOverview = pathname === "/admin";
  const isSubjects = pathname.startsWith("/admin/subjects");
  const isNotes = pathname.startsWith("/admin/notes");

  // Determine page title for clean header
  let pageTitle = "Overview";
  if (isSubjects) pageTitle = "Subjects Catalog";
  if (isNotes) pageTitle = "Clinical Notes & Sub-sections";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold shadow-sm">
            <Cross className="w-4 h-4" />
          </div>
          <div>
            <span className="font-sans font-bold text-slate-900 block leading-none text-base">
              VetLearnHub
            </span>
            <span className="text-[10px] font-semibold text-sky-600 uppercase block mt-0.5">
              Admin Workbench
            </span>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Administrative Sidebar - Clean Light Theme per Task 3 */}
      <aside
        className={`${
          mobileMenuOpen ? "flex" : "hidden"
        } md:flex w-full md:w-64 bg-slate-50 text-slate-700 flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 flex-shrink-0 z-20`}
      >
        <div>
          {/* Desktop Brand Header */}
          <div className="hidden md:flex h-16 px-6 items-center gap-3 border-b border-slate-200 bg-white/50">
            <div className="w-8 h-8 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold shadow-sm">
              <Cross className="w-4 h-4" />
            </div>
            <div>
              <span className="font-sans font-bold text-slate-900 tracking-normal block leading-none text-base">
                VetLearnHub
              </span>
              <span className="text-[10px] font-semibold text-sky-600 tracking-normal uppercase block mt-1">
                Admin Workbench
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-normal text-slate-400">
              Clinical Management
            </div>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all tracking-normal ${
                isOverview
                  ? "bg-sky-50 text-sky-700 shadow-sm border border-sky-200/60"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <LayoutDashboard className={`w-4 h-4 ${isOverview ? "text-sky-600" : "text-slate-400"}`} />
              <span>Overview</span>
            </Link>
            <Link
              href="/admin/subjects"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all tracking-normal ${
                isSubjects
                  ? "bg-sky-50 text-sky-700 shadow-sm border border-sky-200/60"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <BookOpen className={`w-4 h-4 ${isSubjects ? "text-sky-600" : "text-slate-400"}`} />
              <span>Subjects Catalog</span>
            </Link>
            <Link
              href="/admin/notes"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all tracking-normal ${
                isNotes
                  ? "bg-sky-50 text-sky-700 shadow-sm border border-sky-200/60"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <FileText className={`w-4 h-4 ${isNotes ? "text-sky-600" : "text-slate-400"}`} />
              <span>Clinical Notes</span>
            </Link>
          </div>
        </div>

        {/* Footer Actions & Sign Out Button per Task 2 */}
        <div className="p-4 border-t border-slate-200 space-y-2 bg-white/50">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-all tracking-normal border border-transparent hover:border-red-200"
          >
            <span className="flex items-center gap-2">
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out of CMS</span>
            </span>
          </button>
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-100 transition-all tracking-normal"
          >
            <span>Return to Public Hub</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <div className="px-3 py-1 text-[11px] text-slate-400 flex items-center justify-between tracking-normal">
            <span>RLS Session Active</span>
            <span className="inline-block w-2 h-2 rounded-full bg-teal-500"></span>
          </div>
        </div>
      </aside>

      {/* Main Admin Workbench Content */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Top Bar - Clean Header per Task 3 */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-sans text-slate-600 truncate tracking-normal">
            <span className="font-bold text-slate-900">Workbench</span>
            <span className="text-slate-300">/</span>
            <span className="text-sky-600 font-semibold truncate">{pageTitle}</span>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              href="/admin/notes/new"
              className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all tracking-normal"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Author Protocol</span>
            </Link>
          </div>
        </header>

        {/* Generous Padding p-6 sm:p-8 lg:p-10 per Task 3 */}
        <main className="flex-grow p-6 sm:p-8 lg:p-10 overflow-y-auto bg-slate-50">{children}</main>
      </div>
    </div>
  );
}

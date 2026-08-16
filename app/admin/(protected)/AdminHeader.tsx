"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusCircle } from "lucide-react";

export default function AdminHeader() {
  const pathname = usePathname();

  let pageTitle = "Dashboard";
  if (pathname.startsWith("/admin/academic-areas")) pageTitle = "Academic Areas";
  if (pathname.startsWith("/admin/subjects")) pageTitle = "Subjects";
  if (pathname.startsWith("/admin/topics")) pageTitle = "Topics";
  if (pathname.startsWith("/admin/notes")) pageTitle = "Notes";

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shadow-sm sticky top-0 z-10">
      <div className="flex items-center gap-2 text-xs sm:text-sm font-sans text-slate-600 truncate">
        <span className="font-bold text-slate-900">CMS</span>
        <span className="text-slate-300">/</span>
        <span className="text-teal-600 font-semibold truncate">{pageTitle}</span>
      </div>

      <div className="flex items-center gap-4 flex-shrink-0">
        <Link
          href="/admin/notes/new"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="hidden sm:inline">New Note</span>
        </Link>
      </div>
    </header>
  );
}

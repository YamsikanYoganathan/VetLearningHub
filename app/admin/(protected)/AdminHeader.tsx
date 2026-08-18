"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminHeader() {
  const pathname = usePathname();

  let pageTitle = "Overview";
  if (pathname.startsWith("/admin/academic-areas")) pageTitle = "Academic Areas";
  if (pathname.startsWith("/admin/subjects")) pageTitle = "Subjects";
  if (pathname.startsWith("/admin/topics")) pageTitle = "Topics";
  if (pathname.startsWith("/admin/notes")) pageTitle = "Notes & Protocols";

  const isCreating = pathname.endsWith("/new");

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-10 shadow-xs">
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 truncate">
        <span className="font-semibold text-slate-900">CMS Workspace</span>
        <span className="text-slate-300">/</span>
        <span className="font-medium text-slate-700 truncate">{pageTitle}</span>
        {isCreating && (
          <>
            <span className="text-slate-300">/</span>
            <span className="text-primary font-medium">New</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Link
          id="cms-tour-search"
          href="/search"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-medium transition-colors"
          title="Search all curriculum notes"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span>Search Index</span>
          <kbd className="text-[10px] font-semibold text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200 ml-1">
            ⌘K
          </kbd>
        </Link>

        {!pathname.startsWith("/admin/notes/new") && (
          <Button asChild size="sm">
            <Link href="/admin/notes/new">
              <Plus className="w-3.5 h-3.5" />
              <span>Create Note</span>
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}

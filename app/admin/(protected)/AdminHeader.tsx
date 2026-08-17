"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
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

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
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-border px-4 sm:px-8 flex items-center justify-between sticky top-0 z-10 shadow-2xs">
      <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary truncate">
        <span className="font-semibold text-foreground">CMS Workspace</span>
        <span className="text-border">/</span>
        <span className="font-semibold text-primary truncate">{pageTitle}</span>
        {isCreating && (
          <>
            <span className="text-border">/</span>
            <span className="text-secondary font-semibold">New</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        {!pathname.startsWith("/admin/notes/new") && (
          <Button asChild size="sm" className="rounded-xl">
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

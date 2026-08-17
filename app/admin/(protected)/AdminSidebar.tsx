"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Layers,
  Tags,
  LogOut,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AdminSidebarProps {
  role: "admin" | "editor";
  email?: string;
}

export default function AdminSidebar({ role, email }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isOverview = pathname === "/admin";
  const isAreas = pathname.startsWith("/admin/academic-areas");
  const isSubjects = pathname.startsWith("/admin/subjects");
  const isTopics = pathname.startsWith("/admin/topics");
  const isNotes = pathname.startsWith("/admin/notes");

  const navItems = [
    {
      label: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      isActive: isOverview,
    },
    {
      label: "Academic Areas",
      href: "/admin/academic-areas",
      icon: Layers,
      isActive: isAreas,
    },
    {
      label: "Subjects",
      href: "/admin/subjects",
      icon: BookOpen,
      isActive: isSubjects,
    },
    {
      label: "Topics",
      href: "/admin/topics",
      icon: Tags,
      isActive: isTopics,
    },
    {
      label: "Notes & Protocols",
      href: "/admin/notes",
      icon: FileText,
      isActive: isNotes,
    },
  ];

  return (
    <>
      {/* Mobile Sticky Top Header */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-xs sticky top-0 z-30">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="/logo-desktop.svg"
            alt="Vetulan Service"
            width={120}
            height={40}
            className="h-8 w-auto"
            priority
          />
          <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
            CMS
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-md text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={mobileMenuOpen ? "Close sidebar menu" : "Open sidebar menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Main Desktop & Collapsible Mobile Sidebar */}
      <aside
        id="cms-tour-sidebar"
        className={`${mobileMenuOpen ? "flex" : "hidden"
          } md:flex w-full md:w-64 bg-slate-50/90 flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 shrink-0 z-20 md:sticky md:top-0 md:h-screen`}
      >
        <div className="overflow-y-auto">
          {/* Desktop Brand Header */}
          <div className="hidden md:flex h-16 px-6 items-center justify-between border-b border-slate-200 bg-white">
            <Link href="/admin" className="flex items-center gap-2.5">
              <Image
                src="/logo-desktop.svg"
                alt="Vetulan Service"
                width={140}
                height={35}
                className="h-7 w-auto"
                priority
              />
            </Link>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200/80 px-1.5 py-0.5 rounded">
              CMS
            </span>
          </div>

          {/* Navigation Links */}
          <div className="p-3 sm:p-4 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Workspace
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${item.isActive
                    ? "bg-sky-50 text-sky-800 font-semibold border border-sky-100"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                >
                  <Icon
                    className={`w-4 h-4 ${item.isActive ? "text-primary" : "text-slate-400"
                      }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* User Footer Profile & Actions */}
        <div className="p-4 border-t border-slate-200 bg-white space-y-3">
          <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200/80">
            <p
              className="text-xs font-semibold text-slate-800 truncate"
              title={email}
            >
              {email}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={role === "admin" ? "primary" : "secondary"}>
                {role.toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="space-y-1">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between w-full px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                <span>View Public Platform</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="w-full flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}

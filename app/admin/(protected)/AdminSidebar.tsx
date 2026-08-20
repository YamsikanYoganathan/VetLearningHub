"use client";

import React, { useState, useEffect } from "react";
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
      {/* Mobile Top App Bar */}
      <div className="md:hidden bg-white border-b border-border px-4 h-16 flex items-center justify-between shadow-xs sticky top-0 z-30">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="/logo-desktop.svg"
            alt="Vetulan Service"
            width={160}
            height={40}
            className="h-12 sm:h-14 object-contain"
            priority
          />
        </Link>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-text-secondary hover:bg-surface-subtle focus-ring cursor-pointer"
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

      {/* Mobile Slide-in Drawer (When mobileMenuOpen) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Box */}
          <div className="relative w-4/5 max-w-xs bg-white h-full flex flex-col justify-between p-5 z-10 shadow-float animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Image
                    src="/logo-mobile.svg"
                    alt="Vetulan"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                  <span className="font-bold text-sm text-foreground">CMS Workspace</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-text-secondary hover:bg-surface-subtle cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${item.isActive
                        ? "bg-primary-subtle text-primary border border-primary/20"
                        : "text-text-secondary hover:bg-surface-subtle hover:text-foreground"
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-2">
              <Link
                href="/"
                target="_blank"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:bg-surface-subtle"
              >
                <span>View Public Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-error hover:bg-red-50 text-left cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Desktop Sidebar */}
      <aside
        id="cms-tour-sidebar"
        className="hidden md:flex w-64 bg-white flex-col justify-between border-r border-border shrink-0 z-20 sticky top-0 h-screen shadow-2xs"
      >
        <div className="overflow-y-auto">
          {/* Desktop Brand Header */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-border bg-white">
            <Link href="/admin" className="flex items-center gap-2">
              <Image
                src="/logo-desktop.svg"
                alt="Vetulan Service"
                width={160}
                height={40}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-primary-subtle text-primary border border-primary/20 px-2 py-0.5 rounded-full">
              CMS
            </span>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1.5">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Workspace
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${item.isActive
                    ? "bg-primary-subtle text-primary border border-primary/20 shadow-2xs"
                    : "text-text-secondary hover:bg-surface-subtle hover:text-foreground"
                    }`}
                >
                  <Icon
                    className={`w-4 h-4 ${item.isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* User Footer Profile & Actions */}
        <div className="p-4 border-t border-border bg-surface-subtle/50 space-y-3">
          <div className="px-3.5 py-2.5 bg-white rounded-2xl border border-border shadow-2xs">
            <p
              className="text-xs font-bold text-foreground truncate"
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
              className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:bg-white hover:text-primary transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                <span>View Public Platform</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            </Link>

            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="w-full flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-error hover:bg-rose-50 transition-colors text-left cursor-pointer"
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

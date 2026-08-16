"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Layers, 
  Settings, 
  Tags, 
  LogOut, 
  ChevronRight, 
  Menu, 
  X,
  ShieldAlert
} from "lucide-react";

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

  return (
    <>
      {/* Mobile Header Toggle */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold">
            V
          </div>
          <div>
            <span className="font-bold text-slate-900 block leading-none text-base">VetLearnHub</span>
            <span className="text-[10px] font-semibold text-teal-600 uppercase block mt-0.5">Admin CMS</span>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-slate-100 text-slate-700"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <aside
        className={`${
          mobileMenuOpen ? "flex" : "hidden"
        } md:flex w-full md:w-64 bg-slate-50 flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 flex-shrink-0 z-20 sticky top-0 h-screen`}
      >
        <div className="overflow-y-auto">
          {/* Desktop Brand */}
          <div className="hidden md:flex h-16 px-6 items-center gap-3 border-b border-slate-200 bg-white">
            <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold">
              V
            </div>
            <div>
              <span className="font-bold text-slate-900 block leading-none text-base">VetLearnHub</span>
              <span className="text-[10px] font-semibold text-teal-600 uppercase block mt-1">Admin CMS</span>
            </div>
          </div>

          <div className="p-4 space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Dashboard</div>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isOverview ? "bg-teal-50 text-teal-700 shadow-sm border border-teal-200/60" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <LayoutDashboard className={`w-4 h-4 ${isOverview ? "text-teal-600" : "text-slate-400"}`} />
              <span>Overview</span>
            </Link>

            <div className="px-3 pt-4 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Content</div>
            
            {role === "admin" && (
              <>
                <Link
                  href="/admin/academic-areas"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isAreas ? "bg-teal-50 text-teal-700 shadow-sm border border-teal-200/60" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Layers className={`w-4 h-4 ${isAreas ? "text-teal-600" : "text-slate-400"}`} />
                  <span>Academic Areas</span>
                </Link>
                <Link
                  href="/admin/subjects"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isSubjects ? "bg-teal-50 text-teal-700 shadow-sm border border-teal-200/60" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <BookOpen className={`w-4 h-4 ${isSubjects ? "text-teal-600" : "text-slate-400"}`} />
                  <span>Subjects</span>
                </Link>
                <Link
                  href="/admin/topics"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isTopics ? "bg-teal-50 text-teal-700 shadow-sm border border-teal-200/60" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Tags className={`w-4 h-4 ${isTopics ? "text-teal-600" : "text-slate-400"}`} />
                  <span>Topics</span>
                </Link>
              </>
            )}

            <Link
              href="/admin/notes"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isNotes ? "bg-teal-50 text-teal-700 shadow-sm border border-teal-200/60" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <FileText className={`w-4 h-4 ${isNotes ? "text-teal-600" : "text-slate-400"}`} />
              <span>Notes</span>
            </Link>

          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-white/50 space-y-2">
          <div className="px-3 py-2 mb-2 bg-slate-100 rounded-lg">
            <p className="text-xs font-medium text-slate-800 truncate">{email}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1 mt-0.5">
              {role === 'admin' && <ShieldAlert className="w-3 h-3 text-amber-500" />}
              {role} role
            </p>
          </div>
          
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-all border border-transparent hover:border-red-200"
            >
              <span className="flex items-center gap-2">
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </span>
            </button>
          </form>
          
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-100 transition-all"
          >
            <span>Public Hub</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>
    </>
  );
}

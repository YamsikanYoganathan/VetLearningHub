"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  X,
  Search,
  ArrowRight,
  BookOpen,
  Info,
  Mail,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Layers,
} from "lucide-react";
import { type AcademicArea } from "@/lib/supabase/queries";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  areas: AcademicArea[];
}

export function MobileNavDrawer({ isOpen, onClose, areas }: MobileNavDrawerProps) {
  const pathname = usePathname();
  const [isSyllabusAccordionOpen, setIsSyllabusAccordionOpen] = useState(true);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-between bg-white animate-in fade-in duration-200">
      {/* Mobile Drawer Header */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-slate-200">
        <Link href="/" onClick={onClose} className="flex items-center gap-2">
          <Image
            src="/logo-mobile.svg"
            alt="Vetulan Service"
            width={48}
            height={48}
            className="h-12 w-auto"
            priority
          />
          <span className="font-bold text-base text-slate-900 tracking-tight">
            Vetulan
          </span>
        </Link>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
          aria-label="Close navigation menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Navigation Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
        {/* Mobile Search Button */}
        <Link
          href="/search"
          onClick={onClose}
          className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 text-sm font-medium hover:border-slate-300 transition-colors shadow-2xs"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-primary" />
            <span className="text-slate-500">Search notes & topics...</span>
          </div>
          <kbd className="text-[11px] font-semibold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
            /
          </kbd>
        </Link>

        {/* Primary Navigation List */}
        <nav aria-label="Mobile Navigation" className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
            Navigation
          </div>

          {/* Syllabus Accordion */}
          <div className="rounded-xl border border-slate-200/90 overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => setIsSyllabusAccordionOpen((prev) => !prev)}
              aria-expanded={isSyllabusAccordionOpen}
              className="flex items-center justify-between w-full p-3.5 text-left text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-primary flex items-center justify-center border border-sky-100">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>Syllabus</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isSyllabusAccordionOpen ? "rotate-180 text-primary" : ""
                  }`}
              />
            </button>

            {isSyllabusAccordionOpen && (
              <div className="px-3.5 pb-3.5 pt-1 space-y-1 bg-slate-50/50 border-t border-slate-100">
                <Link
                  href="/subjects"
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-primary hover:bg-sky-50 transition-colors"
                >
                  <span>View All Subjects & Areas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {areas.map((area, idx) => (
                  <Link
                    key={area.id}
                    href={`/subjects/${area.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-100/80 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-slate-400">
                        0{idx + 1}
                      </span>
                      <span>{area.name}</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* About Us Link */}
          <Link
            href="/about"
            onClick={onClose}
            className={`flex items-center justify-between p-3.5 rounded-xl border transition-colors ${pathname === "/about"
                ? "bg-sky-50/80 border-sky-200 text-sky-900 font-semibold"
                : "bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50"
              }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-700 flex items-center justify-center border border-slate-200/80">
                <Info className="w-4 h-4 text-slate-600" />
              </div>
              <span className="text-sm font-semibold text-slate-900">About Us</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          {/* Contact Us Link */}
          <Link
            href="/contact"
            onClick={onClose}
            className={`flex items-center justify-between p-3.5 rounded-xl border transition-colors ${pathname === "/contact"
                ? "bg-sky-50/80 border-sky-200 text-sky-900 font-semibold"
                : "bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50"
              }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-700 flex items-center justify-center border border-slate-200/80">
                <Mail className="w-4 h-4 text-slate-600" />
              </div>
              <span className="text-sm font-semibold text-slate-900">Contact Us</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
        </nav>
      </div>

      {/* Mobile Footer Drawer Actions */}
      <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
        <Link
          href="/contact"
          onClick={onClose}
          className="flex items-center justify-center w-full py-2.5 px-4 rounded-lg bg-slate-900 text-white font-medium text-xs sm:text-sm hover:bg-slate-800 transition-colors shadow-xs"
        >
          <span>Contact Us</span>
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Link>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <Link
            href="/admin/login"
            onClick={onClose}
            className="hover:text-slate-800 transition-colors inline-flex items-center gap-1"
          >
            <span>Admin CMS</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>
          <span className="text-[11px] text-slate-400">© {new Date().getFullYear()} Vetulan</span>
        </div>
      </div>
    </div>
  );
}

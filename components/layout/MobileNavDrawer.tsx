"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  Sparkles,
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!isOpen || !mounted) return null;

  const drawerContent = (
    <div className="fixed inset-0 z-[100] md:hidden flex flex-col justify-between bg-white text-foreground overflow-hidden w-full h-[100dvh]">
      {/* Mobile Drawer Header */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-border bg-white shrink-0">
        <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
          <Image
            src="/logo-desktop.svg"
            alt="Vetulan Service"
            width={160}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-lg text-text-secondary hover:bg-surface-subtle hover:text-foreground focus-ring transition-colors cursor-pointer"
          aria-label="Close navigation menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 bg-white">
        {/* Mobile Search Button */}
        <Link
          href="/search"
          onClick={onClose}
          className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-border bg-surface-subtle text-text-secondary text-sm font-medium hover:border-sky-300 hover:text-primary transition-colors shadow-2xs"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground text-xs sm:text-sm">Search notes & topics...</span>
          </div>
          <kbd className="text-[11px] font-semibold text-muted-foreground bg-white px-2 py-0.5 rounded border border-border">
            /
          </kbd>
        </Link>

        {/* Primary Navigation List */}
        <nav aria-label="Mobile Navigation" className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-1 mb-2">
            Curriculum
          </div>

          {/* Syllabus Accordion */}
          <div className="rounded-xl border border-border overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => setIsSyllabusAccordionOpen((prev) => !prev)}
              aria-expanded={isSyllabusAccordionOpen}
              className="flex items-center justify-between w-full p-3.5 text-left text-sm font-semibold text-foreground hover:bg-surface-subtle transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-subtle text-primary flex items-center justify-center border border-primary/20">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>Syllabus Directory</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                  isSyllabusAccordionOpen ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            {isSyllabusAccordionOpen && (
              <div className="px-3.5 pb-3.5 pt-1 space-y-1 bg-surface-subtle/40 border-t border-border">
                <Link
                  href="/subjects"
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-primary hover:bg-primary-subtle transition-colors"
                >
                  <span>View All Disciplines</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {areas.map((area, idx) => (
                  <Link
                    key={area.id}
                    href={`/subjects/${area.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-text-secondary hover:bg-white hover:text-foreground transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        0{idx + 1}
                      </span>
                      <span>{area.name}</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Resources Link */}
          <Link
            href="/resources"
            onClick={onClose}
            className={`flex items-center justify-between p-3.5 rounded-xl border transition-colors ${
              pathname === "/resources"
                ? "bg-primary-subtle border-primary/30 text-primary font-semibold"
                : "bg-white border-border text-foreground hover:bg-surface-subtle"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-subtle text-text-secondary flex items-center justify-center border border-border">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-semibold">Clinical Resources</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Link>

          {/* About Us Link */}
          <Link
            href="/about"
            onClick={onClose}
            className={`flex items-center justify-between p-3.5 rounded-xl border transition-colors ${
              pathname === "/about"
                ? "bg-primary-subtle border-primary/30 text-primary font-semibold"
                : "bg-white border-border text-foreground hover:bg-surface-subtle"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-subtle text-text-secondary flex items-center justify-center border border-border">
                <Info className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold">About Us</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Link>

          {/* Contact Us Link */}
          <Link
            href="/contact"
            onClick={onClose}
            className={`flex items-center justify-between p-3.5 rounded-xl border transition-colors ${
              pathname === "/contact"
                ? "bg-primary-subtle border-primary/30 text-primary font-semibold"
                : "bg-white border-border text-foreground hover:bg-surface-subtle"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-subtle text-text-secondary flex items-center justify-center border border-border">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold">Contact Us</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Link>
        </nav>
      </div>

      {/* Mobile Footer Drawer Actions */}
      <div className="p-5 border-t border-border bg-surface-subtle/70 space-y-3 shrink-0">
        <Link
          href="/contact"
          onClick={onClose}
          className="flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-primary text-white font-semibold text-xs sm:text-sm hover:bg-primary-hover transition-all shadow-xs"
        >
          <span>Contact Us</span>
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Link>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
          <Link
            href="/admin/login"
            onClick={onClose}
            className="hover:text-foreground transition-colors inline-flex items-center gap-1 font-semibold"
          >
            <span>Admin CMS</span>
            <ExternalLink className="w-3 h-3 text-muted-foreground" />
          </Link>
          <span className="text-[11px] font-medium">© {new Date().getFullYear()} Vetulan</span>
        </div>
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
}

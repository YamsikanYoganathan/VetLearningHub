"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, ChevronDown } from "lucide-react";
import { SyllabusMegaMenu } from "./SyllabusMegaMenu";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { type AcademicArea } from "@/lib/supabase/queries";

export interface HeaderProps {
  areas?: AcademicArea[];
}

export function Header({ areas = [] }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSyllabusOpen, setIsSyllabusOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMac, setIsMac] = React.useState(false);
  const syllabusHoverTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  // Detect OS for keyboard shortcut display
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMac(navigator.userAgent.toUpperCase().indexOf("MAC") >= 0);
    }
  }, []);

  // Scroll listener for sticky header transition (200-300ms)
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mega menu on route change
  React.useEffect(() => {
    setIsSyllabusOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Global keyboard shortcut ('/' or 'Cmd+K' / 'Ctrl+K')
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "/" || (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey))) &&
        !["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        router.push("/search");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  // Hover handlers with debounce intent delay
  const handleSyllabusMouseEnter = () => {
    if (syllabusHoverTimeout.current) clearTimeout(syllabusHoverTimeout.current);
    setIsSyllabusOpen(true);
  };

  const handleSyllabusMouseLeave = () => {
    syllabusHoverTimeout.current = setTimeout(() => {
      setIsSyllabusOpen(false);
    }, 150);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${isScrolled
        ? "border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs py-0"
        : "border-b border-slate-200/60 bg-white py-0.5"
        }`}
      onMouseLeave={handleSyllabusMouseLeave}
    >
      <div className="container-page relative flex h-16 items-center justify-between">
        {/* Zone 1 (Left): Brand Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded py-1 transition-opacity hover:opacity-95"
            aria-label="Vetulan Service Home"
          >
            {/* Desktop Brand Logo (150-175px width target) */}
            <Image
              src="/logo-desktop.svg"
              alt="Vetulan Service"
              width={160}
              height={40}
              className="hidden sm:block h-16 w-auto"
              priority
            />
            {/* Mobile Dedicated Brand Logo (42-48px target) */}
            <div className="flex sm:hidden items-center gap-2">
              <Image
                src="/logo-desktop.svg"
                alt="Vetulan Service"
                width={40}
                height={40}
                className="h-12 w-auto"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Zone 2 (Center): Genuinely Visually Centered Primary Links (Syllabus, About Us, Contact Us) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-[13.5px] font-medium text-slate-600 absolute left-1/2 -translate-x-1/2"
        >
          {/* Syllabus Item with Mega Menu Trigger */}
          <div
            id="tour-syllabus-target"
            className="relative"
            onMouseEnter={handleSyllabusMouseEnter}
          >
            <button
              type="button"
              onClick={() => setIsSyllabusOpen((prev) => !prev)}
              aria-expanded={isSyllabusOpen}
              aria-controls="syllabus-mega-menu"
              className={`inline-flex items-center gap-1.5 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded ${isSyllabusOpen || pathname.startsWith("/subjects")
                ? "text-slate-900 font-semibold"
                : "hover:text-slate-900"
                }`}
            >
              <span>Syllabus</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isSyllabusOpen ? "rotate-180 text-primary" : ""
                  }`}
              />
            </button>
          </div>

          {/* About Us Link */}
          <Link
            href="/about"
            className={`py-1.5 transition-colors relative ${pathname === "/about"
              ? "text-slate-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary after:rounded-full"
              : "hover:text-slate-900"
              }`}
          >
            About Us
          </Link>

          {/* Contact Us Link */}
          <Link
            href="/contact"
            className={`py-1.5 transition-colors relative ${pathname === "/contact"
              ? "text-slate-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary after:rounded-full"
              : "hover:text-slate-900"
              }`}
          >
            Contact Us
          </Link>
        </nav>

        {/* Zone 3 (Right): Search Trigger */}
        <div className="flex items-center gap-2.5">
          {/* Desktop Search Button */}
          <Link
            href="/search"
            className="hidden sm:inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/80 text-slate-600 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-2xs group"
            aria-label="Search clinical notes"
          >
            <Search className="h-3.5 w-3.5 text-slate-400 group-hover:text-primary transition-colors" />
            <span className="text-slate-600 group-hover:text-slate-900 font-medium">
              Search
            </span>
            <kbd className="hidden lg:inline-block rounded bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 border border-slate-200 shadow-2xs">
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
          </Link>

          {/* Mobile Search Icon */}
          <Link
            href="/search"
            className="sm:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
            aria-label="Search notes"
          >
            <Search className="h-5 w-5" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="inline-flex md:hidden items-center justify-center p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Syllabus Full-Width Mega Menu Panel */}
      <SyllabusMegaMenu
        isOpen={isSyllabusOpen}
        onClose={() => setIsSyllabusOpen(false)}
        areas={areas}
      />

      {/* Dedicated Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        areas={areas}
      />
    </header>
  );
}

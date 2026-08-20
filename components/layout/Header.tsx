"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, ChevronDown, ArrowRight } from "lucide-react";
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

  // Scroll listener for sticky header transition
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
        ? "border-b border-border bg-white/95 backdrop-blur-xl shadow-xs py-0"
        : "border-b border-border/60 bg-white/80 backdrop-blur-md py-0.5"
        }`}
      onMouseLeave={handleSyllabusMouseLeave}
    >
      <div className="container-page relative flex h-16 items-center justify-between">
        {/* Zone 1 (Left): Brand Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center focus-ring rounded-lg py-1 transition-opacity hover:opacity-90"
            aria-label="Vetulan Service Home"
          >
            {/* Desktop Brand Logo */}
            <Image
              src="/logo-desktop.svg"
              alt="Vetulan Service"
              width={160}
              height={40}
              className="hidden sm:block h-12 lg:h-14 w-auto object-contain"
              priority
            />
            {/* Mobile Brand Logo */}
            <div className="flex sm:hidden items-center gap-2">
              <Image
                src="/logo-desktop.svg"
                alt="Vetulan Service"
                width={160}
                height={40}
                className="h-12 lg:h-14 object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Zone 2 (Center): Visually Centered Primary Links (Syllabus, About Us, Resources) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-[13.5px] font-medium text-text-secondary absolute left-1/2 -translate-x-1/2"
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
              className={`inline-flex items-center gap-1.5 py-1.5 transition-colors focus-ring rounded-md cursor-pointer ${isSyllabusOpen || pathname.startsWith("/subjects")
                ? "text-primary font-semibold"
                : "hover:text-foreground"
                }`}
            >
              <span>Syllabus</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${isSyllabusOpen ? "rotate-180 text-primary" : ""
                  }`}
              />
            </button>
          </div>

          {/* About Us Link */}
          <Link
            href="/about"
            className={`py-1.5 transition-colors relative ${pathname === "/about"
              ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary after:rounded-full"
              : "hover:text-foreground"
              }`}
          >
            About Us
          </Link>

          {/* Resources Link */}
          <Link
            href="/resources"
            className={`py-1.5 transition-colors relative ${pathname === "/resources"
              ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary after:rounded-full"
              : "hover:text-foreground"
              }`}
          >
            Resources
          </Link>
        </nav>

        {/* Zone 3 (Right): Search & Contact Us CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Contact Us CTA Button */}
          <Link
            href="/contact"
            className="sm:inline-flex hidden items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-hover text-sm font-semibold shadow-xs transition-all active:scale-[0.98]"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-3 h-3 ml-0.5" />
          </Link>

          {/* Mobile Menu Drawer Toggle Button */}
          <button
            type="button"
            className="inline-flex md:hidden items-center justify-center p-2 rounded-xl text-text-secondary hover:bg-surface-subtle hover:text-foreground focus-ring transition-colors cursor-pointer"
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

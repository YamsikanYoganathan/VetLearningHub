import React from "react";
import Link from "next/link";
import { Shield, Cross, BookOpen } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-4">
          {/* Left side: Clean logo using font-sans (Inter Tight), normal tracking, sky-600 per Task 1 & 2 */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-sm group-hover:bg-sky-700 transition-colors flex-shrink-0">
              <Cross className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-sans font-bold text-base sm:text-lg md:text-xl text-slate-900 tracking-normal leading-none group-hover:text-sky-600 transition-colors truncate">
                Veterinary Learning Hub
              </span>
              <span className="text-[9px] sm:text-[10px] font-sans font-semibold text-sky-600 tracking-normal uppercase mt-0.5 truncate">
                Clinical Knowledge Base
              </span>
            </div>
          </Link>

          {/* Right side: Navigation Links (Search bar removed; Subjects link hidden on mobile < md) */}
          <nav className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
            <Link
              href="/#subjects"
              className="hidden md:flex items-center gap-1.5 text-sm font-sans font-semibold text-slate-700 hover:text-sky-600 transition-colors tracking-normal"
            >
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>Subjects</span>
            </Link>
            <Link
              href="/admin"
              className="text-xs font-sans font-semibold text-slate-700 hover:text-white transition-all px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-600 flex items-center gap-1.5 shadow-sm tracking-normal"
            >
              <Shield className="w-3.5 h-3.5 text-sky-600 group-hover:text-white" />
              <span>Admin CMS</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

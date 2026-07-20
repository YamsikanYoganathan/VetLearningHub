import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-4">
          {/* Left side: Clean logo per Task 2 */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden flex-shrink-0">
              <Image src="/logo.svg" alt="Vet Learning Hub Logo" width={36} height={36} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-sans font-bold text-base sm:text-lg md:text-xl text-slate-900 tracking-normal leading-none group-hover:text-sky-600 transition-colors truncate">
                Vet Learning Hub
              </span>
              <span className="text-[9px] sm:text-[10px] font-sans font-semibold text-sky-600 tracking-normal uppercase mt-0.5 truncate">
                Clinical Knowledge Base
              </span>
            </div>
          </Link>

          {/* Right side: Navigation Links (Admin removed per Task 3) */}
          <nav className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
            <Link
              href="/#subjects"
              className="hidden md:flex items-center gap-1.5 text-sm font-sans font-semibold text-slate-700 hover:text-sky-600 transition-colors tracking-normal"
            >
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>Subjects</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

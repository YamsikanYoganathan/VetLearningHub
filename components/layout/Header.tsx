"use client"

import * as React from "react"
import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-page flex h-14 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-lg text-primary tracking-tight">Vetulan Service</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-text-secondary hover:text-primary transition-colors">Home</Link>
            <Link href="/subjects" className="text-text-secondary hover:text-primary transition-colors">Subjects</Link>
          </nav>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2 text-text-secondary">
            <Search className="h-4 w-4" />
            <span className="hidden lg:inline-block">Search notes...</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} aria-label="Toggle Menu" aria-expanded={isMobileMenuOpen} aria-controls="mobile-menu">
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-border-subtle bg-background p-4 flex flex-col space-y-4">
          <Link href="/" onClick={toggleMenu} className="text-sm font-medium text-text-secondary hover:text-primary">Home</Link>
          <Link href="/subjects" onClick={toggleMenu} className="text-sm font-medium text-text-secondary hover:text-primary">Subjects</Link>
          <Button variant="outline" size="sm" className="justify-start gap-2">
            <Search className="h-4 w-4" />
            Search notes
          </Button>
        </div>
      )}
    </header>
  )
}

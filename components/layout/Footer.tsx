import * as React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface py-12 mt-auto">
      <div className="container-page grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="font-semibold text-primary mb-4">Vetulan Service</h3>
          <p className="text-sm text-text-secondary max-w-sm">
            A premium clinical knowledge base for veterinary professionals. Streamlined protocols, evidence-based practices, and fast reference materials.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4">Resources</h4>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li><Link href="/subjects" className="hover:text-primary">Subjects</Link></li>
            <li><Link href="#" className="hover:text-primary">Guidelines</Link></li>
            <li><Link href="#" className="hover:text-primary">Pharmacology</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li><Link href="#" className="hover:text-primary">About</Link></li>
            <li><Link href="#" className="hover:text-primary">Contact</Link></li>
            <li><Link href="#" className="hover:text-primary">Terms & Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-page mt-12 pt-8 border-t border-border-subtle text-xs text-text-secondary flex flex-col md:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} Vetulan Service. All rights reserved.</p>
        <p className="mt-2 md:mt-0">For educational purposes only. Not a substitute for clinical judgment.</p>
      </div>
    </footer>
  )
}

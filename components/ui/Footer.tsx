import React from "react";
import Link from "next/link";
import { Cross, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 sm:py-24 border-t border-slate-800 mt-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-sm group-hover:bg-sky-500 transition-colors">
                <Cross className="w-5 h-5" />
              </div>
              <div>
                <span className="font-sans font-bold text-lg text-white tracking-normal block leading-none">
                  Veterinary Learning Hub
                </span>
                <span className="text-[10px] font-sans font-semibold text-sky-400 tracking-normal uppercase block mt-1">
                  Clinical Knowledge Base
                </span>
              </div>
            </Link>
            <p className="font-serif text-sm leading-[1.4] text-slate-400 max-w-sm mb-6">
              The definitive, clinical knowledge base for veterinary students and professionals. Access streamlined protocols, anatomical references, and pharmacological data instantly.
            </p>
          </div>

          {/* Quick Links - Exact 5 Subjects per Task 3 */}
          <div className="space-y-3">
            <h4 className="font-sans font-bold text-xs uppercase tracking-normal text-white">
              Clinical Disciplines
            </h4>
            <ul className="space-y-2 font-sans text-sm text-slate-400 tracking-normal">
              <li>
                <Link href="/subjects/canine-anatomy" className="hover:text-sky-400 transition-colors">
                  Canine Anatomy & Surgery
                </Link>
              </li>
              <li>
                <Link href="/subjects/feline-internal-medicine" className="hover:text-sky-400 transition-colors">
                  Feline Internal Medicine
                </Link>
              </li>
              <li>
                <Link href="/subjects/clinical-pharmacology" className="hover:text-sky-400 transition-colors">
                  Clinical Pharmacology
                </Link>
              </li>
              <li>
                <Link href="/subjects/equine-orthopedics" className="hover:text-sky-400 transition-colors">
                  Equine Lameness & Orthopedics
                </Link>
              </li>
              <li>
                <Link href="/subjects/emergency-critical-care" className="hover:text-sky-400 transition-colors">
                  Emergency & Critical Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Administrative & Legal */}
          <div className="space-y-3">
            <h4 className="font-sans font-bold text-xs uppercase tracking-normal text-white">
              Platform & Governance
            </h4>
            <ul className="space-y-2 font-sans text-sm text-slate-400 tracking-normal">
              <li>
                <Link href="/admin" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-sky-400" />
                  <span>Admin Workbench</span>
                </Link>
              </li>
              <li>
                <span className="text-slate-500">Peer Review Standards</span>
              </li>
              <li>
                <span className="text-slate-500">Formulary Guidelines</span>
              </li>
              <li>
                <span className="text-slate-500">RLS Privacy Protocol</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-500 tracking-normal">
          <p className="mb-0">© {new Date().getFullYear()} Veterinary Learning Hub. All clinical rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Designed with Inter Tight & Aleo typography</span>
            <span>•</span>
            <span className="text-sky-400 font-medium">Clinical Rigor Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/70 py-14 sm:py-16 mt-auto">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          {/* Brand & Mission Column */}
          <div className="md:col-span-6 lg:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-desktop.svg"
                alt="Vetulan Service"
                width={360}
                height={140}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              An authoritative, structured veterinary academic learning platform and clinical reference for students, educators, and veterinary surgeons.
            </p>
          </div>

          {/* Academic Directory Links */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-900 mb-4">
              Curriculum
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link
                  href="/subjects"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  Academic Areas & Subjects
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About the Platform
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Clinical Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Access & Legal */}
          <div className="md:col-span-3 lg:col-span-4">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-900 mb-4">
              Platform & Governance
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Terms of Reference
                </Link>
              </li>
              {/* Mandatory: Admin CMS Link */}
              <li className="pt-1">
                <Link
                  href="/admin/login"
                  className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Admin CMS</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    ↗
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Vetulan Service. All rights reserved.</p>
          <p className="max-w-md text-slate-400 sm:text-right">
            For academic study and educational reference only. Consult licensed clinical protocols and professional diagnostic guidance for clinical interventions.
            <br />
            Made By Yamsikan Yoganathan
          </p>
        </div>
      </div>
    </footer>
  );
}

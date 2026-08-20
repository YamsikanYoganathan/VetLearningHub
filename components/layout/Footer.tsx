import * as React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-subtle/50 py-14 sm:py-16 mt-auto">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          {/* Brand & Mission Column */}
          <div className="md:col-span-6 lg:col-span-5 space-y-3">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-desktop.svg"
                alt="Vetulan Service"
                width={160}
                height={40}
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              The authoritative veterinary medical learning and clinical reference platform for students, educators, and veterinary surgeons.
            </p>
          </div>

          {/* Academic Directory Links */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-foreground mb-4">
              Curriculum
            </h3>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>
                <Link
                  href="/subjects"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1 font-medium"
                >
                  Syllabus Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="hover:text-primary transition-colors font-medium"
                >
                  Clinical Resources & Matrices
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors font-medium"
                >
                  About the Platform
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors font-medium"
                >
                  Contact & Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Access & Legal */}
          <div className="md:col-span-3 lg:col-span-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-foreground mb-4">
              Platform & Governance
            </h3>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors font-medium"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors font-medium"
                >
                  Terms of Reference
                </Link>
              </li>
              {/* Admin CMS Link */}
              <li className="pt-2">
                <Link
                  href="/admin/login"
                  className="text-xs font-semibold text-text-secondary hover:text-primary transition-colors inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-white shadow-2xs group"
                >
                  <span>Admin CMS Workspace</span>
                  <span className="text-[10px] text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    ↗
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Copyright and Portfolio Credit Link */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Vetulan Service. All rights reserved.</p>
          <p className="text-text-secondary sm:text-right">
            <span>Made by </span>
            <a
              href="https://yamsikan-yoganathan.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-secondary hover:underline underline-offset-2 transition-colors"
            >
              Yamsikan Yoganathan
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

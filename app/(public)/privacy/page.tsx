import React from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Vetulan Service",
  description:
    "Privacy policy and data protection governance for Vetulan Service.",
};

export default function PrivacyPage() {
  return (
    <div className="container-page py-10 sm:py-14 max-w-3xl">
      <Breadcrumb
        items={[{ label: "Privacy Policy", isCurrent: true }]}
        className="mb-8"
      />

      <div className="mb-10 pb-6 border-b border-slate-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
            1. Open Reference Platform & Data Minimization
          </h2>
          <p>
            Vetulan Service is structured as an open educational knowledge base. Readers can freely navigate published disciplines, subject modules, and clinical notes without registration, mandatory telemetry, or personal data tracking.
          </p>
        </section>

        <section className="pt-6 border-t border-slate-200">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
            2. Authentication & Editorial Session Management
          </h2>
          <p>
            For authorized editors and administrators, session authentication is handled securely via Supabase Auth with encrypted HTTP-only session tokens. We do not place commercial tracking or analytics cookies on public reading routes.
          </p>
        </section>

        <section className="pt-6 border-t border-slate-200">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
            3. Infrastructure & Cryptographic Security
          </h2>
          <p>
            All network communication is secured using TLS/HTTPS encryption. Administrative operations and database access are strictly isolated through PostgreSQL Row Level Security (RLS) policies.
          </p>
        </section>
      </div>
    </div>
  );
}

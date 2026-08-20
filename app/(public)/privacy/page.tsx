import React from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ShieldCheck } from "lucide-react";
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

      <div className="mb-10 pb-6 border-b border-border">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* Clinical Reference Notice */}
      <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200 text-xs sm:text-sm text-sky-950 mb-8 flex items-start gap-3.5 shadow-2xs">
        <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-sky-900">Academic & Educational Reference Notice</p>
          <p className="leading-relaxed text-sky-800">
            For academic study and educational reference only. Consult licensed clinical protocols and professional diagnostic guidance for clinical interventions.
          </p>
        </div>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-text-secondary leading-relaxed">
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight mb-2">
            1. Open Reference Platform & Data Minimization
          </h2>
          <p>
            Vetulan Service is structured as an open educational knowledge base. Readers can freely navigate published disciplines, subject modules, and clinical notes without registration, mandatory telemetry, or personal data tracking.
          </p>
        </section>

        <section className="pt-6 border-t border-border">
          <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight mb-2">
            2. Authentication & Editorial Session Management
          </h2>
          <p>
            For authorized editors and administrators, session authentication is handled securely via Supabase Auth with encrypted HTTP-only session tokens. We do not place commercial tracking or analytics cookies on public reading routes.
          </p>
        </section>

        <section className="pt-6 border-t border-border">
          <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight mb-2">
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

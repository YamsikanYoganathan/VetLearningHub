import React from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Mail, MessageSquare, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Feedback | Vetulan Service",
  description:
    "Get in touch with the Vetulan Service academic team for editorial feedback, corrections, or platform support.",
};

export default function ContactPage() {
  return (
    <div className="container-page py-10 sm:py-14 max-w-3xl">
      <Breadcrumb
        items={[{ label: "Clinical Contact", isCurrent: true }]}
        className="mb-8"
      />

      <div className="mb-10 pb-6 border-b border-border/80">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-4">
          Contact & Feedback
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed text-balance">
          We welcome collaboration, peer reviews, syllabus feedback, and technical inquiries from veterinary faculty, students, and clinical practitioners.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="p-6 sm:p-7 rounded-2xl border border-border/80 bg-white shadow-2xs hover:border-sky-300 transition-all">
          <div className="w-10 h-10 rounded-xl bg-primary-subtle text-primary flex items-center justify-center mb-4 border border-primary/20 shadow-2xs">
            <Mail className="w-4 h-4" />
          </div>
          <h2 className="font-bold text-base text-foreground mb-1">
            Academic & Editorial Inquiries
          </h2>
          <p className="text-xs text-text-secondary mb-4 leading-relaxed">
            For peer review suggestions, factual corrections, or curriculum inquiries:
          </p>
          <a
            href="mailto:vetulanservice@gmail.com"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline underline-offset-4"
          >
            <span>vetulanservice@gmail.com</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="p-6 sm:p-7 rounded-2xl border border-border/80 bg-white shadow-2xs hover:border-teal-300 transition-all">
          <div className="w-10 h-10 rounded-xl bg-secondary-subtle text-secondary flex items-center justify-center mb-4 border border-secondary/20 shadow-2xs">
            <MessageSquare className="w-4 h-4" />
          </div>
          <h2 className="font-bold text-base text-foreground mb-1">
            Platform & Technical Support
          </h2>
          <p className="text-xs text-text-secondary mb-4 leading-relaxed">
            For platform access, performance reports, or technical assistance:
          </p>
          <a
            href="mailto:vetulanservice@gmail.com"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline underline-offset-4"
          >
            <span>vetulanservice@gmail.com</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

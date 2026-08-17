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

      <div className="mb-10 pb-6 border-b border-slate-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
          Contact Feedback
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
          We welcome collaboration, peer reviews, syllabus feedback, and technical inquiries from veterinary faculty, students, and clinical practitioners.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 transition-colors">
          <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center mb-4 border border-sky-100">
            <Mail className="w-4 h-4 text-primary" />
          </div>
          <h2 className="font-bold text-base text-slate-900 mb-1">
            Academic & Editorial Inquiries
          </h2>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            For peer review suggestions, factual corrections, or curriculum inquiries:
          </p>
          <a
            href="mailto:vetulanservice@gmail.com"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline underline-offset-4"
          >
            <span>vetulanservice@gmail.com</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 transition-colors">
          <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-4 border border-teal-100">
            <MessageSquare className="w-4 h-4 text-teal-600" />
          </div>
          <h2 className="font-bold text-base text-slate-900 mb-1">
            Platform & Technical Support
          </h2>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            For platform access, performance reports, or technical assistance:
          </p>
          <a
            href="mailto:vetulanservice@gmail.com"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline underline-offset-4"
          >
            <span>vetulanservice@gmail.com</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

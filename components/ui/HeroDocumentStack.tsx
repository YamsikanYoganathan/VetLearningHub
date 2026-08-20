"use client";

import React from "react";
import {
  FileText,
  Activity,
  HeartPulse,
  Sparkles,
  Layers,
  FileCheck,
  CheckCircle2,
  Clock,
  Download,
} from "lucide-react";

export function HeroDocumentStack() {
  return (
    <div className="relative w-full max-w-lg mx-auto select-none py-6 lg:py-0">
      {/* Ambient Radial Lighting Behind Stack */}
      <div
        className="absolute -inset-4 bg-gradient-to-r from-sky-400/20 via-teal-400/15 to-indigo-400/20 blur-3xl -z-10 rounded-full pointer-events-none opacity-80"
        aria-hidden="true"
      />

      {/* Layer 3: Backmost Angled Protocol Card */}
      <div
        className="absolute top-12 left-4 right-4 bg-white/90 rounded-2xl border border-sky-200/80 shadow-md p-6 transform -rotate-3 transition-transform duration-300 pointer-events-none hidden sm:block opacity-60"
        aria-hidden="true"
      >
        <div className="flex items-center justify-between pb-3 border-b border-border/80 text-xs">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-secondary" />
            <span className="font-semibold text-foreground">Surgical Protocol</span>
          </div>
          <span className="font-mono text-[11px] text-muted-foreground">REF-SURG-04</span>
        </div>
      </div>

      {/* Layer 2: Mid Supporting Protocol Card (Pharmacology Matrix) */}
      <div
        className="relative sm:absolute top-6 left-2 right-2 bg-white/95 rounded-2xl border border-border/80 shadow-md p-5 sm:p-6 transform sm:rotate-2 transition-transform duration-300 pointer-events-none opacity-90 hidden sm:block"
        aria-hidden="true"
      >
        <div className="flex items-center justify-between pb-3 border-b border-border/80 text-xs">
          <div className="flex items-center gap-2 text-secondary font-semibold">
            <HeartPulse className="w-4 h-4 text-secondary" />
            <span>Emergency Canine Formulary</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Active Formulary
          </span>
        </div>
      </div>

      {/* Layer 1: Foreground Flagship Reference Note Card */}
      <div className="relative bg-white rounded-2xl border border-sky-300/80 shadow-lg p-6 sm:p-7 space-y-5 transition-all duration-300 hover:shadow-xl">
        {/* Card Top Row: Meta Tags & Clinical Badges */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-subtle text-primary flex items-center justify-center border border-primary/20 shadow-2xs">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                Clinical Study Module
              </span>
              <span className="text-xs font-semibold text-foreground">
                Small Animal Internal Medicine
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-primary-subtle px-2.5 py-0.5 rounded-full border border-primary/20">
              <Sparkles className="w-3 h-3 text-primary" />
              <span>Verified Note</span>
            </span>
          </div>
        </div>

        {/* Note Title & Clinical Summary */}
        <div className="space-y-1.5">
          <h4 className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug">
            Acute Canine Pancreatitis: Diagnostic & Fluid Algorithm
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
            Sequential triage criteria, Spec cPL evaluation, abdominal ultrasonography landmarks, and balanced isotonic resuscitation rates.
          </p>
        </div>

        {/* Diagnostic Key Pearl Box */}
        <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200/80 space-y-1.5 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-sky-900">
            <Activity className="w-3.5 h-3.5 text-primary" />
            <span>Key Diagnostic Indicator</span>
          </div>
          <p className="text-[11px] text-sky-950 leading-relaxed">
            Spec cPL &gt; 400 µg/L provides 90%+ diagnostic specificity for acute necrotizing pancreatitis in canines presenting with vomiting and cranial abdominal pain.
          </p>
        </div>

        {/* Attached PDF Resource Preview */}
        <div className="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-surface-subtle/70">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-bold text-[10px] flex items-center justify-center shrink-0">
              PDF
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">
                Fluid_Resuscitation_Matrix_2026.pdf
              </p>
              <p className="text-[10px] text-muted-foreground">
                2.4 MB • Complete Diagnostic Algorithm
              </p>
            </div>
          </div>

          <div className="p-1.5 rounded-lg text-primary hover:bg-primary-subtle transition-colors shrink-0">
            <Download className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card Footer: Clinical Signoff */}
        <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground border-t border-border/80 font-medium">
          <div className="flex items-center gap-1.5 text-text-secondary">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <span>6 min study read</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Peer Referenced</span>
          </div>
        </div>
      </div>
    </div>
  );
}

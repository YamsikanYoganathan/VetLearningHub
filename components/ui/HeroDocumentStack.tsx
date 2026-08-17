"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { FileText, CheckCircle2, ArrowRight, Activity, BookOpen, Layers } from "lucide-react";

export function HeroDocumentStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Restrained, subtle 3D depth: max rotateX ±4°, max rotateY ±5°
    const rawY = ((x / rect.width) - 0.5) * 10;
    const rawX = ((0.5 - y / rect.height)) * 8;
    const rotateY = Math.max(-5, Math.min(5, Number(rawY.toFixed(2))));
    const rotateX = Math.max(-4, Math.min(4, Number(rawX.toFixed(2))));

    setRotate({ x: rotateX, y: rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg mx-auto lg:max-w-none perspective-1200 py-6 select-none"
    >
      <div
        className="relative preserve-3d transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {/* Layer 3: Background Document Accent Card */}
        <div
          className="absolute inset-0 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-sm translate-y-6 sm:translate-y-8 -rotate-2 scale-[0.94] opacity-70 pointer-events-none transition-transform duration-300"
          style={{ transform: `translateZ(-30px) translateY(${isHovered ? 12 : 8}px) rotate(-3deg)` }}
        />

        {/* Layer 2: Middle Study Sheet */}
        <div
          className="absolute inset-0 bg-white/95 rounded-2xl border border-slate-200 shadow-md translate-y-3 sm:translate-y-4 rotate-1 scale-[0.97] opacity-90 pointer-events-none transition-transform duration-300"
          style={{ transform: `translateZ(-15px) translateY(${isHovered ? 6 : 4}px) rotate(1.5deg)` }}
        />

        {/* Layer 1: Front Primary Veterinary Clinical Protocol Card */}
        <div
          className="relative bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-float transition-all duration-300"
          style={{ transform: "translateZ(10px)" }}
        >
          {/* Card Header */}
          <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-100">
                <BookOpen className="w-4 h-4 text-sky-600" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 block">
                  Clinical Study Module
                </span>
                <span className="text-xs font-semibold text-slate-900">
                  Small Animal Internal Medicine
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Published
            </span>
          </div>

          {/* Card Title & Abstract */}
          <div className="mb-5">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug mb-2">
              Canine Acute Pancreatitis: Diagnostic Matrix & Fluid Resuscitation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
              Structured pathophysiology, Spec cPL biomarker evaluation, ultrasound criteria, and goal-directed crystalloid protocol.
            </p>
          </div>

          {/* Structured Clinical Grid Mini-Preview */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/80 mb-5 text-xs">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                Target Discipline
              </span>
              <span className="font-medium text-slate-800 flex items-center gap-1">
                <Layers className="w-3 h-3 text-slate-500" />
                Gastroenterology
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                Reference Type
              </span>
              <span className="font-medium text-slate-800 flex items-center gap-1">
                <Activity className="w-3 h-3 text-teal-600" />
                Diagnostic Protocol
              </span>
            </div>
          </div>

          {/* Card Action Link */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 pt-1">
            <span className="text-slate-400 font-normal">Peer-referenced academic syllabus</span>
            <Link
              href="/subjects"
              className="inline-flex items-center gap-1.5 text-primary hover:underline underline-offset-4"
            >
              <span>Explore curriculum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

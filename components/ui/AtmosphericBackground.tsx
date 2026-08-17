import React from "react";

interface AtmosphericBackgroundProps {
  variant?: "hero" | "subtle" | "minimal";
  className?: string;
}

export function AtmosphericBackground({
  variant = "subtle",
  className = "",
}: AtmosphericBackgroundProps) {
  if (variant === "minimal") {
    return (
      <div
        className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
        aria-hidden="true"
      >
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl opacity-40 animate-pulse-subtle" />
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div
        className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
        aria-hidden="true"
      >
        {/* Soft Sky Radial Light Orb */}
        <div
          className="absolute -top-24 left-1/4 w-[36rem] h-[36rem] rounded-full bg-gradient-to-br from-sky-100/60 to-transparent blur-3xl opacity-60 animate-float-slow"
          style={{ transform: "translate3d(0, 0, 0)" }}
        />

        {/* Soft Teal Radial Light Orb */}
        <div
          className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] rounded-full bg-gradient-to-bl from-teal-100/40 via-sky-50/30 to-transparent blur-3xl opacity-50 animate-float-reverse"
          style={{ transform: "translate3d(0, 0, 0)" }}
        />

        {/* Subtle Geometric Motif 1: Medical Crosshair Coordinate */}
        <div className="absolute top-12 left-10 text-slate-300/40 font-mono text-[10px] hidden lg:block select-none">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-slate-300/50 stroke-1">
            <circle cx="12" cy="12" r="9" strokeDasharray="2 2" />
            <line x1="12" y1="2" x2="12" y2="7" />
            <line x1="12" y1="17" x2="12" y2="22" />
            <line x1="2" y1="12" x2="7" y2="12" />
            <line x1="17" y1="12" x2="22" y2="12" />
          </svg>
        </div>

        {/* Subtle Geometric Motif 2: Microscopic Molecular Node */}
        <div className="absolute bottom-16 right-16 hidden lg:block opacity-30 select-none">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="stroke-slate-300 stroke-1">
            <circle cx="30" cy="30" r="18" />
            <circle cx="30" cy="12" r="3" fill="#0284C7" fillOpacity="0.3" />
            <circle cx="45" cy="38" r="3" fill="#0D9488" fillOpacity="0.3" />
            <circle cx="15" cy="38" r="3" fill="#0284C7" fillOpacity="0.3" />
            <line x1="30" y1="15" x2="30" y2="30" />
            <line x1="42" y1="36" x2="30" y2="30" />
            <line x1="18" y1="36" x2="30" y2="30" />
          </svg>
        </div>
      </div>
    );
  }

  // Default "subtle" variant
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute top-0 right-10 w-[28rem] h-[28rem] rounded-full bg-sky-50/60 blur-3xl opacity-50 animate-pulse-subtle"
      />
      <div
        className="absolute bottom-10 left-10 w-[24rem] h-[24rem] rounded-full bg-teal-50/40 blur-3xl opacity-40 animate-float-slow"
      />
    </div>
  );
}

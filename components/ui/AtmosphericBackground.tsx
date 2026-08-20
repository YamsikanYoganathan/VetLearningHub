import React from "react";

interface AtmosphericBackgroundProps {
  variant?: "hero" | "subtle" | "minimal" | "cta";
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
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-100/60 rounded-full blur-3xl opacity-50" />
      </div>
    );
  }

  if (variant === "cta") {
    return (
      <div
        className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
        aria-hidden="true"
      >
        <div className="absolute -top-16 -left-16 w-80 h-80 bg-sky-200/50 rounded-full blur-3xl opacity-70" />
        <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-teal-200/50 rounded-full blur-3xl opacity-60" />
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div
        className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
        aria-hidden="true"
      >
        {/* Primary Sky Light Orb */}
        <div
          className="absolute -top-24 left-[10%] w-[42rem] h-[42rem] rounded-full bg-gradient-to-br from-sky-200/50 via-sky-100/30 to-transparent blur-3xl opacity-80 animate-float-slow"
          style={{ transform: "translate3d(0, 0, 0)" }}
        />

        {/* Secondary Teal Light Orb */}
        <div
          className="absolute top-1/4 -right-16 w-[36rem] h-[36rem] rounded-full bg-gradient-to-bl from-teal-200/45 via-teal-100/25 to-transparent blur-3xl opacity-70 animate-float-reverse"
          style={{ transform: "translate3d(0, 0, 0)" }}
        />

        {/* Center Ambient Glow */}
        <div
          className="absolute top-1/2 left-1/3 w-[30rem] h-[24rem] rounded-full bg-gradient-to-tr from-sky-100/40 via-teal-50/30 to-transparent blur-3xl opacity-60"
        />

        {/* Subtle Veterinary Medical Motif: Caduceus & Cross Coordinates */}
        <div className="absolute top-16 left-12 text-slate-300/70 font-mono text-[10px] hidden lg:block select-none">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="stroke-current stroke-1">
            <circle cx="12" cy="12" r="10" strokeDasharray="2 2" />
            <line x1="12" y1="2" x2="12" y2="7" />
            <line x1="12" y1="17" x2="12" y2="22" />
            <line x1="2" y1="12" x2="7" y2="12" />
            <line x1="17" y1="12" x2="22" y2="12" />
          </svg>
        </div>

        {/* Microscopic Molecular Node */}
        <div className="absolute bottom-20 right-20 hidden lg:block opacity-40 select-none">
          <svg width="64" height="64" viewBox="0 0 60 60" fill="none" className="stroke-slate-300 stroke-1">
            <circle cx="30" cy="30" r="18" />
            <circle cx="30" cy="12" r="3.5" fill="#0284C7" fillOpacity="0.4" />
            <circle cx="45" cy="38" r="3.5" fill="#0D9488" fillOpacity="0.4" />
            <circle cx="15" cy="38" r="3.5" fill="#0284C7" fillOpacity="0.4" />
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
        className="absolute top-0 right-10 w-[32rem] h-[32rem] rounded-full bg-sky-100/50 blur-3xl opacity-60 animate-float-slow"
      />
      <div
        className="absolute bottom-10 left-10 w-[28rem] h-[28rem] rounded-full bg-teal-100/40 blur-3xl opacity-50 animate-float-reverse"
      />
    </div>
  );
}

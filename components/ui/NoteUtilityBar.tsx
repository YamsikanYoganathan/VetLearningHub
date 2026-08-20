"use client";

import React, { useState } from "react";
import { Copy, Check, Printer } from "lucide-react";

export function NoteUtilityBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary print:hidden select-none">
      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/80 bg-white hover:bg-surface-subtle hover:text-primary transition-colors shadow-2xs cursor-pointer"
        title="Copy direct note link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">Link Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/80 bg-white hover:bg-surface-subtle hover:text-primary transition-colors shadow-2xs cursor-pointer"
        title="Print formatted study note"
      >
        <Printer className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="hidden sm:inline">Print Note</span>
      </button>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Copy, Check, Printer, Share2 } from "lucide-react";

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
    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 print:hidden">
      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs"
        title="Copy direct note link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">Link Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-slate-400" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs"
        title="Print formatted study note"
      >
        <Printer className="w-3.5 h-3.5 text-slate-400" />
        <span className="hidden sm:inline">Print Note</span>
      </button>
    </div>
  );
}

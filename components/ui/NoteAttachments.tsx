import React from "react";
import { Download, Paperclip } from "lucide-react";
import { DocumentAttachment } from "@/app/admin/(protected)/actions/upload";

function formatFileSize(bytes: number): string {
  if (!bytes || bytes <= 0) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) {
    return Math.round(kb) + " KB";
  }
  const mb = kb / 1024;
  return mb.toFixed(1) + " MB";
}

function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toUpperCase() || "PDF";
}

interface NoteAttachmentsProps {
  attachments?: DocumentAttachment[] | null;
  className?: string;
}

export function NoteAttachments({ attachments, className = "" }: NoteAttachmentsProps) {
  if (!attachments || !Array.isArray(attachments) || attachments.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="attached-resources-heading" className={"mt-10 pt-6 border-t border-border/80 " + className}>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground mb-3.5">
        <Paperclip className="w-4 h-4 text-secondary" />
        <h2 id="attached-resources-heading">Attached Study Resources & Documents ({attachments.length})</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {attachments.map((file, idx) => {
          const ext = getFileExtension(file.name);
          const isPdf = ext === "PDF";

          return (
            <div
              key={file.id || idx}
              className="flex items-center justify-between p-3.5 rounded-xl border border-border/80 bg-white hover:border-sky-300 transition-all shadow-2xs group"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div
                  className={"w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-bold text-[11px] " + (
                    isPdf
                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                      : "bg-primary-subtle text-primary border border-primary/20"
                  )}
                >
                  {ext}
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>

              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                download={file.name}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border bg-surface-subtle hover:bg-white hover:text-primary text-text-secondary text-xs font-semibold transition-colors shrink-0 shadow-2xs"
                title={"Download " + file.name}
                aria-label={"Download " + file.name}
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}

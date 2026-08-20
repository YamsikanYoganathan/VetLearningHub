"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  ExternalLink,
  Paperclip,
  Upload,
  Trash2,
  Download,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Editor from "@/components/editor/Editor";
import { createNote, updateNote } from "../actions";
import { uploadDocumentAction, DocumentAttachment } from "@/app/admin/(protected)/actions/upload";

interface Topic {
  id: string;
  name: string;
  subjects?: {
    name: string;
    academic_areas?: {
      name: string;
    };
  };
}

interface NoteFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    short_description: string | null;
    content: any;
    status: string;
    topic_id: string;
    reading_time: number | null;
    sort_order: number | null;
  };
  topics: Topic[];
}

export default function NoteForm({ initialData, topics }: NoteFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [shortDescription, setShortDescription] = useState(initialData?.short_description || "");
  const [content, setContent] = useState<any>(initialData?.content || null);
  const [status, setStatus] = useState(initialData?.status || "draft");
  const [topicId, setTopicId] = useState(initialData?.topic_id || (topics[0]?.id || ""));
  const [readingTime, setReadingTime] = useState<number | string>(initialData?.reading_time || 5);
  const [sortOrder, setSortOrder] = useState<number | string>(initialData?.sort_order || 0);

  // Document Attachments State
  const initialAttachments: DocumentAttachment[] = Array.isArray(initialData?.content?.attachments)
    ? initialData.content.attachments
    : [];
  const [attachments, setAttachments] = useState<DocumentAttachment[]>(initialAttachments);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [docError, setDocError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!initialData) {
      const generatedSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generatedSlug);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDoc(true);
    setDocError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadDocumentAction(formData);

      if (result.error) {
        setDocError(result.error);
      } else if (result.attachment) {
        setAttachments((prev) => [...prev, result.attachment!]);
      }
    } catch (err: any) {
      setDocError(err.message || "Failed to upload document.");
    } finally {
      setUploadingDoc(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("short_description", shortDescription);
    formData.append("topic_id", topicId);
    formData.append("status", status);
    formData.append("reading_time", String(readingTime));
    formData.append("sort_order", String(sortOrder));

    // Combine TipTap content with attachments in JSONB structure
    const fullContent = {
      ...(content || { type: "doc", content: [] }),
      attachments,
    };
    formData.append("content", JSON.stringify(fullContent));

    let result;
    if (initialData) {
      result = await updateNote(initialData.id, formData);
    } else {
      result = await createNote(formData);
    }

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/admin/notes");
    }
  };

  return (
    <div className="max-w-6xl space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4.5 rounded-2xl border border-border/80 shadow-2xs">
        <Link
          href="/admin/notes"
          className="inline-flex items-center text-xs font-semibold text-text-secondary hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          <span>Back to Notes Directory</span>
        </Link>

        <div className="flex items-center gap-3">
          {initialData && (
            <Link
              href={"/admin/notes/" + initialData.id + "/preview"}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              <span>Live Preview</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}

          <Button onClick={handleSubmit} disabled={loading} size="sm" className="rounded-xl">
            {loading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
            ) : (
              <Save className="w-3.5 h-3.5 mr-1" />
            )}
            <span>{initialData ? "Save Changes" : "Publish Note"}</span>
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 rounded-2xl bg-error-subtle text-error text-xs font-medium border border-error/20">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Writing Area (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-white p-6 rounded-2xl border border-border/80 shadow-2xs space-y-4">
              <div>
                <label htmlFor="title" className="block text-xs font-bold text-text-secondary mb-1">
                  Note Title <span className="text-error">*</span>
                </label>
                <Input
                  id="title"
                  type="text"
                  required
                  value={title}
                  onChange={handleTitleChange}
                  className="text-base font-semibold rounded-xl"
                  placeholder="e.g. Canine Cranial Cruciate Ligament Disease"
                />
              </div>

              <div>
                <label htmlFor="short_description" className="block text-xs font-bold text-text-secondary mb-1">
                  Summary / Short Description
                </label>
                <textarea
                  id="short_description"
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-border/80 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-muted-foreground leading-relaxed font-medium"
                  placeholder="Brief clinical synopsis displayed in directory searches and headers..."
                />
              </div>
            </div>

            {/* TipTap Rich Text Editor */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-text-secondary">
                Article Body (Modular Blocks)
              </label>
              <Editor initialContent={initialData?.content} onChange={setContent} />
            </div>

            {/* Media & Supporting Attachments Section */}
            <div id="cms-tour-attachments" className="bg-white p-6 rounded-2xl border border-border/80 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-border/80">
                <div>
                  <div className="flex items-center gap-2">
                    <Paperclip className="w-4 h-4 text-secondary" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Supporting Study Resources & Attachments
                    </h3>
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Attach reference PDFs, clinical guidelines, or lecture handouts (up to 20MB).
                  </p>
                </div>

                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,application/pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="document-upload-input"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={uploadingDoc}
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs rounded-xl"
                  >
                    {uploadingDoc ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5 mr-1.5 text-secondary" />
                        <span>Attach PDF / Document</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {docError && (
                <div className="p-3 rounded-xl bg-error-subtle text-error text-xs font-medium border border-error/20 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{docError}</span>
                </div>
              )}

              {/* List of Attached Documents */}
              {attachments.length === 0 ? (
                <div className="p-6 rounded-2xl border border-dashed border-border bg-surface-subtle/50 text-center text-xs text-muted-foreground">
                  No supporting documents attached yet. Click &quot;Attach PDF / Document&quot; above to add study materials.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {attachments.map((file) => {
                    const ext = file.name.split(".").pop()?.toUpperCase() || "PDF";
                    const isPdf = ext === "PDF";
                    return (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3.5 rounded-2xl border border-border/80 bg-white hover:border-sky-300 transition-all shadow-2xs"
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-3">
                          <span
                            className={"w-8 h-8 rounded-xl font-bold text-[10px] flex items-center justify-center shrink-0 " + (
                              isPdf
                                ? "bg-rose-50 border border-rose-200 text-rose-700"
                                : "bg-primary-subtle border border-primary/20 text-primary"
                            )}
                          >
                            {ext}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-foreground truncate" title={file.name}>
                              {file.name}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              {file.size
                                ? file.size / (1024 * 1024) > 1
                                  ? (file.size / (1024 * 1024)).toFixed(1) + " MB"
                                  : Math.round(file.size / 1024) + " KB"
                                : "Document Resource"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={file.name}
                            className="p-2 rounded-xl text-text-secondary hover:text-foreground hover:bg-surface-subtle transition-colors"
                            title="Preview / Download file"
                            aria-label={"Download " + file.name}
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>
                          <button
                            type="button"
                            onClick={() => handleRemoveAttachment(file.id)}
                            className="p-2 rounded-xl text-muted-foreground hover:text-error hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Remove attachment"
                            aria-label={"Remove " + file.name}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Publishing Settings Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white p-6 rounded-2xl border border-border/80 shadow-2xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-foreground pb-2 border-b border-border/80">
                Publishing Details
              </h2>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-xs font-bold text-text-secondary mb-1">
                  Publication Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-border/80 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                >
                  <option value="draft">Draft (Private to Editors)</option>
                  <option value="in_review">In Review</option>
                  <option value="published">Published (Live to Public)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Location Topic */}
              <div>
                <label htmlFor="topic_id" className="block text-xs font-bold text-text-secondary mb-1">
                  Curriculum Topic <span className="text-error">*</span>
                </label>
                <select
                  id="topic_id"
                  required
                  value={topicId}
                  onChange={(e) => setTopicId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-border/80 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary truncate font-medium"
                >
                  <option value="" disabled>Select parent topic...</option>
                  {topics.map((t) => {
                    const subject = Array.isArray(t.subjects) ? t.subjects[0] : (t.subjects as any);
                    const area = subject?.academic_areas
                      ? Array.isArray(subject.academic_areas)
                        ? subject.academic_areas[0]
                        : subject.academic_areas
                      : null;
                    return (
                      <option key={t.id} value={t.id}>
                        {area?.name || "Area"} / {subject?.name || "Subject"} / {t.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Slug */}
              <div>
                <label htmlFor="slug" className="block text-xs font-bold text-text-secondary mb-1">
                  URL Slug <span className="text-error">*</span>
                </label>
                <Input
                  id="slug"
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="font-mono text-xs rounded-xl"
                />
              </div>

              {/* Reading Time */}
              <div>
                <label htmlFor="reading_time" className="block text-xs font-bold text-text-secondary mb-1">
                  Reading Time (minutes)
                </label>
                <Input
                  id="reading_time"
                  type="number"
                  min="1"
                  max="120"
                  value={readingTime}
                  onChange={(e) => setReadingTime(e.target.value)}
                  className="text-xs rounded-xl"
                />
              </div>

              {/* Sort Order */}
              <div>
                <label htmlFor="sort_order" className="block text-xs font-bold text-text-secondary mb-1">
                  Topic Sort Index
                </label>
                <Input
                  id="sort_order"
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="text-xs rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { ArrowLeft, Save, BookOpen, Layers, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { RichTextEditor } from "@/components/ui/RichTextEditor";

export default function AdminNoteEditorPage() {
  const router = useRouter();
  const [subjects, setSubjects] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [subjectId, setSubjectId] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      const { data } = await supabase.from("subjects").select("id, name, slug").order("name");
      if (data) setSubjects(data);
    };
    fetchSubjects();
  }, []);
  const [subSection, setSubSection] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!slugEdited) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    setSlugEdited(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!subjectId) {
      setError("Please select a Clinical Discipline (Subject).");
      setLoading(false);
      return;
    }
    if (!title.trim()) {
      setError("Protocol Title is required.");
      setLoading(false);
      return;
    }
    if (!slug.trim()) {
      setError("URL Slug is required.");
      setLoading(false);
      return;
    }

    try {
      const notePayload = {
        subject_id: subjectId,
        sub_section: subSection.trim() || "General Clinical Reference",
        title: title.trim(),
        slug: slug.trim(),
        content: { html: content },
        status,
        updated_at: new Date().toISOString(),
      };

      const { error: insertError } = await supabase.from("notes").insert([notePayload]);

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
      } else {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          router.push("/admin/notes");
          router.refresh();
        }, 1200);
      }
    } catch (err: any) {
      setError(err.message || "Failed to save protocol to database.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto font-sans space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <Link
          href="/admin/notes"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-sky-600 transition-colors tracking-normal"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Clinical Notes Registry</span>
        </Link>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <Link
            href="/admin/notes"
            className="px-4 py-2 rounded-xl bg-slate-200/70 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors tracking-normal"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            disabled={loading || success}
            className="px-6 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 tracking-normal disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : success ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Published!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save & Publish Protocol</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-xs text-red-700 shadow-sm">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="font-serif leading-[1.4] mb-0">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 flex items-start gap-3 text-xs text-teal-800 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
          <p className="font-serif leading-[1.4] mb-0">
            Clinical protocol saved successfully! Redirecting to notes registry...
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Single-Row Metadata Grid per Task 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          {/* Subject Dropdown */}
          <div className="space-y-1.5">
            <label
              htmlFor="subject_id"
              className="block text-[11px] font-bold uppercase tracking-normal text-slate-500 flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-600" />
              <span>1. Discipline (Subject)</span>
            </label>
            <select
              id="subject_id"
              name="subject_id"
              required
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white transition-all tracking-normal"
            >
              <option value="">{subjects.length > 0 ? "Select discipline..." : "Loading disciplines..."}</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sub-section input */}
          <div className="space-y-1.5">
            <label
              htmlFor="sub_section"
              className="block text-[11px] font-bold uppercase tracking-normal text-slate-500 flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-sky-600" />
              <span>2. Sub-section (Anatomical/Stage)</span>
            </label>
            <input
              type="text"
              id="sub_section"
              name="sub_section"
              required
              value={subSection}
              onChange={(e) => setSubSection(e.target.value)}
              placeholder="e.g., Stifle Orthopedics, Renal Pathologies"
              className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white transition-all tracking-normal"
            >
            </input>
          </div>

          {/* Publication Status */}
          <div className="space-y-1.5">
            <label
              htmlFor="status"
              className="block text-[11px] font-bold uppercase tracking-normal text-slate-500 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              <span>3. Publication Status</span>
            </label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as "draft" | "published")}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white transition-all tracking-normal"
            >
              <option value="draft">Draft (Editorial Review)</option>
              <option value="published">Published (Public RLS)</option>
            </select>
          </div>
        </div>

        {/* Seamless Notion-Style Writing Experience per Task 3 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-4">
          {/* Massive Borderless Title Input */}
          <div>
            <input
              type="text"
              id="title"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="Protocol Title..."
              className="w-full text-3xl sm:text-4xl font-sans font-bold text-slate-900 placeholder-slate-300 border-none outline-none focus:ring-0 px-0 bg-transparent tracking-normal leading-tight"
            />
          </div>

          {/* URL Slug Row */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pb-4 border-b border-slate-100">
            <span>url slug: /notes/</span>
            <input
              type="text"
              id="slug"
              required
              value={slug}
              onChange={handleSlugChange}
              placeholder="protocol-slug"
              className="bg-transparent border-b border-transparent focus:border-sky-600 outline-none text-slate-600 font-medium py-0.5 max-w-xs w-full transition-colors"
            />
          </div>

          {/* Tiptap Rich Text Editor per Task 4 */}
          <div className="pt-2">
            <RichTextEditor value={content} onChange={setContent} />
          </div>
        </div>

        {/* Clinical Disclaimer */}
        <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200/60 flex items-start gap-3 text-xs text-sky-900 shadow-sm">
          <AlertCircle className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
          <p className="font-serif leading-[1.4] mb-0">
            By publishing this protocol, you verify that all drug dosages and surgical landmarks conform to regional veterinary formulary standards and ACVS/ACVIM guidelines.
          </p>
        </div>
      </form>
    </div>
  );
}

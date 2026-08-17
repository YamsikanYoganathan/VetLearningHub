"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createNote, updateNote } from "../actions";
import { Loader2, Save, ArrowLeft, ExternalLink, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Editor from "@/components/editor/Editor";

interface NoteFormProps {
  topics: { id: string; name: string; subjects: any }[];
  initialData?: {
    id: string;
    title: string;
    slug: string;
    status: string;
    short_description?: string | null;
    reading_time?: number | null;
    content: any;
    sort_order: number | null;
    topic_id: string | null;
  };
}

export default function NoteForm({ topics, initialData }: NoteFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [shortDescription, setShortDescription] = useState(initialData?.short_description || "");
  const [readingTime, setReadingTime] = useState(initialData?.reading_time?.toString() || "5");
  const [status, setStatus] = useState(initialData?.status || "draft");
  const [sortOrder, setSortOrder] = useState(initialData?.sort_order?.toString() || "0");
  const [topicId, setTopicId] = useState(initialData?.topic_id || "");
  const [content, setContent] = useState<any>(initialData?.content || { type: "doc", content: [] });

  const generateSlug = (val: string) => {
    return val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (!initialData) {
      setSlug(generateSlug(e.target.value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicId) {
      setError("Please select a parent Topic for this note.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("short_description", shortDescription);
    formData.append("reading_time", readingTime);
    formData.append("status", status);
    formData.append("sort_order", sortOrder);
    formData.append("topic_id", topicId);
    formData.append("content", JSON.stringify(content));

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <Link
          href="/admin/notes"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          <span>Back to Notes Directory</span>
        </Link>

        <div className="flex items-center gap-3">
          {initialData && (
            <Link
              href={`/admin/notes/${initialData.id}/preview`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              <span>Live Preview</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}

          <Button onClick={handleSubmit} disabled={loading} size="sm">
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
          <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Writing Area (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div>
                <label htmlFor="title" className="block text-xs font-semibold text-slate-700 mb-1">
                  Note Title <span className="text-red-500">*</span>
                </label>
                <Input
                  id="title"
                  type="text"
                  required
                  value={title}
                  onChange={handleTitleChange}
                  className="text-base font-semibold"
                  placeholder="e.g. Canine Cranial Cruciate Ligament Disease"
                />
              </div>

              <div>
                <label htmlFor="short_description" className="block text-xs font-semibold text-slate-700 mb-1">
                  Summary / Short Description
                </label>
                <textarea
                  id="short_description"
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-slate-400 leading-relaxed"
                  placeholder="Brief clinical synopsis displayed in directory searches and headers..."
                />
              </div>
            </div>

            {/* TipTap Rich Text Editor */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Article Body (WYSIWYG)
              </label>
              <Editor initialContent={initialData?.content} onChange={setContent} />
            </div>
          </div>

          {/* Publishing Settings Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100">
                Publishing Details
              </h2>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-xs font-medium text-slate-600 mb-1">
                  Publication Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                >
                  <option value="draft">Draft (Private to Editors)</option>
                  <option value="in_review">In Review</option>
                  <option value="published">Published (Live to Public)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Location Topic */}
              <div>
                <label htmlFor="topic_id" className="block text-xs font-medium text-slate-600 mb-1">
                  Curriculum Topic <span className="text-red-500">*</span>
                </label>
                <select
                  id="topic_id"
                  required
                  value={topicId}
                  onChange={(e) => setTopicId(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary truncate"
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
                <label htmlFor="slug" className="block text-xs font-medium text-slate-600 mb-1">
                  URL Slug <span className="text-red-500">*</span>
                </label>
                <Input
                  id="slug"
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>

              {/* Reading Time */}
              <div>
                <label htmlFor="reading_time" className="block text-xs font-medium text-slate-600 mb-1">
                  Reading Time (minutes)
                </label>
                <Input
                  id="reading_time"
                  type="number"
                  min="1"
                  max="120"
                  value={readingTime}
                  onChange={(e) => setReadingTime(e.target.value)}
                  className="text-xs"
                />
              </div>

              {/* Sort Order */}
              <div>
                <label htmlFor="sort_order" className="block text-xs font-medium text-slate-600 mb-1">
                  Topic Sort Index
                </label>
                <Input
                  id="sort_order"
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createNote, updateNote } from "../actions";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Editor from "@/components/editor/Editor";

interface NoteFormProps {
  topics: { id: string; name: string; subjects: any }[];
  initialData?: {
    id: string;
    title: string;
    slug: string;
    status: string;
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
      setError("Please select a Topic.");
      return;
    }
    
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
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
    <div className="max-w-5xl bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin/notes" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Notes
        </Link>
        <div className="flex items-center gap-3">
          {initialData && (
            <Link 
              href={`/admin/notes/${initialData.id}/preview`}
              target="_blank"
              className="text-sm font-semibold text-teal-600 hover:text-teal-700"
            >
              Open Preview
            </Link>
          )}
          <Button onClick={handleSubmit} disabled={loading} className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {initialData ? "Save Changes" : "Create Note"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm border border-red-200">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-bold text-slate-700 mb-1.5">
                Note Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all text-lg font-semibold text-slate-900"
                placeholder="e.g. Cranial Nerve Examination"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Content Editor
              </label>
              <Editor initialContent={initialData?.content} onChange={setContent} />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="status" className="block text-sm font-bold text-slate-700 mb-1.5">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all text-sm font-medium"
              >
                <option value="draft">Draft</option>
                <option value="in_review">In Review</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label htmlFor="topic_id" className="block text-sm font-bold text-slate-700 mb-1.5">
                Location (Topic) <span className="text-red-500">*</span>
              </label>
              <select
                id="topic_id"
                required
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all text-sm"
              >
                <option value="" disabled>Select a topic...</option>
                {topics.map(t => {
                  const subject = Array.isArray(t.subjects) ? t.subjects[0] : (t.subjects as any);
                  const area = subject?.academic_areas ? (Array.isArray(subject.academic_areas) ? subject.academic_areas[0] : subject.academic_areas) : null;
                  return (
                    <option key={t.id} value={t.id}>
                      {area?.name} / {subject?.name} / {t.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-bold text-slate-700 mb-1.5">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <input
                id="slug"
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all text-sm font-mono"
              />
            </div>

            <div>
              <label htmlFor="sort_order" className="block text-sm font-bold text-slate-700 mb-1.5">
                Sort Order
              </label>
              <input
                id="sort_order"
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

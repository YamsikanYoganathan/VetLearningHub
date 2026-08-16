"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createAcademicArea, updateAcademicArea } from "../actions";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AreaFormProps {
  initialData?: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    sort_order: number | null;
  };
}

export default function AreaForm({ initialData }: AreaFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [sortOrder, setSortOrder] = useState(initialData?.sort_order?.toString() || "0");

  const generateSlug = (val: string) => {
    return val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (!initialData) {
      setSlug(generateSlug(e.target.value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("sort_order", sortOrder);

    let result;
    if (initialData) {
      result = await updateAcademicArea(initialData.id, formData);
    } else {
      result = await createAcademicArea(formData);
    }

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/admin/academic-areas");
    }
  };

  return (
    <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <div className="mb-6">
        <Link href="/admin/academic-areas" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Areas
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm border border-red-200">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1.5">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={handleNameChange}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all text-sm"
            placeholder="e.g. Small Animal Internal Medicine"
          />
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
            placeholder="e.g. small-animal-internal-medicine"
          />
          <p className="text-xs text-slate-500 mt-1.5">Must be unique and URL-friendly.</p>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-bold text-slate-700 mb-1.5">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all text-sm resize-none"
            placeholder="Optional description of this academic area."
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
          <p className="text-xs text-slate-500 mt-1.5">Lower numbers appear first.</p>
        </div>

        <div className="pt-4 flex items-center justify-end border-t border-slate-100">
          <Button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {initialData ? "Save Changes" : "Create Area"}
          </Button>
        </div>
      </form>
    </div>
  );
}

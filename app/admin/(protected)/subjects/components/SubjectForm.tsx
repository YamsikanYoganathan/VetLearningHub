"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createSubject, updateSubject } from "../actions";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SubjectFormProps {
  areas: { id: string; name: string }[];
  initialData?: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    sort_order: number | null;
    area_id: string | null;
    is_active?: boolean;
  };
}

export default function SubjectForm({ areas, initialData }: SubjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [sortOrder, setSortOrder] = useState(initialData?.sort_order?.toString() || "0");
  const [areaId, setAreaId] = useState(initialData?.area_id || "");
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);

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
    if (!areaId) {
      setError("Please select an Academic Area.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("sort_order", sortOrder);
    formData.append("area_id", areaId);
    formData.append("is_active", isActive ? "true" : "false");

    let result;
    if (initialData) {
      result = await updateSubject(initialData.id, formData);
    } else {
      result = await createSubject(formData);
    }

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/admin/subjects");
    }
  };

  return (
    <div className="max-w-2xl bg-white rounded-xl border border-slate-200 shadow-xs p-6">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/admin/subjects"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Back to Subjects
        </Link>
        <Button onClick={handleSubmit} disabled={loading} size="sm">
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
          ) : (
            <Save className="w-3.5 h-3.5 mr-1" />
          )}
          <span>{initialData ? "Save Changes" : "Create Subject"}</span>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3.5 rounded-lg bg-red-50 text-red-700 text-xs font-medium border border-red-200">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="area_id" className="block text-xs font-semibold text-slate-700 mb-1">
            Academic Area <span className="text-red-500">*</span>
          </label>
          <select
            id="area_id"
            required
            value={areaId}
            onChange={(e) => setAreaId(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="" disabled>Select parent area...</option>
            {areas.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1">
            Subject Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            type="text"
            required
            value={name}
            onChange={handleNameChange}
            placeholder="e.g. Small Animal Surgery"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-xs font-semibold text-slate-700 mb-1">
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

        <div>
          <label htmlFor="description" className="block text-xs font-semibold text-slate-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-slate-400"
            placeholder="Subject overview..."
          />
        </div>

        <div>
          <label htmlFor="sort_order" className="block text-xs font-semibold text-slate-700 mb-1">
            Sort Index
          </label>
          <Input
            id="sort_order"
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="text-xs"
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            id="is_active"
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
          />
          <label htmlFor="is_active" className="text-xs font-medium text-slate-700 cursor-pointer">
            Active in curriculum (visible to public)
          </label>
        </div>
      </form>
    </div>
  );
}

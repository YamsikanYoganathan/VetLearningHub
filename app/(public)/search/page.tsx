import React, { Suspense } from "react";
import { Search as SearchIcon, FileX, ArrowRight, ArrowLeft } from "lucide-react";
import { searchPublishedNotes } from "@/lib/supabase/queries";
import { NoteRow } from "@/components/ui/NoteRow";
import { SearchInput } from "@/components/ui/SearchInput";
import { SearchFilters, CategoryData } from "@/components/ui/SearchFilters";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    area?: string;
    subject?: string;
    topic?: string;
    page?: string;
  }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const hasParams = Boolean(
    params.q || params.area || params.subject || params.topic || params.page
  );

  return {
    title: "Search Reference Library | Vetulan Service",
    description:
      "Search across veterinary clinical notes, surgical protocols, subjects, and topics.",
    ...(hasParams && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

async function getCategoryData(): Promise<CategoryData> {
  const supabase = await createClient();

  const [areasRes, subjectsRes, topicsRes] = await Promise.all([
    supabase
      .from("academic_areas")
      .select("id, name, slug")
      .eq("is_active", true)
      .order("sort_order"),
    supabase
      .from("subjects")
      .select("id, name, slug, area_id")
      .eq("is_active", true)
      .order("sort_order"),
    supabase
      .from("topics")
      .select("id, name, slug, subject_id")
      .eq("is_active", true)
      .order("sort_order"),
  ]);

  return {
    areas: areasRes.data || [],
    subjects: subjectsRes.data || [],
    topics: topicsRes.data || [],
  };
}

async function SearchResults({
  query,
  area,
  subject,
  topic,
  page,
}: {
  query: string;
  area: string;
  subject: string;
  topic: string;
  page: number;
}) {
  const pageSize = 20;

  if (!query && !area && !subject && !topic) {
    return (
      <div className="text-center py-16 bg-white border border-border/80 rounded-2xl mt-6 shadow-xs">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-subtle border border-primary/20 text-primary mb-3 shadow-2xs">
          <SearchIcon className="w-5 h-5" />
        </div>
        <h2 className="text-sm sm:text-base font-bold text-foreground mb-1">
          Search the veterinary knowledge base
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary max-w-sm mx-auto leading-relaxed">
          Type keywords above or use curriculum filters to find reference notes and diagnostic protocols.
        </p>
      </div>
    );
  }

  const { results, totalCount } = await searchPublishedNotes(
    query,
    area || undefined,
    subject || undefined,
    topic || undefined,
    pageSize,
    page
  );

  if (results.length === 0) {
    return (
      <div className="text-center py-16 bg-white border border-border/80 rounded-2xl mt-6 shadow-xs">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-surface-subtle border border-border text-muted-foreground mb-3 shadow-2xs">
          <FileX className="w-5 h-5" />
        </div>
        <h2 className="text-sm sm:text-base font-bold text-foreground mb-1">
          No matching published notes found
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary max-w-sm mx-auto leading-relaxed">
          We couldn&apos;t find any published notes matching your query. Try broadening your keywords or resetting filters.
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <h2 className="text-base font-bold text-foreground">Search Results</h2>
        <span className="text-xs font-semibold text-primary bg-primary-subtle px-3 py-0.5 rounded-full border border-primary/20">
          {totalCount} {totalCount === 1 ? "match" : "matches"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {results.map((note) => (
          <NoteRow
            key={note.id}
            title={note.title}
            snippet={note.short_description || "Clinical reference protocol."}
            subSection={note.topic_name}
            subjectSlug={note.subject_slug || "general"}
            slug={note.slug}
            status="published"
            readingTime={note.reading_time || 5}
            date={new Date(note.updated_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-border/80">
          <Link
            href={`?q=${encodeURIComponent(query)}&area=${encodeURIComponent(
              area
            )}&subject=${encodeURIComponent(subject)}&topic=${encodeURIComponent(
              topic
            )}&page=${Math.max(1, page - 1)}`}
            className={`inline-flex items-center text-xs font-semibold px-4 py-2 rounded-xl border ${
              page <= 1
                ? "text-muted-foreground border-border bg-surface-subtle pointer-events-none opacity-50"
                : "text-foreground border-border bg-white hover:bg-surface-subtle transition-colors shadow-2xs"
            }`}
            aria-disabled={page <= 1}
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Previous
          </Link>

          <span className="text-xs text-text-secondary font-medium">
            Page {page} of {totalPages}
          </span>

          <Link
            href={`?q=${encodeURIComponent(query)}&area=${encodeURIComponent(
              area
            )}&subject=${encodeURIComponent(subject)}&topic=${encodeURIComponent(
              topic
            )}&page=${Math.min(totalPages, page + 1)}`}
            className={`inline-flex items-center text-xs font-semibold px-4 py-2 rounded-xl border ${
              page >= totalPages
                ? "text-muted-foreground border-border bg-surface-subtle pointer-events-none opacity-50"
                : "text-foreground border-border bg-white hover:bg-surface-subtle transition-colors shadow-2xs"
            }`}
            aria-disabled={page >= totalPages}
          >
            Next <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const query = typeof params?.q === "string" ? params.q : "";
  const area = typeof params?.area === "string" ? params.area : "";
  const subject = typeof params?.subject === "string" ? params.subject : "";
  const topic = typeof params?.topic === "string" ? params.topic : "";
  const page =
    typeof params?.page === "string" ? parseInt(params.page, 10) : 1;

  const validPage = isNaN(page) || page < 1 ? 1 : page;
  const categoryData = await getCategoryData();

  return (
    <div className="container-page py-10 sm:py-14 min-h-[calc(100vh-250px)]">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[{ label: "Search", isCurrent: true }]}
        className="mb-8"
      />

      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-6 tracking-tight">
          Search Reference Library
        </h1>
        <SearchInput initialQuery={query} />
      </div>

      <div className="max-w-4xl mx-auto">
        <Suspense
          fallback={
            <div className="h-20 animate-pulse bg-white rounded-2xl border border-border mb-6" />
          }
        >
          <SearchFilters data={categoryData} />
        </Suspense>

        <Suspense
          fallback={
            <div className="text-center py-16 bg-white rounded-2xl border border-border mt-6">
              <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-3" />
              <p className="text-xs text-muted-foreground font-medium">
                Searching knowledge base...
              </p>
            </div>
          }
        >
          <SearchResults
            query={query}
            area={area}
            subject={subject}
            topic={topic}
            page={validPage}
          />
        </Suspense>
      </div>
    </div>
  );
}

import React, { Suspense } from "react";
import { Search as SearchIcon } from "lucide-react";
import { searchNotes } from "@/lib/supabase/queries";
import { NoteRow } from "@/components/ui/NoteRow";
import { SearchInput } from "@/components/ui/SearchInput";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search | Vetulan Service",
  description: "Search across all veterinary notes, topics, and subjects.",
};

async function SearchResults({ query }: { query: string }) {
  if (!query) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface mb-6">
          <SearchIcon className="w-8 h-8 text-muted-foreground/50" />
        </div>
        <h2 className="text-xl font-medium text-foreground mb-2">Search the knowledge base</h2>
        <p className="text-muted-foreground">
          Enter a protocol name, disease, topic, or subject to find what you need.
        </p>
      </div>
    );
  }

  const results = await searchNotes(query);

  if (results.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface mb-6">
          <SearchIcon className="w-8 h-8 text-muted-foreground/50" />
        </div>
        <h2 className="text-xl font-medium text-foreground mb-2">No results found for "{query}"</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Try adjusting your search terms, using more general keywords, or browsing the directory.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-6">
        <h2 className="text-xl font-bold text-foreground">
          Search Results
        </h2>
        <span className="text-sm font-medium text-muted-foreground">
          {results.length} {results.length === 1 ? 'match' : 'matches'} found
        </span>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {results.map((note) => {
          const topic = Array.isArray(note.topics) ? note.topics[0] : note.topics as any;
          const subject = topic && Array.isArray(topic.subjects) ? topic.subjects[0] : topic?.subjects;
          
          return (
            <NoteRow
              key={note.id}
              title={note.title}
              snippet={note.short_description || ""}
              subSection={topic?.name}
              subjectSlug={subject?.slug || "general"}
              slug={note.slug}
              status="published"
              date={new Date(note.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            />
          );
        })}
      </div>
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params?.q || "";

  return (
    <div className="container-page py-12 md:py-20 min-h-[calc(100vh-200px)]">
      <div className="max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-8">
          Search Vetulan
        </h1>
        <SearchInput initialQuery={query} />
      </div>

      <div className="max-w-4xl mx-auto">
        <Suspense fallback={
          <div className="text-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground animate-pulse">Searching knowledge base...</p>
          </div>
        }>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </div>
  );
}

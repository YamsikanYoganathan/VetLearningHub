"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search as SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchInput({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(
    initialQuery || searchParams.get("q") || ""
  );

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    const params = new URLSearchParams(searchParams.toString());
    if (trimmed) {
      params.set("q", trimmed);
    } else {
      params.delete("q");
    }
    params.delete("page");
    router.push(`/search?${params.toString()}`);
  };

  const clearSearch = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.delete("page");
    router.push(`/search${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center w-full h-12 rounded-xl border border-slate-200 bg-white px-3.5 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all shadow-xs">
        <SearchIcon
          className="w-4 h-4 text-slate-400 shrink-0"
          aria-hidden="true"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search clinical topics, diseases, procedures, or pharmacology..."
          className="flex-1 border-0 outline-none px-3 h-full text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-transparent font-normal"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 shrink-0 transition-colors mr-1.5"
            aria-label="Clear search query"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <Button type="submit" size="sm" className="shrink-0 font-medium">
          Search
        </Button>
      </div>
    </form>
  );
}

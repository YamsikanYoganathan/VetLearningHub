"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search as SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchInput({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery || searchParams.get("q") || "");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push(`/search`);
    }
  };

  const clearSearch = () => {
    setQuery("");
    router.push(`/search`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center w-full h-14 rounded-full border border-border bg-background px-4 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all shadow-sm">
        <SearchIcon className="w-5 h-5 text-muted-foreground shrink-0" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search veterinary protocols, subjects, or notes..."
          className="flex-1 border-0 shadow-none focus-visible:ring-0 px-3 h-full text-base sm:text-lg bg-transparent"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="w-8 h-8 rounded-full text-muted-foreground hover:text-foreground shrink-0 -mr-1"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
        <Button 
          type="submit" 
          className="ml-2 rounded-full h-9 px-4 shrink-0 font-medium hidden sm:flex"
        >
          Search
        </Button>
      </div>
    </form>
  );
}

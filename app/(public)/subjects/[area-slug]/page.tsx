import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home, FolderOpen } from "lucide-react";
import { getAreaBySlug, getSubjectsByArea } from "@/lib/supabase/queries";
import { SubjectCard } from "@/components/ui/SubjectCard";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ "area-slug": string }> }): Promise<Metadata> {
  const p = await params;
  const area = await getAreaBySlug(p["area-slug"]);
  
  if (!area) return { title: "Not Found" };
  
  return {
    title: `${area.name} | Vetulan Service`,
    description: area.description || `Explore subjects within ${area.name}`,
  };
}

export default async function AreaPage({ params }: { params: Promise<{ "area-slug": string }> }) {
  const p = await params;
  const area = await getAreaBySlug(p["area-slug"]);
  
  if (!area) {
    notFound();
  }

  const subjects = await getSubjectsByArea(area.id);

  return (
    <div className="container-page py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <Home className="w-4 h-4" />
          <span className="sr-only">Home</span>
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/subjects" className="hover:text-primary transition-colors">
          Directory
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="font-medium text-foreground">{area.name}</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-tight mb-6">
          <FolderOpen className="w-4 h-4" />
          <span>Academic Area</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
          {area.name}
        </h1>
        {area.description && (
          <p className="text-lg text-muted-foreground leading-relaxed">
            {area.description}
          </p>
        )}
      </div>

      {/* Subjects Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground tracking-tight mb-6">Subjects</h2>
        
        {subjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                title={subject.name}
                description={subject.description || ""}
                icon={subject.icon || "Layers"}
                href={`/subjects/${area.slug}/${subject.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-border-subtle border-dashed rounded-xl bg-surface/50">
            <FolderOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-1">No subjects yet</h3>
            <p className="text-sm text-muted-foreground">Subjects for this academic area will appear here once published.</p>
          </div>
        )}
      </div>
    </div>
  );
}

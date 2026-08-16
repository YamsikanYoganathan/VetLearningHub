import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Layers } from "lucide-react";
import { getAcademicAreas } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Subjects Directory | Vetulan Service",
  description: "Browse all veterinary academic areas and subjects.",
};

export default async function SubjectsDirectoryPage() {
  const areas = await getAcademicAreas();
  const supabase = await createClient();
  
  // Fetch all subjects so we can display them grouped under areas
  const { data: subjects } = await supabase
    .from("subjects")
    .select("*")
    .order("sort_order");

  return (
    <div className="container-page py-12 md:py-20">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-tight mb-6">
          <BookOpen className="w-4 h-4" />
          <span>Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
          Academic Areas
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore our comprehensive veterinary knowledge base organized by discipline and clinical specialty.
        </p>
      </div>

      <div className="space-y-12">
        {areas.map((area) => {
          const areaSubjects = subjects?.filter((s) => s.area_id === area.id) || [];
          
          return (
            <div key={area.id} className="border border-border-subtle rounded-2xl overflow-hidden bg-surface shadow-sm">
              <div className="p-6 sm:p-8 bg-background border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground tracking-tight mb-2">
                    <Link href={`/subjects/${area.slug}`} className="hover:text-primary transition-colors">
                      {area.name}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground">{area.description}</p>
                </div>
                <Link 
                  href={`/subjects/${area.slug}`}
                  className="inline-flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={`View ${area.name}`}
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              
              <div className="p-6 sm:p-8">
                {areaSubjects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {areaSubjects.map((subject) => (
                      <Link 
                        key={subject.id} 
                        href={`/subjects/${area.slug}/${subject.slug}`}
                        className="group flex items-start gap-3 p-4 rounded-xl hover:bg-muted/50 border border-transparent hover:border-border-subtle transition-all"
                      >
                        <div className="mt-0.5 shrink-0 p-2 rounded-lg bg-primary/5 text-primary">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {subject.name}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No subjects available in this area yet.</p>
                )}
              </div>
            </div>
          );
        })}
        
        {areas.length === 0 && (
          <div className="text-center py-20 border border-border-subtle border-dashed rounded-xl text-muted-foreground">
            No academic areas found. Please check database connectivity.
          </div>
        )}
      </div>
    </div>
  );
}

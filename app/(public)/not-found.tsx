import React from "react";
import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page py-20 md:py-32 flex flex-col items-center justify-center text-center min-h-[60vh]">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-8">
        <FileQuestion className="w-10 h-10" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
        Page Not Found
      </h1>
      <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
        The veterinary protocol, subject, or page you are looking for does not exist, has been moved, or is not yet published.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return Home
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
          <Link href="/subjects">
            Browse Directory
          </Link>
        </Button>
      </div>
    </div>
  );
}

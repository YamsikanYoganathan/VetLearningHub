"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if available
    console.error("Public Route Error:", error);
  }, [error]);

  return (
    <div className="container-page py-20 md:py-32 flex flex-col items-center justify-center text-center min-h-[60vh]">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 text-destructive mb-8">
        <AlertCircle className="w-10 h-10" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
        Something went wrong
      </h1>
      <p className="text-lg text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed">
        We encountered an unexpected error while trying to load this page. Please try again.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button onClick={() => reset()} size="lg" className="w-full sm:w-auto">
          <RefreshCcw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
          <Link href="/">
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

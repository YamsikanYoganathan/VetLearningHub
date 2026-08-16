import React from "react";

export default function Loading() {
  return (
    <div className="container-page py-20 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-6 text-muted-foreground font-medium animate-pulse">Loading content...</p>
    </div>
  );
}

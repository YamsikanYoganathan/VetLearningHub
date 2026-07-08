import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-serif">
      {/* Global Navbar included across all public routes */}
      <Navbar />

      {/* Main content area */}
      <main className="flex-grow">{children}</main>

      {/* Footer component with clinical links and governance */}
      <Footer />
    </div>
  );
}

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAcademicAreas } from "@/lib/supabase/queries";
import { OnboardingTour } from "@/components/onboarding/OnboardingTour";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const areas = await getAcademicAreas();

  return (
    <div className="flex flex-col min-h-screen bg-white text-text-primary">
      <Header areas={areas} />
      <main className="flex-grow relative">{children}</main>
      <Footer />
      <OnboardingTour />
    </div>
  );
}

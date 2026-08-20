import React from "react";
import { requireEditor } from "@/lib/supabase/rbac";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { CmsOnboardingTour } from "@/components/onboarding/CmsOnboardingTour";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 1. Server-side Authentication & Authorization Boundary
  // Physically blocks rendering of any child CMS components if unauthorized.
  const { user, role } = await requireEditor();

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans text-foreground">
      <AdminSidebar role={role} email={user.email} />
      <div className="flex-grow flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-grow p-6 sm:p-8 lg:p-10 overflow-y-auto bg-surface-subtle/30">
          {children}
        </main>
      </div>
      <CmsOnboardingTour />
    </div>
  );
}

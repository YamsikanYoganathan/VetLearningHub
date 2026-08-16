import React from "react";
import Link from "next/link";
import { AlertTriangle, Home, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Access Denied</h1>
      <p className="text-slate-600 max-w-md mb-8">
        You do not have the required role (editor or admin) to access the Vetulan Service CMS. If you believe this is an error, please contact your administrator.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="default">
          <Link href="/">
            <Home className="w-4 h-4 mr-2" />
            Return to Public Website
          </Link>
        </Button>
        <form action="/auth/signout" method="post">
          <Button type="submit" variant="outline" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  );
}

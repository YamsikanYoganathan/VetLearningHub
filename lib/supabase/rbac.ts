import { createClient } from "./server";
import { redirect } from "next/navigation";

export type Role = "admin" | "editor";

/**
 * Ensures the current user is authenticated and has either 'editor' or 'admin' role.
 * Redirects to /admin/unauthorized if they lack the required role, or /admin/login if unauthenticated.
 */
export async function requireEditor() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/admin/login");
  }

  const {
    data: role,
    error: roleError,
  } = await supabase.rpc("get_my_role");

  if (roleError) {
    console.error("[RBAC] Failed to fetch user role via RPC:", roleError);
    redirect("/admin/unauthorized");
  }

  if (role === "editor" || role === "admin") {
    return { user, role: role as Role };
  }

  redirect("/admin/unauthorized");
}

/**
 * Ensures the current user is authenticated and has the 'admin' role.
 * Redirects to /admin/unauthorized if they lack the required role, or /admin/login if unauthenticated.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/admin/login");
  }

  const {
    data: role,
    error: roleError,
  } = await supabase.rpc("get_my_role");

  if (roleError) {
    console.error("[RBAC:Admin] Failed to fetch user role via RPC:", roleError);
    redirect("/admin/unauthorized");
  }

  if (role === "admin") {
    return { user, role: role as Role };
  }

  redirect("/admin/unauthorized");
}

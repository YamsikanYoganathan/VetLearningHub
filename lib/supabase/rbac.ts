import { createClient } from "./server";
import { redirect } from "next/navigation";

export type Role = "admin" | "editor";

/**
 * Ensures the current user is authenticated and has either 'editor' or 'admin' role.
 * Redirects to /admin/unauthorized if they lack the required role, or /admin/login if unauthenticated.
 */
export async function requireEditor() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: roleData, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (error || !roleData || (roleData.role !== "editor" && roleData.role !== "admin")) {
    redirect("/admin/unauthorized");
  }

  return { user, role: roleData.role as Role };
}

/**
 * Ensures the current user is authenticated and has the 'admin' role.
 * Redirects to /admin/unauthorized if they lack the required role, or /admin/login if unauthenticated.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: roleData, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (error || !roleData || roleData.role !== "admin") {
    redirect("/admin/unauthorized");
  }

  return { user, role: roleData.role as Role };
}

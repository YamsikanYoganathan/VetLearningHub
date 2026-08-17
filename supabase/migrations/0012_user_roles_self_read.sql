-- 0012_user_roles_self_read.sql

-- Enable authenticated users to SELECT their own role from public.user_roles
-- This prevents circular dependency issues with has_role('admin') and allows editors/admins to read their role
DROP POLICY IF EXISTS "Users can read their own role" ON public.user_roles;

CREATE POLICY "Users can read their own role"
ON public.user_roles
FOR SELECT
TO authenticated
USING (
  user_id = (SELECT auth.uid())
);

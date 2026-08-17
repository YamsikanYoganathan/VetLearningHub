-- 0014_fix_role_lookup_plpgsql.sql

-- Replace the SQL function with PL/PGSQL to ensure auth.uid() is evaluated at runtime
-- rather than plan-time, which can cause it to return NULL in STABLE SQL functions.
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS public.app_role
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role public.app_role;
BEGIN
  SELECT ur.role INTO v_role
  FROM public.user_roles ur
  WHERE ur.user_id = auth.uid()
  LIMIT 1;
  
  RETURN v_role;
END;
$$;

CREATE OR REPLACE FUNCTION public.check_chat_rate_limit(p_ip text, p_limit integer, p_window_ms bigint)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count integer;
BEGIN
  -- Serialize concurrent checks for the same IP across all function instances.
  PERFORM pg_advisory_xact_lock(hashtext(p_ip));

  SELECT count(*) INTO v_count
  FROM public.chat_rate_limits
  WHERE ip = p_ip
    AND created_at >= now() - make_interval(secs => p_window_ms / 1000.0);

  IF v_count >= p_limit THEN
    RETURN false;
  END IF;

  INSERT INTO public.chat_rate_limits (ip) VALUES (p_ip);
  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.check_chat_rate_limit(text, integer, bigint) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.check_chat_rate_limit(text, integer, bigint) FROM anon;
REVOKE ALL ON FUNCTION public.check_chat_rate_limit(text, integer, bigint) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.check_chat_rate_limit(text, integer, bigint) TO service_role;
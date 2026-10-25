DROP FUNCTION IF EXISTS public.check_chat_rate_limit(text, integer, bigint);

CREATE FUNCTION public.check_chat_rate_limit(p_ip text, p_limit integer, p_window_ms bigint)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count integer;
  v_oldest timestamptz;
  v_window interval;
BEGIN
  -- Serialize concurrent checks for the same IP across all function instances.
  PERFORM pg_advisory_xact_lock(hashtext(p_ip));
  v_window := make_interval(secs => p_window_ms / 1000.0);

  SELECT count(*), min(created_at) INTO v_count, v_oldest
  FROM public.chat_rate_limits
  WHERE ip = p_ip
    AND created_at >= now() - v_window;

  IF v_count >= p_limit THEN
    -- The limit frees up when the oldest request in the window ages out.
    RETURN jsonb_build_object(
      'allowed', false,
      'retry_after_seconds', greatest(1, ceil(extract(epoch from (v_oldest + v_window - now())))::integer)
    );
  END IF;

  INSERT INTO public.chat_rate_limits (ip) VALUES (p_ip);
  RETURN jsonb_build_object('allowed', true, 'retry_after_seconds', 0);
END;
$$;

REVOKE ALL ON FUNCTION public.check_chat_rate_limit(text, integer, bigint) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.check_chat_rate_limit(text, integer, bigint) FROM anon;
REVOKE ALL ON FUNCTION public.check_chat_rate_limit(text, integer, bigint) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.check_chat_rate_limit(text, integer, bigint) TO service_role;
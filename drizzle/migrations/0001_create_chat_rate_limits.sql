CREATE TABLE public.chat_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_chat_rate_limits_ip_created ON public.chat_rate_limits (ip, created_at);

GRANT ALL ON public.chat_rate_limits TO service_role;

ALTER TABLE public.chat_rate_limits ENABLE ROW LEVEL SECURITY;
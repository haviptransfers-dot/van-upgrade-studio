CREATE TABLE public.ai_chat_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  phone TEXT,
  pickup TEXT,
  destination TEXT,
  travel_date TEXT,
  passengers TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.ai_chat_leads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_chat_leads TO authenticated;
GRANT ALL ON public.ai_chat_leads TO service_role;

ALTER TABLE public.ai_chat_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an AI chat lead"
ON public.ai_chat_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE TABLE public.booking_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route TEXT NOT NULL,
  travel_date TEXT,
  passengers TEXT,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  quoted_price NUMERIC,
  night_rate BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.booking_attempts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.booking_attempts TO authenticated;
GRANT ALL ON public.booking_attempts TO service_role;

ALTER TABLE public.booking_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a booking attempt"
ON public.booking_attempts
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
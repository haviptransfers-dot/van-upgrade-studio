ALTER TABLE public.booking_attempts
  ADD COLUMN IF NOT EXISTS service text,
  ADD COLUMN IF NOT EXISTS pickup text,
  ADD COLUMN IF NOT EXISTS dropoff text,
  ADD COLUMN IF NOT EXISTS travel_time text,
  ADD COLUMN IF NOT EXISTS flight text,
  ADD COLUMN IF NOT EXISTS notes text,
  ADD COLUMN IF NOT EXISTS page_url text,
  ADD COLUMN IF NOT EXISTS language text;
GRANT ALL ON public.booking_attempts TO service_role;
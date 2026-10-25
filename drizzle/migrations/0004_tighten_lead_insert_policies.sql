DROP POLICY IF EXISTS "Anyone can submit an AI chat lead" ON public.ai_chat_leads;
CREATE POLICY "Anyone can submit an AI chat lead"
ON public.ai_chat_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(message) BETWEEN 1 AND 4000
  AND char_length(coalesce(name, '')) <= 200
  AND char_length(coalesce(email, '')) <= 320
  AND char_length(coalesce(phone, '')) <= 40
  AND char_length(coalesce(pickup, '')) <= 300
  AND char_length(coalesce(destination, '')) <= 300
  AND char_length(coalesce(travel_date, '')) <= 40
  AND char_length(coalesce(passengers, '')) <= 10
);

DROP POLICY IF EXISTS "Anyone can submit a booking attempt" ON public.booking_attempts;
CREATE POLICY "Anyone can submit a booking attempt"
ON public.booking_attempts
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(route) BETWEEN 1 AND 200
  AND char_length(coalesce(travel_date, '')) <= 40
  AND char_length(coalesce(passengers, '')) <= 10
  AND char_length(coalesce(contact_name, '')) <= 200
  AND char_length(coalesce(contact_email, '')) <= 320
  AND char_length(coalesce(contact_phone, '')) <= 40
);
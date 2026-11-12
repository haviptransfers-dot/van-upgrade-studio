// Lead capture: saves chat questions and booking requests, and emails the
// business only for booking requests that include valid contact details.

const LEAD_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-lead-email`;
const PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export type AiChatLead = {
  type: "ai_chat_lead";
  name?: string;
  email?: string;
  phone?: string;
  pickup?: string;
  destination?: string;
  travelDate?: string;
  passengers?: string;
  message: string;
};

export type BookingRequest = {
  type: "booking_request";
  name: string;
  email: string;
  phone: string;
  service: string;
  pickup: string;
  dropoff: string;
  travelDate: string;
  travelTime: string;
  passengers: string;
  flight?: string;
  notes?: string;
  pageUrl: string;
  language: string;
};

export const captureLead = (lead: AiChatLead | BookingRequest): void => {
  fetch(LEAD_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify(lead),
  })
    .then(async (resp) => {
      if (!resp.ok) {
        console.error("lead capture failed:", resp.status, await resp.text().catch(() => ""));
      }
    })
    .catch((e) => console.error("lead capture error:", e));
};

// Fire-and-forget lead capture: saves the lead and emails the business.
// Never blocks the UI and never throws — failures are logged only.

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

export type BookingAttempt = {
  type: "booking_attempt";
  route: string;
  travelDate?: string;
  passengers?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  quotedPrice?: number;
  nightRate?: boolean;
};

export const captureLead = (lead: AiChatLead | BookingAttempt): void => {
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

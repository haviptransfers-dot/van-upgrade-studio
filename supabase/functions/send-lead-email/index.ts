import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
// Resend test mode only delivers to the account owner's exact address.
// Gmail ignores dots, so this reaches the same h.a.viptransfers@gmail.com inbox.
const NOTIFY_EMAIL = "haviptransfers@gmail.com";
// onboarding@resend.dev only delivers to the Resend account owner.
// To email any address, verify a domain in Resend and change this sender.
const FROM_EMAIL = "H&A Tours Website <onboarding@resend.dev>";

// Same contact rules as src/lib/contactValidation.ts.
const nameField = z.string().trim().min(2).max(200);
const emailField = z.string().trim().max(200).email();
const phoneField = z
  .string()
  .trim()
  .max(50)
  .regex(/^[+\d\s\-()]+$/)
  .refine((value) => {
    const digits = value.replace(/\D/g, "").length;
    return digits >= 7 && digits <= 20;
  }, "Phone needs at least 7 digits");

const LeadSchema = z.discriminatedUnion("type", [
  // Chat questions are stored only; they never trigger an email.
  z.object({
    type: z.literal("ai_chat_lead"),
    name: z.string().max(200).optional(),
    email: z.string().max(200).optional(),
    phone: z.string().max(50).optional(),
    pickup: z.string().max(300).optional(),
    destination: z.string().max(300).optional(),
    travelDate: z.string().max(50).optional(),
    passengers: z.string().max(20).optional(),
    message: z.string().min(1).max(5000),
  }),
  z.object({
    type: z.literal("booking_request"),
    name: nameField,
    email: emailField,
    phone: phoneField,
    service: z.string().trim().min(1).max(300),
    pickup: z.string().trim().min(1).max(300),
    dropoff: z.string().trim().min(1).max(300),
    travelDate: z.string().trim().min(1).max(50),
    travelTime: z.string().trim().min(1).max(50),
    passengers: z.string().trim().min(1).max(20),
    flight: z.string().trim().max(100).optional(),
    notes: z.string().trim().max(2000).optional(),
    pageUrl: z.string().trim().url().max(500),
    language: z.string().trim().min(2).max(10),
  }),
]);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const row = (label: string, value?: string | number | null) =>
  value
    ? `<tr><td style="padding:6px 12px;color:#888;vertical-align:top">${label}</td><td style="padding:6px 12px">${escapeHtml(String(value))}</td></tr>`
    : "";

const contactRow = (label: string, value: string) =>
  `<tr><td style="padding:8px 12px;font-weight:bold;vertical-align:top;white-space:nowrap">${label}:</td><td style="padding:8px 12px;font-weight:bold">${escapeHtml(value)}</td></tr>`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    let payload: unknown;
    try {
      payload = await req.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }
    const parsed = LeadSchema.safeParse(payload);
    if (!parsed.success) {
      return json({ error: parsed.error.flatten().fieldErrors }, 400);
    }
    const lead = parsed.data;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    if (lead.type === "ai_chat_lead") {
      const { error } = await supabase.from("ai_chat_leads").insert({
        name: lead.name ?? null,
        email: lead.email ?? null,
        phone: lead.phone ?? null,
        pickup: lead.pickup ?? null,
        destination: lead.destination ?? null,
        travel_date: lead.travelDate ?? null,
        passengers: lead.passengers ?? null,
        message: lead.message,
      });
      if (error) throw new Error(`DB insert failed: ${error.message}`);
      return json({ saved: true, emailSent: false });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      throw new Error("Email service is not configured");
    }

    const route = `${lead.service}: ${lead.pickup} → ${lead.dropoff}`;
    const { error } = await supabase.from("booking_attempts").insert({
      route,
      travel_date: lead.travelDate,
      passengers: lead.passengers,
      contact_name: lead.name,
      contact_email: lead.email,
      contact_phone: lead.phone,
      service: lead.service,
      pickup: lead.pickup,
      dropoff: lead.dropoff,
      travel_time: lead.travelTime,
      flight: lead.flight || null,
      notes: lead.notes || null,
      page_url: lead.pageUrl,
      language: lead.language,
    });
    if (error) throw new Error(`DB insert failed: ${error.message}`);

    const subject = `NEW BOOKING REQUEST: ${lead.name} - ${route} - ${lead.travelDate}`;
    const html = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto">
      <table style="border-collapse:collapse;width:100%;background:#fdf7e8;border:1px solid #D4A83A;margin-bottom:16px">
        ${contactRow("Name", lead.name)}${contactRow("Email", lead.email)}${contactRow("Phone / WhatsApp", lead.phone)}
      </table>
      <h2 style="color:#0D0D0D;border-bottom:2px solid #D4A83A;padding-bottom:8px">${escapeHtml(subject)}</h2>
      <table style="border-collapse:collapse;width:100%">${
        row("Service", lead.service) +
        row("Pickup", lead.pickup) +
        row("Drop-off", lead.dropoff) +
        row("Date", lead.travelDate) +
        row("Time", lead.travelTime) +
        row("Passengers", lead.passengers) +
        row("Flight / Ship #", lead.flight) +
        row("Notes", lead.notes) +
        row("Page URL", lead.pageUrl) +
        row("Site language", lead.language)
      }</table>
      <p style="color:#888;font-size:12px;margin-top:16px">Sent automatically from haviptransfers.gr. Press Reply to answer the customer.</p>
    </div>`;
    const text = [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Phone / WhatsApp: ${lead.phone}`,
      "",
      `Service: ${lead.service}`,
      `Pickup: ${lead.pickup}`,
      `Drop-off: ${lead.dropoff}`,
      `Date: ${lead.travelDate}`,
      `Time: ${lead.travelTime}`,
      `Passengers: ${lead.passengers}`,
      `Flight / Ship #: ${lead.flight || ""}`,
      `Notes: ${lead.notes || ""}`,
      `Page URL: ${lead.pageUrl}`,
      `Site language: ${lead.language}`,
    ].join("\n");

    const resendResp = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({ from: FROM_EMAIL, to: [NOTIFY_EMAIL], reply_to: lead.email, subject, html, text }),
    });

    if (!resendResp.ok) {
      const errorBody = await resendResp.text();
      console.error(`Resend gateway failed [${resendResp.status}]: ${errorBody}`);
      // The request is already saved in the database — report email failure but don't lose it.
      return json({ saved: true, emailSent: false, status: resendResp.status, details: errorBody });
    }

    const sent = await resendResp.json().catch(() => ({}));
    return json({ saved: true, emailSent: true, emailId: sent?.id ?? null });
  } catch (e) {
    console.error("send-lead-email error:", e);
    return json({ error: e instanceof Error ? e.message : "Unknown error" }, 500);
  }
});

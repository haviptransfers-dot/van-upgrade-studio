import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const NOTIFY_EMAIL = "h.a.viptransfers@gmail.com";
// onboarding@resend.dev only delivers to the Resend account owner.
// To email any address, verify a domain in Resend and change this sender.
const FROM_EMAIL = "H&A Tours Website <onboarding@resend.dev>";

const LeadSchema = z.discriminatedUnion("type", [
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
    type: z.literal("booking_attempt"),
    route: z.string().min(1).max(300),
    travelDate: z.string().max(50).optional(),
    passengers: z.string().max(20).optional(),
    contactName: z.string().max(200).optional(),
    contactEmail: z.string().max(200).optional(),
    contactPhone: z.string().max(50).optional(),
    quotedPrice: z.number().nonnegative().optional(),
    nightRate: z.boolean().optional(),
  }),
]);

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const row = (label: string, value?: string | number | null) =>
  value
    ? `<tr><td style="padding:6px 12px;color:#888;vertical-align:top">${label}</td><td style="padding:6px 12px">${escapeHtml(String(value))}</td></tr>`
    : "";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      throw new Error("Email service is not configured");
    }

    const parsed = LeadSchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const lead = parsed.data;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    let subject: string;
    let htmlRows: string;

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

      subject = `NEW AI LEAD: ${lead.name || lead.email || lead.phone || "Website visitor"}`;
      htmlRows =
        row("Name", lead.name) +
        row("Email", lead.email) +
        row("Phone", lead.phone) +
        row("Pickup", lead.pickup) +
        row("Destination", lead.destination) +
        row("Date", lead.travelDate) +
        row("Passengers", lead.passengers) +
        row("Message", lead.message);
    } else {
      const { error } = await supabase.from("booking_attempts").insert({
        route: lead.route,
        travel_date: lead.travelDate ?? null,
        passengers: lead.passengers ?? null,
        contact_name: lead.contactName ?? null,
        contact_email: lead.contactEmail ?? null,
        contact_phone: lead.contactPhone ?? null,
        quoted_price: lead.quotedPrice ?? null,
        night_rate: lead.nightRate ?? false,
      });
      if (error) throw new Error(`DB insert failed: ${error.message}`);

      subject = `NEW QUOTE ATTEMPT: ${lead.route} - ${lead.travelDate || "no date"}`;
      htmlRows =
        row("Route", lead.route) +
        row("Date", lead.travelDate) +
        row("Passengers", lead.passengers) +
        row("Quoted price", lead.quotedPrice != null ? `€${lead.quotedPrice}` : undefined) +
        row("Night rate", lead.nightRate ? "Yes" : undefined) +
        row("Name", lead.contactName) +
        row("Email", lead.contactEmail) +
        row("Phone", lead.contactPhone);
    }

    const html = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto">
      <h2 style="color:#0D0D0D;border-bottom:2px solid #D4A83A;padding-bottom:8px">${escapeHtml(subject)}</h2>
      <table style="border-collapse:collapse;width:100%">${htmlRows}</table>
      <p style="color:#888;font-size:12px;margin-top:16px">Sent automatically from haviptransfers.gr</p>
    </div>`;

    const resendResp = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({ from: FROM_EMAIL, to: [NOTIFY_EMAIL], subject, html }),
    });

    if (!resendResp.ok) {
      const errorBody = await resendResp.text();
      console.error(`Resend gateway failed [${resendResp.status}]: ${errorBody}`);
      // Lead is already saved in the database — report email failure but don't lose the lead.
      return new Response(
        JSON.stringify({ saved: true, emailSent: false, status: resendResp.status, details: errorBody }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ saved: true, emailSent: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("send-lead-email error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { createOpenAI } from "npm:@ai-sdk/openai";
import { streamText, type ModelMessage } from "npm:ai";
import { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId } from "./run-id.ts";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";
const RATE_LIMIT = 5; // requests per IP per hour
const RATE_WINDOW_MS = 60 * 60 * 1000;

const SYSTEM_PROMPT = `You are the friendly AI concierge for H&A VIP Tours, a luxury private transfer company in Athens, Greece.

SCOPE: Answer ONLY questions about H&A VIP Tours services, prices, vehicles, booking, payment, and the travel content published on haviptransfers.gr (airport/port transfers, private tours, child seats, wedding and party transfers, travel guides). If the visitor asks about anything unrelated, politely decline and steer back to transfers and tours.

COMPANY INFO:
- Vehicle: Mercedes V Class / Vito (up to 7-8 passengers, leather seats, Wi-Fi, water, child seats on request)
- Phone / WhatsApp: +30 694 939 3700
- Email: h.a.viptransfers@gmail.com
- Available 24/7, English-speaking professional drivers

PRICES (EUR, fixed, no hidden fees — always use these exact figures):
- Airport (ATH) ↔ Athens center: €85 (1-4 pax), €100 (5-7 pax)
- Piraeus port ↔ Athens center: €55 fixed
- Airport (ATH) ↔ Piraeus port: €100 (1-4 pax), €110 (5-7 pax)
- Cape Sounion / Temple of Poseidon tour: €350 fixed
- Athens Sights tour (Acropolis, Plaka, Syntagma): €180 fixed
- Nafplio tour: €500 fixed
- Delphi tour: €500 fixed
- Meteora tour: €800 fixed
- Night surcharge (22:00-06:00): +€10 per person
- All prices include: meet & greet, flight tracking, free wait, free Wi-Fi, child seats

PAYMENT METHODS (info only — no online checkout):
- Cash to driver (EUR)
- Card to driver (Visa / Mastercard via portable POS)
- Bank transfer (on request, advance only)

LANGUAGE: Always reply in the SAME language the user writes in (Greek, English, German, Spanish, French, or Italian). Detect from their message. Default to English if unclear.

STYLE: Warm, concise, professional. Use short paragraphs. Use emojis sparingly (✈️ 🚗 ⚓ 🏛️). Never invent prices or services not listed above. If the user wants to book, gently collect: pickup location, drop-off, date, time, number of passengers, name, contact — then tell them they can confirm via the booking form, WhatsApp, or email.`;

const jsonError = (status: number, message: string) =>
  new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    // --- Rate limit: 5 requests per IP per hour ---
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    // Atomic check-and-record in one database call: an advisory lock per IP
    // serializes concurrent requests, so the limit holds across instances.
    const { data: allowed, error: rateError } = await supabase.rpc("check_chat_rate_limit", {
      p_ip: ip,
      p_limit: RATE_LIMIT,
      p_window_ms: RATE_WINDOW_MS,
    });
    if (rateError) console.error("rate limit check failed:", rateError.message);
    if (allowed === false) {
      return jsonError(429, "Too many questions — please try again in a little while, or message us on WhatsApp at +30 694 939 3700.");
    }

    // --- Validate input ---
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return jsonError(400, "messages must be an array");
    }
    const history: ModelMessage[] = messages
      .filter((m: { role?: string; content?: unknown }) => typeof m?.content === "string")
      .map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
        content: m.content.slice(0, 4000),
      }))
      .slice(-20);
    if (history.length === 0) {
      return jsonError(400, "messages must not be empty");
    }

    // --- Stream from the Lovable AI Gateway ---
    const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(req));
    const provider = createOpenAI({
      baseURL: GATEWAY_URL,
      apiKey: LOVABLE_API_KEY,
      headers: { "Lovable-API-Key": LOVABLE_API_KEY, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: runIdFetch.fetch,
    });

    const result = streamText({
      model: provider.responses(MODEL),
      instructions: SYSTEM_PROMPT,
      messages: history,
      abortSignal: req.signal,
      providerOptions: {
        openai: {
          store: false,
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    // Re-emit as the OpenAI-style SSE the chat client already parses.
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const delta of result.textStream) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: delta } }] })}\n\n`),
            );
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } catch (e) {
          console.error("gateway stream error:", e);
        } finally {
          controller.close();
        }
      },
      cancel() {
        req.signal.aborted || result.consumeStream().catch(() => {});
      },
    });

    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return jsonError(500, e instanceof Error ? e.message : "Unknown error");
  }
});

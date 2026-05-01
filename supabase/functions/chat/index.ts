const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the friendly AI concierge for H&A VIP Tours, a luxury private transfer company in Athens, Greece.

COMPANY INFO:
- Vehicle: Mercedes V Class / Vito (up to 7-8 passengers, leather seats, Wi-Fi, water, child seats on request)
- Phone / WhatsApp: +30 694 939 3700
- Email: h.a.viptransfers@gmail.com
- Available 24/7, English-speaking professional drivers

PRICES (EUR, fixed, no hidden fees):
- Airport (ATH) ↔ Athens center: €70 (1-4 pax), +€5/extra pax (max 7-8)
- Piraeus port ↔ Athens center: €40 (1-4 pax), +€5/extra pax
- Cape Sounion / Temple of Poseidon (4h tour): €200 fixed
- Athens Sights tour (3h, Acropolis, Plaka, Syntagma): €160 fixed
- Night surcharge (22:00-06:00): +€10 per person
- All prices include: meet & greet, flight tracking, free wait, free Wi-Fi, child seats

PAYMENT METHODS (info only — no online checkout):
- Cash to driver (EUR)
- Card to driver (Visa / Mastercard via portable POS)
- Bank transfer (on request, advance only)

LANGUAGE: Always reply in the SAME language the user writes in (Greek, English, German, Spanish, French, or Italian). Detect from their message. Default to English if unclear.

STYLE: Warm, concise, professional. Use short paragraphs. Use emojis sparingly (✈️ 🚗 ⚓ 🏛️). Never invent prices or services not listed above. If the user wants to book, gently collect: pickup location, drop-off, date, time, number of passengers, name, contact — then tell them they can confirm via the booking form, WhatsApp, or email.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY not configured");

    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages must be an array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-latest",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        stream: true,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic error:", response.status, errText);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Convert Anthropic SSE → OpenAI-style SSE so the client parser stays generic
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            let nl: number;
            while ((nl = buffer.indexOf("\n")) !== -1) {
              const line = buffer.slice(0, nl).replace(/\r$/, "");
              buffer = buffer.slice(nl + 1);
              if (!line.startsWith("data: ")) continue;
              const data = line.slice(6).trim();
              if (!data) continue;
              try {
                const evt = JSON.parse(data);
                if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
                  const out = {
                    choices: [{ delta: { content: evt.delta.text } }],
                  };
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(out)}\n\n`));
                } else if (evt.type === "message_stop") {
                  controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
                }
              } catch {
                // ignore unparseable
              }
            }
          }
        } catch (e) {
          console.error("stream error:", e);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

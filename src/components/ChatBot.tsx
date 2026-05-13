import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import vanIcon from "@/assets/fleet-vito.webp";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const ChatBot = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Booking form state
  const [booking, setBooking] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    pax: "2",
    flight: "",
    notes: "",
  });

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "👋 Welcome to **H&A VIP Tours**! I'm your concierge for luxury transfers in Athens — airport, port, private tours and more.\n\nHow can I help you today?",
        },
      ]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    // Tag user language so Claude replies in the right one
    const langHint = `[Reply in language code: ${i18n.language}]\n${userMsg.content}`;
    const apiMessages = next.map((m, i) =>
      i === next.length - 1 && m.role === "user" ? { ...m, content: langHint } : m
    );

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!resp.ok || !resp.body) throw new Error("stream failed");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantText = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      let done = false;
      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistantText += delta;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: assistantText };
                return copy;
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [...prev, { role: "assistant", content: t("chat.error") }]);
    } finally {
      setLoading(false);
    }
  };

  const quickAction = (key: "airport" | "port" | "sounio" | "payment") => {
    if (key === "payment") {
      setMessages((prev) => [...prev, { role: "assistant", content: t("chat.paymentInfo") }]);
      return;
    }
    const prompts: Record<string, string> = {
      airport: "Tell me about airport transfers (price, what's included, how to book).",
      port: "Tell me about Piraeus port transfers (price, what's included).",
      sounio: "Tell me about Cape Sounion and Athens sights tours.",
    };
    sendMessage(prompts[key]);
  };

  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `New Booking Request — ${booking.name}`;
    const body =
      `New booking request from H&A website:\n\n` +
      `Name: ${booking.name}\n` +
      `Email: ${booking.email}\n` +
      `Phone / WhatsApp: ${booking.phone}\n` +
      `Service: ${booking.service}\n` +
      `Pickup: ${booking.pickup}\n` +
      `Drop-off: ${booking.dropoff}\n` +
      `Date: ${booking.date}\n` +
      `Time: ${booking.time}\n` +
      `Passengers: ${booking.pax}\n` +
      `Notes: ${booking.notes}\n`;
    window.location.href = `mailto:h.a.viptransfers@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setShowBooking(false);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `✅ ${booking.name ? booking.name + ", y" : "Y"}our booking request is ready. Your email app should open now — just hit Send! We'll confirm shortly.`,
      },
    ]);
  };

  return (
    <>
      {/* Floating bubble + label — bottom-right on mobile, top-right on desktop */}
      <div className="fixed bottom-6 left-4 sm:bottom-auto sm:top-20 sm:left-6 z-50 flex items-center gap-2">
        <motion.button
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
          onClick={() => setOpen((o) => !o)}
          aria-label="Open AI assistant"
          className="relative w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center hover:scale-110 transition-transform overflow-hidden ring-2 ring-primary/40"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="absolute inset-0 flex items-center justify-center bg-primary">
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div key="van" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="absolute inset-0">
                <img src={vanIcon} alt="H&A Van" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </motion.div>
            )}
          </AnimatePresence>
          {!open && (
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 ring-2 ring-background animate-pulse" />
          )}
        </motion.button>

        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.9 }}
              transition={{ delay: 1.4, type: "spring", stiffness: 260 }}
              onClick={() => setOpen(true)}
              className="flex cursor-pointer bg-card border border-primary/40 rounded-full pl-3 pr-4 py-2 shadow-xl items-center gap-2 hover:border-primary hover:scale-105 transition-all"
            >
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-display font-semibold text-foreground whitespace-nowrap">
                <span className="hidden sm:inline">Ask our </span>AI Assistant 💬
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="fixed bottom-24 left-4 right-4 sm:bottom-auto sm:top-36 sm:right-auto sm:left-6 sm:w-[380px] z-50 bg-card border border-primary/30 rounded-lg shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: "min(640px, calc(100vh - 8rem))" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-primary/20 to-card border-b border-primary/20 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full ring-1 ring-primary/30 overflow-hidden flex-shrink-0">
                <img src={vanIcon} alt="H&A Van" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="flex-1">
                <p className="font-display font-bold text-sm text-foreground">{t("chat.title")}</p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{t("chat.subtitle")}</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {showBooking ? (
              <form onSubmit={submitBooking} className="flex-1 overflow-y-auto p-4 space-y-2 text-sm">
                <p className="font-display font-bold text-base text-primary mb-2">{t("chat.bookingTitle")}</p>
                {[
                  { k: "name", req: true },
                  { k: "email", req: true, type: "email" },
                  { k: "phone", req: true },
                  { k: "service", req: true },
                  { k: "pickup", req: true },
                  { k: "dropoff", req: true },
                ].map((f) => (
                  <input
                    key={f.k}
                    required={f.req}
                    type={f.type || "text"}
                    placeholder={t(`chat.booking${f.k.charAt(0).toUpperCase() + f.k.slice(1)}`)}
                    value={booking[f.k as keyof typeof booking]}
                    onChange={(e) => setBooking({ ...booking, [f.k]: e.target.value })}
                    className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:border-primary outline-none"
                  />
                ))}
                <div className="grid grid-cols-2 gap-2">
                  <input
                    required
                    type="date"
                    value={booking.date}
                    onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                    className="bg-background border border-border rounded px-3 py-2 text-sm focus:border-primary outline-none"
                  />
                  <input
                    required
                    type="time"
                    value={booking.time}
                    onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                    className="bg-background border border-border rounded px-3 py-2 text-sm focus:border-primary outline-none"
                  />
                </div>
                <input
                  required
                  type="number"
                  min={1}
                  max={8}
                  placeholder={t("chat.bookingPax")}
                  value={booking.pax}
                  onChange={(e) => setBooking({ ...booking, pax: e.target.value })}
                  className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:border-primary outline-none"
                />
                <textarea
                  rows={2}
                  placeholder={t("chat.bookingNotes")}
                  value={booking.notes}
                  onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                  className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:border-primary outline-none resize-none"
                />
                <div className="flex gap-2 pt-1">
                  <Button type="button" variant="outline" onClick={() => setShowBooking(false)} className="flex-1">
                    {t("chat.bookingCancel")}
                  </Button>
                  <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/80">
                    {t("chat.bookingSubmit")}
                  </Button>
                </div>
              </form>
            ) : (
              <>
                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                          m.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-muted text-foreground rounded-bl-sm"
                        }`}
                      >
                        {m.content || (loading && i === messages.length - 1 ? <Loader2 className="w-4 h-4 animate-spin" /> : "")}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick actions */}
                <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                  <button
                    onClick={() => quickAction("airport")}
                    className="text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    {t("chat.quickAirport")}
                  </button>
                  <button
                    onClick={() => quickAction("port")}
                    className="text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    {t("chat.quickPort")}
                  </button>
                  <button
                    onClick={() => quickAction("sounio")}
                    className="text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    {t("chat.quickSounio")}
                  </button>
                  <button
                    onClick={() => setShowBooking(true)}
                    className="text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-full bg-primary/15 border border-primary/40 text-primary hover:bg-primary/25 transition-colors"
                  >
                    {t("chat.quickBooking")}
                  </button>
                  <button
                    onClick={() => quickAction("payment")}
                    className="text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    {t("chat.quickPayment")}
                  </button>
                </div>

                {/* Input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(input);
                  }}
                  className="p-3 border-t border-border flex gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t("chat.placeholder")}
                    disabled={loading}
                    className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm focus:border-primary outline-none disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/80 disabled:opacity-40 transition-colors"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;

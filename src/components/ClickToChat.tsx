import { lazy, Suspense, useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONSENT_EVENT, getConsent } from "@/lib/cookieConsent";

const ChatBot = lazy(() => import("./ChatBot"));

// The chat sends messages to an AI provider, so it stays unloaded until the
// visitor has made a cookie consent choice — and only loads on click.
export default function ClickToChat() {
  const [activated, setActivated] = useState(false);
  const [consented, setConsented] = useState(() => getConsent() !== null);

  useEffect(() => {
    const onConsent = () => setConsented(getConsent() !== null);
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  if (!consented) return null;
  if (activated) return <Suspense fallback={<div role="status" className="fixed bottom-6 left-4 z-50 bg-card text-foreground border border-primary rounded-lg p-3">Loading chat…</div>}><ChatBot initiallyOpen /></Suspense>;
  return <Button onClick={() => setActivated(true)} className="fixed bottom-6 left-4 sm:bottom-auto sm:top-20 sm:left-6 z-50 gap-2 shadow-lg" aria-label="Chat with us"><MessageCircle className="h-4 w-4" />Chat with us</Button>;
}

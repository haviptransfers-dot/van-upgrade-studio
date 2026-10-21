import { lazy, Suspense, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatBot = lazy(() => import("./ChatBot"));

export default function ClickToChat() {
  const [activated, setActivated] = useState(false);
  if (activated) return <Suspense fallback={<div role="status" className="fixed bottom-6 left-4 z-50 bg-card text-foreground border border-primary rounded-lg p-3">Loading chat…</div>}><ChatBot initiallyOpen /></Suspense>;
  return <Button onClick={() => setActivated(true)} className="fixed bottom-6 left-4 sm:bottom-auto sm:top-20 sm:left-6 z-50 gap-2 shadow-lg" aria-label="Chat with us"><MessageCircle className="h-4 w-4" />Chat with us</Button>;
}
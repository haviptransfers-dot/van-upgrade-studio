import { useEffect, useState } from "react";

export const NON_CRITICAL_DELAY_MS = 3000;

export function useDeferred() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const activate = () => setReady(true);
    const timer = window.setTimeout(activate, NON_CRITICAL_DELAY_MS);
    const events = ["pointerdown", "keydown", "touchstart"] as const;
    events.forEach((event) => window.addEventListener(event, activate, { once: true, passive: true }));
    return () => {
      window.clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, activate));
    };
  }, []);
  return ready;
}
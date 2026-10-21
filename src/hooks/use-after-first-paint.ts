import { useEffect, useState } from "react";

export function useAfterFirstPaint(heroPainted: boolean) {
  const [deferred, setDeferred] = useState(false);
  useEffect(() => {
    const activate = () => setDeferred(true);
    const timer = window.setTimeout(activate, 3000);
    window.addEventListener("scroll", activate, { once: true, passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", activate);
    };
  }, []);
  return heroPainted && deferred;
}
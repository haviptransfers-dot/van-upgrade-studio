import { useEffect, useRef, useState } from "react";
import { hostedImageUrl, imageEntry } from "./OptimizedImage";

export default function DeferredBackground({ src, className, label }: { src: string; className: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { setReady(true); observer.disconnect(); }
    }, { rootMargin: "400px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const entry = imageEntry(src);
  const targetWidth = window.innerWidth * Math.min(window.devicePixelRatio, 2);
  const variant = entry?.variants.find((item) => item.width >= targetWidth) ?? entry?.variants[entry.variants.length - 1];
  return <div ref={ref} className={className} style={ready ? { backgroundImage: `url(${variant ? hostedImageUrl(variant.url) : src})` } : undefined} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} />;
}
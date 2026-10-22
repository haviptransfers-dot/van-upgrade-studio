import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";

export default function DeferredSection({ children, placeholderClass = "min-h-[600px]", anchor, anchors = [], rootMargin = "600px" }: {
  children: ReactNode;
  placeholderClass?: string;
  anchor?: string;
  anchors?: string[];
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const activateHash = () => {
      if ([anchor, ...anchors].some((id) => id && window.location.hash === `#${id}`)) {
        setReady(true);
        window.setTimeout(() => {
          const target = document.getElementById(window.location.hash.slice(1));
          (target ?? element).scrollIntoView();
        }, 100);
      }
    };
    activateHash();
    window.addEventListener("hashchange", activateHash);
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting && (rootMargin !== "0px" || entry.intersectionRatio > 0))) {
        setReady(true);
        observer.disconnect();
      }
    }, { rootMargin, threshold: rootMargin === "0px" ? 0.01 : 0 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", activateHash);
    };
  }, [anchor, anchors.join("|"), rootMargin]);
  const placeholder = <div className={placeholderClass} aria-hidden="true" />;
  return <div ref={ref} id={ready ? undefined : anchor}>
    {ready ? <Suspense fallback={placeholder}>{children}</Suspense> : placeholder}
  </div>;
}
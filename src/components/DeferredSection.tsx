import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";

export default function DeferredSection({ children, placeholderClass = "min-h-[600px]", anchor }: {
  children: ReactNode;
  placeholderClass?: string;
  anchor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const activateHash = () => {
      if (anchor && window.location.hash === `#${anchor}`) {
        setReady(true);
        window.setTimeout(() => element.scrollIntoView(), 100);
      }
    };
    activateHash();
    window.addEventListener("hashchange", activateHash);
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setReady(true);
        observer.disconnect();
      }
    }, { rootMargin: "600px" });
    observer.observe(element);
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", activateHash);
    };
  }, [anchor]);
  const placeholder = <div className={placeholderClass} aria-hidden="true" />;
  return <div ref={ref} id={ready ? undefined : anchor}>
    {ready ? <Suspense fallback={placeholder}>{children}</Suspense> : placeholder}
  </div>;
}
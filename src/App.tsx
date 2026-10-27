import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect, useState, type ComponentType } from "react";
import Index from "./pages/Index.tsx";
import { seoRoutes } from "./seoRoutes.ts";
const NotFound = lazy(() => import("./pages/NotFound"));
const SeoPage = lazy(() => import("./pages/SeoPage"));
const DelphiTour = lazy(() => import("./pages/DelphiTour"));
const AthensTour = lazy(() => import("./pages/AthensTour"));
const CapeSounionTour = lazy(() => import("./pages/CapeSounionTour"));
const MeteoraTour = lazy(() => import("./pages/MeteoraTour"));
const NafplioTour = lazy(() => import("./pages/NafplioTour"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const About = lazy(() => import("./pages/About"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

// Loads the cookie banner only when the browser is idle — never blocks first paint.
const LazyCookieConsent = () => {
  const [Banner, setBanner] = useState<ComponentType | null>(null);
  useEffect(() => {
    const load = () => import("./components/CookieConsent").then((m) => setBanner(() => m.default));
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void };
    if (w.requestIdleCallback) w.requestIdleCallback(load, { timeout: 4000 });
    else window.setTimeout(load, 2500);
  }, []);
  return Banner ? <Banner /> : null;
};


const MusicButton = lazy(() => import("./components/MusicButton"));

const App = () => (
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" aria-busy="true" />}>
        <MusicButton />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/delphi-private-tour" element={<DelphiTour />} />
          <Route path="/athens-city-tour" element={<AthensTour />} />
          <Route path="/cape-sounion-tour" element={<CapeSounionTour />} />
          <Route path="/meteora-private-tour" element={<MeteoraTour />} />
          <Route path="/nafplio-private-tour" element={<NafplioTour />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {seoRoutes
            .filter((r) => r.path !== "/delphi-private-tour" && r.path !== "/athens-city-tour" && r.path !== "/cape-sounion-tour" && r.path !== "/meteora-private-tour" && r.path !== "/nafplio-private-tour")
            .map((r) => (
              <Route
                key={r.path}
                path={r.path}
                element={<SeoPage path={r.path} routeKey={r.key} />}
              />
            ))}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <LazyCookieConsent />
        </Suspense>
      </BrowserRouter>
);

export default App;

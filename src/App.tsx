import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState, type ComponentType } from "react";
import Index from "./pages/Index.tsx";
import { seoRoutes } from "./seoRoutes.ts";
import { basePath, languageFromPath, linkPath, LEGACY_SLUGS } from "./lib/languagePaths";
import i18n from "./i18n";
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
const ChildSeatsPage = lazy(() => import("./pages/ChildSeatsPage"));

export function PublicRoutes() {
  const location = useLocation();
  const path = basePath(location.pathname);
  const language = languageFromPath(location.pathname);
  useEffect(() => { if (i18n.language !== language) void i18n.changeLanguage(language); }, [language]);
  const slug = path.startsWith("/blog/") ? path.slice(6) : "";
  if (LEGACY_SLUGS[slug]) return <Navigate replace to={linkPath(`/blog/${LEGACY_SLUGS[slug]}`, language)} />;
  return <Routes location={{ ...location, pathname: path }}>
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
    <Route path="/child-seats" element={<ChildSeatsPage />} />
    {seoRoutes.filter((r) => !["athens", "sounion", "delphi", "meteora", "nafplio"].includes(r.key)).map((r) => <Route key={r.path} path={r.path} element={<SeoPage path={r.path} routeKey={r.key} />} />)}
    <Route path="*" element={<NotFound />} />
  </Routes>;
}

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
        <Suspense fallback={null}><MusicButton /></Suspense>
        <PublicRoutes />
        <LazyCookieConsent />
        </Suspense>
      </BrowserRouter>
);

export default App;

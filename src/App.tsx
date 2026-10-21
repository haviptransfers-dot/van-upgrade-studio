import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
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


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" aria-busy="true" />}>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

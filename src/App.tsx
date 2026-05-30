import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import SeoPage from "./pages/SeoPage.tsx";
import DelphiTour from "./pages/DelphiTour.tsx";
import AthensTour from "./pages/AthensTour.tsx";
import CapeSounionTour from "./pages/CapeSounionTour.tsx";
import MeteoraTour from "./pages/MeteoraTour.tsx";
import NafplioTour from "./pages/NafplioTour.tsx";
import { seoRoutes } from "./seoRoutes.ts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/delphi-private-tour" element={<DelphiTour />} />
          <Route path="/athens-city-tour" element={<AthensTour />} />
          <Route path="/cape-sounion-tour" element={<CapeSounionTour />} />
          <Route path="/meteora-private-tour" element={<MeteoraTour />} />
          <Route path="/nafplio-private-tour" element={<NafplioTour />} />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

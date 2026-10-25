import { fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { saveConsent, acceptAll, rejectNonEssential } from "@/lib/cookieConsent";
import ChatBot from "@/components/ChatBot";

vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (key: string) => key, i18n: { language: "en" } }) }));
vi.mock("@/lib/leadCapture", () => ({ captureLead: vi.fn() }));
vi.mock("@/components/OptimizedImage", () => ({ default: () => null }));

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  Reflect.deleteProperty(HTMLElement.prototype, "scrollTo");
  Reflect.deleteProperty(window, "gtag");
  localStorage.clear();
});

it("records only consented activations of the WhatsApp link after a 429 response", async () => {
  Object.defineProperty(HTMLElement.prototype, "scrollTo", { value: vi.fn(), configurable: true });
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ status: 429, json: async () => ({ retryAfterSeconds: 3600 }) }));
  const gtag = vi.fn();
  Object.defineProperty(window, "gtag", { value: gtag, configurable: true });
  saveConsent(acceptAll());
  render(<ChatBot initiallyOpen />);
  const input = screen.getByPlaceholderText("chat.placeholder");
  fireEvent.change(input, { target: { value: "Airport quote please" } });
  const form = input.closest("form");
  if (!form) throw new Error("Chat form missing");
  fireEvent.submit(form);
  const link = await screen.findByRole("link", { name: "chat.whatsappCta" });
  link.addEventListener("click", event => event.preventDefault());
  expect(link.getAttribute("href")).toBe("https://wa.me/306949393700");
  fireEvent.click(link);
  await waitFor(() => expect(gtag).toHaveBeenCalledTimes(1));
  expect(gtag.mock.calls[0][1]).toBe("rate_limit_whatsapp_click");
  saveConsent(rejectNonEssential());
  fireEvent.click(link);
  expect(gtag).toHaveBeenCalledTimes(1);
});
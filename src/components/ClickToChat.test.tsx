import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { loadChat } = vi.hoisted(() => ({ loadChat: vi.fn() }));
vi.mock("./ChatBot", () => {
  loadChat();
  return { default: ({ initiallyOpen }: { initiallyOpen: boolean }) => <div role="dialog" aria-label="Chat">{initiallyOpen ? "Open" : "Closed"}</div> };
});
import ClickToChat from "./ClickToChat";
import { CONSENT_EVENT, saveConsent, acceptAll } from "@/lib/cookieConsent";

describe("click-only chat", () => {
  beforeEach(() => window.localStorage.clear());

  it("stays completely hidden until the visitor makes a cookie consent choice", () => {
    render(<ClickToChat />);
    expect(screen.queryByRole("button", { name: "Chat with us" })).toBeNull();
    expect(loadChat).not.toHaveBeenCalled();
  });

  it("appears after consent is given, then imports chat only on click and opens the panel", async () => {
    vi.useFakeTimers();
    render(<ClickToChat />);
    act(() => {
      saveConsent(acceptAll());
      window.dispatchEvent(new Event(CONSENT_EVENT));
    });
    act(() => {
      vi.advanceTimersByTime(10000);
      window.dispatchEvent(new Event("pointerdown"));
      window.dispatchEvent(new Event("scroll"));
    });
    expect(loadChat).not.toHaveBeenCalled();
    vi.useRealTimers();
    fireEvent.click(screen.getByRole("button", { name: "Chat with us" }));
    expect(await screen.findByRole("dialog", { name: "Chat" })).toHaveTextContent("Open");
    expect(loadChat).toHaveBeenCalledTimes(1);
  });
});

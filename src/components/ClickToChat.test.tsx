import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const { loadChat } = vi.hoisted(() => ({ loadChat: vi.fn() }));
vi.mock("./ChatBot", () => {
  loadChat();
  return { default: ({ initiallyOpen }: { initiallyOpen: boolean }) => <div role="dialog" aria-label="Chat">{initiallyOpen ? "Open" : "Closed"}</div> };
});
import ClickToChat from "./ClickToChat";

describe("click-only chat", () => {
  it("does not import chat after waiting or unrelated interaction; imports it only on click and opens the panel", async () => {
    vi.useFakeTimers();
    render(<ClickToChat />);
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
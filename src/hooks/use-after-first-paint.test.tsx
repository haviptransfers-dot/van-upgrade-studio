import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useAfterFirstPaint } from "./use-after-first-paint";
afterEach(() => vi.useRealTimers());
describe("floating WhatsApp loading", () => {
  it("waits three seconds and the hero paint", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ painted }) => useAfterFirstPaint(painted), { initialProps: { painted: false } });
    act(() => vi.advanceTimersByTime(3000));
    expect(result.current).toBe(false);
    rerender({ painted: true });
    expect(result.current).toBe(true);
  });
  it("activates on scroll after the hero paints, without waiting three seconds", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useAfterFirstPaint(true));
    act(() => vi.advanceTimersByTime(2999));
    expect(result.current).toBe(false);
    act(() => window.dispatchEvent(new Event("scroll")));
    expect(result.current).toBe(true);
  });
});
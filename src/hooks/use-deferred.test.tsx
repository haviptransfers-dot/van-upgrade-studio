import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useDeferred } from "./use-deferred";

afterEach(() => vi.useRealTimers());
describe("non-critical loading", () => {
  it("waits three seconds when the visitor has not interacted", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useDeferred());
    act(() => vi.advanceTimersByTime(2999));
    expect(result.current).toBe(false);
    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe(true);
  });
  it("loads immediately after user interaction", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useDeferred());
    act(() => window.dispatchEvent(new Event("pointerdown")));
    expect(result.current).toBe(true);
  });
});
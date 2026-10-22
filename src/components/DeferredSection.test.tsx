import { act, render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import DeferredSection from "./DeferredSection";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.useRealTimers(); window.location.hash = ""; });

describe("below-screen loading boundary", () => {
  it("keeps content unmounted until the viewport reaches it", () => {
    let intersect: IntersectionObserverCallback = () => {};
    const disconnect = vi.fn();
    vi.stubGlobal("IntersectionObserver", class {
      constructor(callback: IntersectionObserverCallback) { intersect = callback; }
      observe() {}
      disconnect = disconnect;
    });
    render(<DeferredSection rootMargin="0px"><div>Loaded section</div></DeferredSection>);
    expect(screen.queryByText("Loaded section")).toBeNull();
    act(() => intersect([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));
    expect(screen.getByText("Loaded section")).toBeTruthy();
    expect(disconnect).toHaveBeenCalled();
  });

  it("loads a nested section when its navigation anchor is requested", () => {
    vi.useFakeTimers();
    vi.stubGlobal("IntersectionObserver", class { observe() {} disconnect() {} });
    const scroll = vi.fn();
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: scroll });
    render(<DeferredSection anchor="services" anchors={["fleet"]} rootMargin="0px"><section id="fleet">Fleet content</section></DeferredSection>);
    expect(screen.queryByText("Fleet content")).toBeNull();
    act(() => { window.location.hash = "fleet"; window.dispatchEvent(new Event("hashchange")); });
    expect(screen.getByText("Fleet content")).toBeTruthy();
    act(() => vi.advanceTimersByTime(100));
    expect(scroll).toHaveBeenCalled();
    Reflect.deleteProperty(HTMLElement.prototype, "scrollIntoView");
  });
});
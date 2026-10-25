import { describe, expect, it, vi } from "vitest";
import { nonCriticalScheduler } from "./non-critical-scheduler";

const makeWindow = (consent: string | null) => {
  const timers: { task: () => void; delay: number }[] = [];
  const idle = vi.fn((task: () => void) => task());
  const listeners: Record<string, (() => void)[]> = {};
  const window = {
    setTimeout: (task: () => void, delay: number) => timers.push({ task, delay }),
    requestIdleCallback: idle,
    localStorage: { getItem: (_key: string) => consent },
    addEventListener: (event: string, cb: () => void) => {
      (listeners[event] ??= []).push(cb);
    },
    scheduleNonCritical: (_task: () => void) => {},
  };
  return { window, timers, idle, listeners };
};

describe("non-critical tracking scheduling", () => {
  it("queues trackers while there is no consent, then staggers idle work after consent", () => {
    const { window, timers, idle, listeners } = makeWindow(null);
    new Function("window", nonCriticalScheduler)(window);

    const tasks = [vi.fn(), vi.fn(), vi.fn()];
    tasks.forEach(window.scheduleNonCritical);

    // No consent yet: nothing is scheduled, trackers stay blocked.
    expect(timers).toHaveLength(0);
    tasks.forEach((task) => expect(task).not.toHaveBeenCalled());

    // Visitor accepts: the consent event flushes the queue with staggered delays.
    window.localStorage.getItem = () => JSON.stringify({ necessary: true, analytics: true, marketing: true });
    listeners["cookie-consent-change"].forEach((cb) => cb());

    expect(timers.map(({ delay }) => delay)).toEqual([8000, 10000, 12000]);
    timers.forEach(({ task }) => task());
    expect(idle).toHaveBeenCalledTimes(3);
    tasks.forEach((task) => expect(task).toHaveBeenCalledOnce());
  });

  it("stays blocked when the visitor rejects non-essential cookies", () => {
    const { window, timers } = makeWindow(JSON.stringify({ necessary: true, analytics: false, marketing: false }));
    new Function("window", nonCriticalScheduler)(window);
    window.scheduleNonCritical(vi.fn());
    expect(timers).toHaveLength(0);
  });
});

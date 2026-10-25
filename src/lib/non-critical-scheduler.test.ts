import { describe, expect, it, vi } from "vitest";
import { nonCriticalScheduler } from "./non-critical-scheduler";

describe("non-critical tracking scheduling", () => {
  it("keeps tracking out of initial rendering and staggers idle work", () => {
    const timers: { task: () => void; delay: number }[] = [];
    const idle = vi.fn((task: () => void) => task());
    const window = {
      setTimeout: (task: () => void, delay: number) => timers.push({ task, delay }),
      requestIdleCallback: idle,
      scheduleNonCritical: (_task: () => void) => {},
    };
    new Function("window", nonCriticalScheduler)(window);
    const tasks = [vi.fn(), vi.fn(), vi.fn()];
    tasks.forEach(window.scheduleNonCritical);
    expect(timers.map(({ delay }) => delay)).toEqual([8000, 10000, 12000]);
    tasks.forEach((task) => expect(task).not.toHaveBeenCalled());
    timers.forEach(({ task }) => task());
    expect(idle).toHaveBeenCalledTimes(3);
    tasks.forEach((task) => expect(task).toHaveBeenCalledOnce());
  });
});
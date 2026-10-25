import { describe, expect, it } from "vitest";
import { formatCountdown } from "@/lib/formatCountdown";

describe("formatCountdown", () => {
  it("formats a full hour as 60:00", () => {
    expect(formatCountdown(3600)).toBe("60:00");
  });

  it("formats minutes and seconds with zero padding", () => {
    expect(formatCountdown(65)).toBe("1:05");
    expect(formatCountdown(9)).toBe("0:09");
  });

  it("floors fractional seconds", () => {
    expect(formatCountdown(59.9)).toBe("0:59");
  });

  it("never goes below 0:00", () => {
    expect(formatCountdown(0)).toBe("0:00");
    expect(formatCountdown(-12)).toBe("0:00");
  });
});

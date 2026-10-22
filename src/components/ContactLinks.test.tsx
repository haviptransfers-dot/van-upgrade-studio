import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: { returnObjects?: boolean }) =>
      options?.returnObjects ? [] : key,
  }),
}));

import HomeSections from "./HomeSections";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("contact phone card", () => {
  it("offers call and Viber on the same number", () => {
    vi.stubGlobal("IntersectionObserver", class {
      observe() {}
      disconnect() {}
    });
    render(<HomeSections />);

    const number = screen.getByText("+30 694 939 3700");
    expect(number.closest("a")).toHaveAttribute("href", "tel:+306949393700");
    expect(
      screen.getByRole("link", { name: "Viber" })
    ).toHaveAttribute("href", "viber://chat?number=%2B306949393700");
  });
});

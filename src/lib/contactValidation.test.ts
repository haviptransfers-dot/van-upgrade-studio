import { describe, expect, it } from "vitest";
import { validateContact } from "./contactValidation";

const valid = { name: "Maria Papadopoulou", email: "maria@example.com", phone: "+44 7700 900123" };

describe("booking contact details", () => {
  it("accepts a complete international contact", () => {
    expect(validateContact(valid)).toEqual({});
  });
  it("requires a name of at least 2 characters", () => {
    expect(validateContact({ ...valid, name: " A " }).name).toBe(true);
    expect(validateContact({ ...valid, name: "Al" }).name).toBeUndefined();
  });
  it("requires a valid email address", () => {
    expect(validateContact({ ...valid, email: "" }).email).toBe(true);
    expect(validateContact({ ...valid, email: "maria@example" }).email).toBe(true);
  });
  it("accepts phone digits, spaces, +, - and parentheses with at least 7 digits", () => {
    expect(validateContact({ ...valid, phone: "+30 (694) 939-3700" }).phone).toBeUndefined();
    expect(validateContact({ ...valid, phone: "123 456" }).phone).toBe(true);
    expect(validateContact({ ...valid, phone: "+44 7700 abc123" }).phone).toBe(true);
    expect(validateContact({ ...valid, phone: "" }).phone).toBe(true);
  });
});

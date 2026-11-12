// Contact-detail rules for booking requests. The send-lead-email function
// repeats the same rules server-side so no email goes out without them.
export type ContactDetails = { name: string; email: string; phone: string };
export type ContactErrors = Partial<Record<keyof ContactDetails, true>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARACTERS = /^[+\d\s\-()]+$/;

export const isValidName = (value: string) => value.trim().length >= 2 && value.trim().length <= 200;
export const isValidEmail = (value: string) => value.trim().length <= 200 && EMAIL_PATTERN.test(value.trim());
export const isValidPhone = (value: string) => {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "").length;
  return trimmed.length <= 50 && PHONE_CHARACTERS.test(trimmed) && digits >= 7 && digits <= 20;
};

export const validateContact = ({ name, email, phone }: ContactDetails): ContactErrors => {
  const errors: ContactErrors = {};
  if (!isValidName(name)) errors.name = true;
  if (!isValidEmail(email)) errors.email = true;
  if (!isValidPhone(phone)) errors.phone = true;
  return errors;
};

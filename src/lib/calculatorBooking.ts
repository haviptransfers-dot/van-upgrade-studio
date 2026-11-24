type BookingLabels = {
  subject: string;
  service: string;
  passengers: string;
  night: string;
  yes: string;
  no: string;
  price: string;
  dateTime: string;
  flightShip: string;
  address: string;
  name: string;
};

/** A user-initiated mail link only; this never sends an email or saves a lead. */
export function calculatorEmailUrl(selection: {
  service: string;
  passengers: number;
  night: boolean;
  total: number;
  time?: string;
}, labels: BookingLabels) {
  const subject = `${labels.subject}: ${selection.service}`;
  const body = [
    `${labels.service}: ${selection.service}`,
    `${labels.passengers}: ${selection.passengers}`,
    `${labels.night}: ${selection.night ? labels.yes : labels.no}`,
    `${labels.price}: €${selection.total}`,
    "",
    `${labels.dateTime}:${selection.time ? ` ${selection.time}` : ""}`,
    "",
    `${labels.flightShip}:`,
    "",
    `${labels.address}:`,
    "",
    `${labels.name}:`,
  ].join("\n");
  return `mailto:info@haviptransfers.gr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
/** Night rate applies to pick-ups from 00:00 to 04:59 ("HH:MM"). */
export function isNightPickup(time: string) {
  const h = Number(time.split(":")[0]);
  return /^\d{2}:\d{2}$/.test(time) && h >= 0 && h < 5;
}

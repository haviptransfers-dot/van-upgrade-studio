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
}, labels: BookingLabels) {
  const subject = `${labels.subject}: ${selection.service}`;
  const body = [
    `${labels.service}: ${selection.service}`,
    `${labels.passengers}: ${selection.passengers}`,
    `${labels.night}: ${selection.night ? labels.yes : labels.no}`,
    `${labels.price}: €${selection.total}`,
    "",
    `${labels.dateTime}:`,
    "",
    `${labels.flightShip}:`,
    "",
    `${labels.address}:`,
    "",
    `${labels.name}:`,
  ].join("\n");
  return `mailto:h.a.viptransfers@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
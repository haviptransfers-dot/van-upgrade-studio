export const READY_MSG: Record<string, string> = {
  en: "your booking request is ready to send. Please tap WhatsApp or email to complete it.",
  el: "το αίτημα κράτησής σας είναι έτοιμο για αποστολή. Πατήστε WhatsApp ή email για να το ολοκληρώσετε.",
  de: "Ihre Buchungsanfrage ist versandbereit. Tippen Sie auf WhatsApp oder E-Mail, um sie abzuschließen.",
  es: "su solicitud de reserva está lista para enviar. Toque WhatsApp o correo electrónico para completarla.",
  fr: "votre demande de réservation est prête à être envoyée. Touchez WhatsApp ou e-mail pour la finaliser.",
  it: "la tua richiesta di prenotazione è pronta per l'invio. Tocca WhatsApp o email per completarla.",
  he: "בקשת ההזמנה שלך מוכנה לשליחה. הקישו על WhatsApp או אימייל כדי להשלים אותה.",
  ar: "طلب الحجز الخاص بك جاهز للإرسال. اضغط على واتساب أو البريد الإلكتروني لإكماله.",
};

/** Chat booking confirmation in the page language (falls back to English). */
export function bookingReadyMessage(language: string, name?: string): string {
  const r = READY_MSG[(language || "en").split("-")[0]] ?? READY_MSG.en;
  return `✅ ${name ? name + ", " + r : r.charAt(0).toUpperCase() + r.slice(1)}`;
}

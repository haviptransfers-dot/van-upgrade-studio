export type FamilyTravelCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  request: string;
  back: string;
  seatsEyebrow: string;
  seatsTitle: string;
  seatsIntro: string;
  groups: Array<{ name: string; range: string; description: string }>;
  whyTitle: string;
  benefits: Array<{ title: string; description: string }>;
  destinationsTitle: string;
  destinationsText: string;
  destinations: string[];
  stepsTitle: string;
  steps: Array<{ title: string; description: string }>;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  finalTitle: string;
  finalText: string;
  call: string;
  internalLink: string;
  whatsappMessage: string;
};

const en: FamilyTravelCopy = {
  eyebrow: "Family travel in Athens",
  title: "Athens Transfers with Child Car Seats",
  intro: "Private airport, port and hotel transfers designed around your family. Travel in a spacious Mercedes V-Class with certified child seats prepared for your children's ages.",
  request: "Request Family Transfer",
  back: "Back to home",
  seatsEyebrow: "The right seat for every age",
  seatsTitle: "Certified Child Car Seats",
  seatsIntro: "Tell us each child's age and weight when booking so we can prepare the most suitable seat before pickup.",
  groups: [
    { name: "Group 0+", range: "0–13 kg", description: "Rear-facing infant seat for babies and newborns." },
    { name: "Group 1", range: "9–18 kg", description: "Supportive child seat with a secure harness." },
    { name: "Booster", range: "15–36 kg", description: "High-back booster for older children." },
  ],
  whyTitle: "Why Families Choose Us",
  benefits: [
    { title: "Certified Seats", description: "Quality seats selected for every age group." },
    { title: "Professional Drivers", description: "Experienced, courteous and family-friendly service." },
    { title: "Mercedes Comfort", description: "Spacious, climate-controlled Mercedes V-Class travel." },
    { title: "Stroller Space", description: "Room for strollers, suitcases and family essentials." },
    { title: "Arrival Monitoring", description: "We monitor flights and ships and adjust your pickup." },
  ],
  destinationsTitle: "Family Transfers Across Athens",
  destinationsText: "We provide door-to-door family transportation for arrivals, departures and private journeys throughout Athens and Attica.",
  destinations: ["Athens International Airport", "Piraeus Port", "Athens hotels, villas & Airbnbs", "Rafina & Lavrio ports", "Private tours from Athens"],
  stepsTitle: "How to Request a Child Seat",
  steps: [
    { title: "Send your journey", description: "Message us with your date, pickup, destination and passenger count." },
    { title: "Tell us about each child", description: "Share each child's age and weight so we prepare the correct seat." },
    { title: "Receive confirmation", description: "We confirm your family transfer and have every requested seat ready." },
  ],
  faqTitle: "Family Transfer FAQs",
  faqs: [
    { question: "Which child car seats are available?", answer: "We provide Group 0+ seats for 0–13 kg, Group 1 seats for 9–18 kg and high-back boosters for 15–36 kg." },
    { question: "Should I request the child seat in advance?", answer: "Yes. Please request it when booking and tell us each child's age and weight so the correct seat is reserved." },
    { question: "Will the child seat be installed before pickup?", answer: "Yes. The requested child seat is prepared and securely installed in the vehicle before your scheduled pickup." },
    { question: "Is there room for a stroller and suitcases?", answer: "Our Mercedes V-Class has generous luggage space. Tell us how many suitcases and strollers you have so we can confirm the best arrangement." },
    { question: "What happens if our flight or ship is delayed?", answer: "We monitor your arrival and adjust the pickup time for reasonable delays, helping your family avoid unnecessary waiting." },
    { question: "What information do you need to book?", answer: "Please send your date, pickup time and location, destination, flight or ship number, passenger count, and each child's age and weight." },
  ],
  finalTitle: "Plan a Safer Family Arrival",
  finalText: "Tell us your route and your children's ages. We will arrange the vehicle and suitable seats for a calm start in Athens.",
  call: "Call Us",
  internalLink: "Traveling with children? Explore family transfers with child seats",
  whatsappMessage: "Hi! I'd like to request a family transfer with child car seats in Athens.",
};

const translations: Record<string, FamilyTravelCopy> = {
  en,
  el: { ...en, eyebrow: "Οικογενειακές μεταφορές στην Αθήνα", title: "Μεταφορές στην Αθήνα με Παιδικά Καθίσματα", intro: "Ιδιωτικές μεταφορές από αεροδρόμιο, λιμάνι και ξενοδοχείο σχεδιασμένες για την οικογένειά σας. Ταξιδέψτε με ευρύχωρη Mercedes V-Class και πιστοποιημένα παιδικά καθίσματα ανάλογα με την ηλικία των παιδιών.", request: "Ζητήστε Οικογενειακή Μεταφορά", back: "Επιστροφή στην αρχική", seatsEyebrow: "Το σωστό κάθισμα για κάθε ηλικία", seatsTitle: "Πιστοποιημένα Παιδικά Καθίσματα", seatsIntro: "Κατά την κράτηση ενημερώστε μας για την ηλικία και το βάρος κάθε παιδιού, ώστε να ετοιμάσουμε το κατάλληλο κάθισμα.", groups: [{ name: "Group 0+", range: "0–13 kg", description: "Βρεφικό κάθισμα με φορά προς τα πίσω για μωρά και νεογέννητα." }, { name: "Group 1", range: "9–18 kg", description: "Υποστηρικτικό παιδικό κάθισμα με ασφαλή ζώνη." }, { name: "Booster", range: "15–36 kg", description: "Ανυψωτικό κάθισμα με ψηλή πλάτη για μεγαλύτερα παιδιά." }], whyTitle: "Γιατί μας Επιλέγουν οι Οικογένειες", benefits: [{ title: "Πιστοποιημένα Καθίσματα", description: "Ποιοτικά καθίσματα για κάθε ηλικιακή ομάδα." }, { title: "Επαγγελματίες Οδηγοί", description: "Έμπειρη, ευγενική και φιλική προς την οικογένεια εξυπηρέτηση." }, { title: "Άνεση Mercedes", description: "Ευρύχωρη Mercedes V-Class με κλιματισμό." }, { title: "Χώρος για Καρότσι", description: "Χώρος για καρότσια, βαλίτσες και οικογενειακά είδη." }, { title: "Παρακολούθηση Άφιξης", description: "Παρακολουθούμε πτήσεις και πλοία και προσαρμόζουμε την παραλαβή." }], destinationsTitle: "Οικογενειακές Μεταφορές σε όλη την Αθήνα", destinationsText: "Παρέχουμε οικογενειακή μεταφορά πόρτα-πόρτα για αφίξεις, αναχωρήσεις και ιδιωτικές διαδρομές σε Αθήνα και Αττική.", destinations: ["Διεθνές Αεροδρόμιο Αθηνών", "Λιμάνι Πειραιά", "Ξενοδοχεία, βίλες & Airbnb στην Αθήνα", "Λιμάνια Ραφήνας & Λαυρίου", "Ιδιωτικές εκδρομές από την Αθήνα"], stepsTitle: "Πώς Ζητάτε Παιδικό Κάθισμα", steps: [{ title: "Στείλτε τη διαδρομή σας", description: "Γράψτε μας ημερομηνία, παραλαβή, προορισμό και αριθμό επιβατών." }, { title: "Πείτε μας για κάθε παιδί", description: "Στείλτε ηλικία και βάρος για να ετοιμάσουμε το σωστό κάθισμα." }, { title: "Λάβετε επιβεβαίωση", description: "Επιβεβαιώνουμε τη μεταφορά και έχουμε τα καθίσματα έτοιμα." }], faqTitle: "Συχνές Ερωτήσεις Οικογενειακής Μεταφοράς", faqs: [{ question: "Ποια παιδικά καθίσματα είναι διαθέσιμα;", answer: "Διαθέτουμε Group 0+ για 0–13 kg, Group 1 για 9–18 kg και booster με ψηλή πλάτη για 15–36 kg." }, { question: "Πρέπει να ζητήσω το κάθισμα εκ των προτέρων;", answer: "Ναι. Ζητήστε το κατά την κράτηση και αναφέρετε ηλικία και βάρος κάθε παιδιού." }, { question: "Το κάθισμα θα είναι τοποθετημένο πριν την παραλαβή;", answer: "Ναι. Το κάθισμα προετοιμάζεται και τοποθετείται με ασφάλεια πριν την προγραμματισμένη παραλαβή." }, { question: "Υπάρχει χώρος για καρότσι και βαλίτσες;", answer: "Η Mercedes V-Class διαθέτει μεγάλο χώρο αποσκευών. Πείτε μας πόσες βαλίτσες και καρότσια έχετε." }, { question: "Τι γίνεται αν καθυστερήσει η πτήση ή το πλοίο;", answer: "Παρακολουθούμε την άφιξή σας και προσαρμόζουμε την ώρα παραλαβής για εύλογες καθυστερήσεις." }, { question: "Τι στοιχεία χρειάζονται για την κράτηση;", answer: "Ημερομηνία, ώρα και σημείο παραλαβής, προορισμός, αριθμός πτήσης ή πλοίου, επιβάτες, ηλικία και βάρος κάθε παιδιού." }], finalTitle: "Οργανώστε μια Ασφαλέστερη Οικογενειακή Άφιξη", finalText: "Πείτε μας τη διαδρομή και τις ηλικίες των παιδιών. Θα ετοιμάσουμε το όχημα και τα κατάλληλα καθίσματα.", call: "Καλέστε μας", internalLink: "Ταξιδεύετε με παιδιά; Δείτε τις οικογενειακές μεταφορές με παιδικά καθίσματα", whatsappMessage: "Γεια σας! Θα ήθελα οικογενειακή μεταφορά με παιδικά καθίσματα στην Αθήνα." },
  it: { ...en, eyebrow: "Viaggi in famiglia ad Atene", title: "Transfer ad Atene con Seggiolini per Bambini", request: "Richiedi un Transfer Familiare", back: "Torna alla home", seatsTitle: "Seggiolini Certificati", whyTitle: "Perché le Famiglie ci Scelgono", destinationsTitle: "Transfer Familiari in tutta Atene", stepsTitle: "Come Richiedere un Seggiolino", faqTitle: "FAQ sui Transfer Familiari", finalTitle: "Organizza un Arrivo più Sicuro", call: "Chiamaci", internalLink: "Viaggi con bambini? Scopri i transfer familiari con seggiolini", whatsappMessage: "Salve! Vorrei richiedere un transfer familiare con seggiolini ad Atene." },
  es: { ...en, eyebrow: "Viajes en familia en Atenas", title: "Traslados en Atenas con Sillas Infantiles", request: "Solicitar Traslado Familiar", back: "Volver al inicio", seatsTitle: "Sillas Infantiles Certificadas", whyTitle: "Por qué las Familias nos Eligen", destinationsTitle: "Traslados Familiares por Atenas", stepsTitle: "Cómo Solicitar una Silla Infantil", faqTitle: "Preguntas sobre Traslados Familiares", finalTitle: "Planifique una Llegada más Segura", call: "Llámenos", internalLink: "¿Viaja con niños? Descubra los traslados familiares con sillas infantiles", whatsappMessage: "¡Hola! Quiero solicitar un traslado familiar con sillas infantiles en Atenas." },
  fr: { ...en, eyebrow: "Voyage en famille à Athènes", title: "Transferts à Athènes avec Sièges Enfant", request: "Demander un Transfert Familial", back: "Retour à l'accueil", seatsTitle: "Sièges Enfant Certifiés", whyTitle: "Pourquoi les Familles nous Choisissent", destinationsTitle: "Transferts Familiaux dans Athènes", stepsTitle: "Comment Demander un Siège Enfant", faqTitle: "FAQ Transferts Familiaux", finalTitle: "Préparez une Arrivée plus Sûre", call: "Appelez-nous", internalLink: "Vous voyagez avec des enfants ? Découvrez nos transferts avec sièges enfant", whatsappMessage: "Bonjour ! Je souhaite réserver un transfert familial avec sièges enfant à Athènes." },
  de: { ...en, eyebrow: "Familienreisen in Athen", title: "Athen Transfers mit Kindersitzen", request: "Familientransfer Anfragen", back: "Zur Startseite", seatsTitle: "Zertifizierte Kindersitze", whyTitle: "Warum Familien uns Wählen", destinationsTitle: "Familientransfers in ganz Athen", stepsTitle: "So Bestellen Sie einen Kindersitz", faqTitle: "FAQ zu Familientransfers", finalTitle: "Planen Sie eine Sichere Ankunft", call: "Anrufen", internalLink: "Reisen Sie mit Kindern? Entdecken Sie Familientransfers mit Kindersitzen", whatsappMessage: "Hallo! Ich möchte einen Familientransfer mit Kindersitzen in Athen anfragen." },
  ar: { ...en, eyebrow: "سفر العائلات في أثينا", title: "تنقلات أثينا مع مقاعد أطفال", request: "اطلب نقلاً عائلياً", back: "العودة للرئيسية", seatsTitle: "مقاعد أطفال معتمدة", whyTitle: "لماذا تختارنا العائلات", destinationsTitle: "تنقلات عائلية في أثينا", stepsTitle: "كيفية طلب مقعد طفل", faqTitle: "أسئلة النقل العائلي", finalTitle: "خطط لوصول عائلي أكثر أماناً", call: "اتصل بنا", internalLink: "تسافر مع أطفال؟ اكتشف النقل العائلي مع مقاعد الأطفال", whatsappMessage: "مرحباً! أود طلب نقل عائلي مع مقاعد أطفال في أثينا." },
  he: { ...en, eyebrow: "נסיעות משפחתיות באתונה", title: "הסעות באתונה עם מושבי בטיחות לילדים", request: "הזמנת הסעה משפחתית", back: "חזרה לדף הבית", seatsTitle: "מושבי בטיחות מאושרים", whyTitle: "למה משפחות בוחרות בנו", destinationsTitle: "הסעות משפחתיות ברחבי אתונה", stepsTitle: "איך מזמינים מושב בטיחות", faqTitle: "שאלות על הסעות משפחתיות", finalTitle: "תכננו הגעה משפחתית בטוחה", call: "התקשרו אלינו", internalLink: "נוסעים עם ילדים? גלו הסעות משפחתיות עם מושבי בטיחות", whatsappMessage: "שלום! ברצוני להזמין הסעה משפחתית עם מושבי בטיחות באתונה." },
};

export const getFamilyTravelCopy = (language: string) => translations[language.split("-")[0]] ?? en;
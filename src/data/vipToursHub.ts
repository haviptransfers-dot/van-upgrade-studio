/** Owner-supplied copy for the /vip-tours-athens/ hub; visible FAQ text is also the FAQPage JSON-LD source. */
export type VipToursHub = {
  title: string; description: string; h1: string; intro: string; toursTitle: string;
  tours: { to: string; name: string; text: string }[];
  priceNote: string; included: string;
  links: { to: string; label: string }[];
  faqTitle: string; faq: { q: string; a: string }[];
};

const paths = ["/athens-city-tour", "/cape-sounion-tour", "/delphi-private-tour", "/nafplio-private-tour", "/meteora-private-tour"];
const tours = (items: [string, string][]) => items.map(([name, text], i) => ({ to: paths[i], name, text }));
const links = (instant: string, airport: string) => [{ to: "/", label: "H&A VIP Tours" }, { to: "/#calculator", label: instant }, { to: "/airport-transfer-athens", label: airport }];

export const vipToursHub: Record<string, VipToursHub> = {
  en: {
    title: "VIP Tours Athens | Private Tours & Day Trips | H&A VIP Tours",
    description: "Private VIP tours from Athens: city tour, Cape Sounion, Delphi, Nafplio and Meteora. Mercedes Vito VIP, up to 7 passengers, child seats included on request.",
    h1: "VIP Tours in Athens",
    intro: "H&A VIP Tours offers private VIP tours from Athens in a Mercedes Vito VIP, for up to 7 passengers, with a professional English-speaking chauffeur. Each day trip is only for your group. We pick you up from your hotel, Airbnb, Athens Airport or Piraeus Port, and we plan the route with you. [Child seats are included on request.](/child-seats)",
    toursTitle: "Our private tours from Athens",
    tours: tours([
      ["Athens city tour", "Acropolis area, Plaka, Syntagma and the Panathenaic Stadium. About 3 hours."],
      ["Cape Sounion tour", "Temple of Poseidon and the Athens Riviera, including sunset departures. About 5 hours."],
      ["Delphi private tour", "The sanctuary of Apollo, with an optional stop in Arachova. About 8 hours."],
      ["Nafplio private tour", "Greece's first capital, with optional stops at Mycenae, Epidaurus and the Corinth Canal. About 8 hours."],
      ["Meteora private tour", "The UNESCO monasteries, a full-day journey from Athens. About 12 hours."],
    ]),
    priceNote: "The current per-vehicle price is listed on each tour page and in the [price calculator](/#calculator).",
    included: "Pickup and drop-off from your chosen location, a Mercedes Vito VIP, Wi-Fi and bottled water, and a tour only for your group.",
    links: links("Get Your Instant Price", "Athens Airport transfers"),
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "What VIP tours do you offer from Athens?", a: "We offer private tours of Athens, Cape Sounion and the Temple of Poseidon, Delphi, Nafplio, and Meteora, in a Mercedes Vito VIP for up to 7 passengers. Child seats are included on request." },
      { q: "Are the tours private, and how many passengers can join?", a: "Yes. Every tour is only for your group. The Mercedes Vito VIP carries up to 7 passengers, excluding the driver." },
      { q: "Can the tour start from our hotel, the airport or the port?", a: "Yes. Pickup and drop-off are from your chosen location, including a hotel or Airbnb in Athens, Athens Airport (ATH), or Piraeus Port." },
      { q: "How do I book a private tour?", a: "Message us on WhatsApp or email, or use the price calculator on our homepage to request a quote. We will confirm the date, pickup point and number of passengers." },
    ],
  },
  el: {
    title: "VIP Εκδρομές Αθήνα | Ιδιωτικές Εκδρομές & Ημερήσιες | H&A VIP Tours",
    description: "Ιδιωτικές VIP εκδρομές από την Αθήνα: ξενάγηση στην πόλη, Σούνιο, Δελφοί, Ναύπλιο και Μετέωρα. Mercedes Vito VIP, έως 7 επιβάτες, παιδικά καθίσματα κατόπιν αιτήματος.",
    h1: "VIP εκδρομές στην Αθήνα",
    intro: "Η H&A VIP Tours προσφέρει ιδιωτικές VIP εκδρομές από την Αθήνα με Mercedes Vito VIP, για έως 7 επιβάτες, με επαγγελματία οδηγό που μιλά αγγλικά. Κάθε ημερήσια εκδρομή είναι μόνο για τη δική σας ομάδα. Σας παραλαμβάνουμε από το ξενοδοχείο σας, το Airbnb, το Αεροδρόμιο της Αθήνας ή το Λιμάνι του Πειραιά και σχεδιάζουμε τη διαδρομή μαζί σας. [Τα παιδικά καθίσματα περιλαμβάνονται κατόπιν αιτήματος.](/child-seats)",
    toursTitle: "Οι ιδιωτικές μας εκδρομές από την Αθήνα",
    tours: tours([
      ["Ξενάγηση στην Αθήνα", "Περιοχή της Ακρόπολης, Πλάκα, Σύνταγμα και Παναθηναϊκό Στάδιο. Περίπου 3 ώρες."],
      ["Εκδρομή στο Σούνιο", "Ναός του Ποσειδώνα και Αθηναϊκή Ριβιέρα, με αναχωρήσεις και για το ηλιοβασίλεμα. Περίπου 5 ώρες."],
      ["Ιδιωτική εκδρομή στους Δελφούς", "Το ιερό του Απόλλωνα, με προαιρετική στάση στην Αράχωβα. Περίπου 8 ώρες."],
      ["Ιδιωτική εκδρομή στο Ναύπλιο", "Η πρώτη πρωτεύουσα της Ελλάδας, με προαιρετικές στάσεις στις Μυκήνες, την Επίδαυρο και τη Διώρυγα της Κορίνθου. Περίπου 8 ώρες."],
      ["Ιδιωτική εκδρομή στα Μετέωρα", "Τα μοναστήρια της UNESCO, ένα ολοήμερο ταξίδι από την Αθήνα. Περίπου 12 ώρες."],
    ]),
    priceNote: "Η τρέχουσα τιμή ανά όχημα αναγράφεται σε κάθε σελίδα εκδρομής και στον [υπολογιστή τιμής](/#calculator).",
    included: "Παραλαβή και επιστροφή από το σημείο της επιλογής σας, Mercedes Vito VIP, Wi-Fi και εμφιαλωμένο νερό, και εκδρομή μόνο για τη δική σας ομάδα.",
    links: links("Δείτε αμέσως την τιμή σας", "Μεταφορές από το Αεροδρόμιο της Αθήνας"),
    faqTitle: "Συχνές ερωτήσεις",
    faq: [
      { q: "Ποιες VIP εκδρομές προσφέρετε από την Αθήνα;", a: "Προσφέρουμε ιδιωτικές εκδρομές στην Αθήνα, στο Σούνιο και τον Ναό του Ποσειδώνα, στους Δελφούς, στο Ναύπλιο και στα Μετέωρα, με Mercedes Vito VIP για έως 7 επιβάτες. Τα παιδικά καθίσματα περιλαμβάνονται κατόπιν αιτήματος." },
      { q: "Είναι οι εκδρομές ιδιωτικές και πόσοι επιβάτες μπορούν να συμμετέχουν;", a: "Ναι. Κάθε εκδρομή είναι μόνο για τη δική σας ομάδα. Το Mercedes Vito VIP μεταφέρει έως 7 επιβάτες, χωρίς να υπολογίζεται ο οδηγός." },
      { q: "Μπορεί η εκδρομή να ξεκινήσει από το ξενοδοχείο μας, το αεροδρόμιο ή το λιμάνι;", a: "Ναι. Η παραλαβή και η επιστροφή γίνονται από το σημείο της επιλογής σας, όπως ξενοδοχείο ή Airbnb στην Αθήνα, το Αεροδρόμιο της Αθήνας (ATH) ή το Λιμάνι του Πειραιά." },
      { q: "Πώς κλείνω μια ιδιωτική εκδρομή;", a: "Στείλτε μας μήνυμα στο WhatsApp ή email, ή χρησιμοποιήστε τον υπολογιστή τιμής στην αρχική μας σελίδα για να ζητήσετε προσφορά τιμής. Θα επιβεβαιώσουμε την ημερομηνία, το σημείο παραλαβής και τον αριθμό των επιβατών." },
    ],
  },
  de: {
    title: "VIP-Touren Athen | Private Touren & Tagesausflüge | H&A VIP Tours",
    description: "Private VIP-Touren ab Athen: Stadttour, Kap Sounion, Delphi, Nafplio und Meteora. Mercedes Vito VIP, bis zu 7 Fahrgäste, Kindersitze auf Anfrage inbegriffen.",
    h1: "VIP-Touren in Athen",
    intro: "H&A VIP Tours bietet private VIP-Touren ab Athen im Mercedes Vito VIP für bis zu 7 Fahrgäste, mit einem professionellen, Englisch sprechenden Chauffeur. Jeder Tagesausflug ist nur für Ihre Gruppe. Wir holen Sie an Ihrem Hotel, Airbnb, am Flughafen Athen oder am Hafen Piräus ab und planen die Route gemeinsam mit Ihnen. [Kindersitze sind auf Anfrage inbegriffen.](/child-seats)",
    toursTitle: "Unsere privaten Touren ab Athen",
    tours: tours([
      ["Stadttour Athen", "Rund um die Akropolis, Plaka, Syntagma und das Panathenäische Stadion. Etwa 3 Stunden."],
      ["Tour zum Kap Sounion", "Poseidontempel und Athener Riviera, auch mit Abfahrten zum Sonnenuntergang. Etwa 5 Stunden."],
      ["Private Tour nach Delphi", "Das Heiligtum des Apollon, mit optionalem Halt in Arachova. Etwa 8 Stunden."],
      ["Private Tour nach Nafplio", "Griechenlands erste Hauptstadt, mit optionalen Stopps in Mykene, Epidauros und am Kanal von Korinth. Etwa 8 Stunden."],
      ["Private Tour nach Meteora", "Die UNESCO-Klöster, eine Tagesreise ab Athen. Etwa 12 Stunden."],
    ]),
    priceNote: "Der aktuelle Preis pro Fahrzeug steht auf jeder Tourseite und im [Preisrechner](/#calculator).",
    included: "Abholung und Rückfahrt an einem Ort Ihrer Wahl, ein Mercedes Vito VIP, WLAN und Wasserflaschen sowie eine Tour nur für Ihre Gruppe.",
    links: links("Sofortpreis berechnen", "Transfers vom Flughafen Athen"),
    faqTitle: "Häufige Fragen",
    faq: [
      { q: "Welche VIP-Touren bieten Sie ab Athen an?", a: "Wir bieten private Touren durch Athen, zum Kap Sounion und zum Poseidontempel, nach Delphi, Nafplio und Meteora an, im Mercedes Vito VIP für bis zu 7 Fahrgäste. Kindersitze sind auf Anfrage inbegriffen." },
      { q: "Sind die Touren privat und wie viele Fahrgäste können mitfahren?", a: "Ja. Jede Tour ist nur für Ihre Gruppe. Der Mercedes Vito VIP befördert bis zu 7 Fahrgäste, ohne den Fahrer." },
      { q: "Kann die Tour an unserem Hotel, am Flughafen oder am Hafen beginnen?", a: "Ja. Abholung und Rückfahrt erfolgen an einem Ort Ihrer Wahl, etwa an einem Hotel oder Airbnb in Athen, am Flughafen Athen (ATH) oder am Hafen Piräus." },
      { q: "Wie buche ich eine private Tour?", a: "Schreiben Sie uns per WhatsApp oder E-Mail oder nutzen Sie den Preisrechner auf unserer Startseite, um ein Angebot anzufragen. Wir bestätigen Datum, Abholort und Anzahl der Fahrgäste." },
    ],
  },
  es: {
    title: "Tours VIP Atenas | Tours Privados y Excursiones | H&A VIP Tours",
    description: "Tours VIP privados desde Atenas: tour por la ciudad, cabo Sunión, Delfos, Nauplia y Meteora. Mercedes Vito VIP, hasta 7 pasajeros, sillas infantiles bajo petición.",
    h1: "Tours VIP en Atenas",
    intro: "H&A VIP Tours ofrece tours VIP privados desde Atenas en un Mercedes Vito VIP, para hasta 7 pasajeros, con un chófer profesional que habla inglés. Cada excursión de un día es solo para su grupo. Le recogemos en su hotel, Airbnb, el aeropuerto de Atenas o el puerto del Pireo, y planificamos la ruta con usted. [Las sillas infantiles están incluidas bajo petición.](/child-seats)",
    toursTitle: "Nuestros tours privados desde Atenas",
    tours: tours([
      ["Tour por Atenas", "Zona de la Acrópolis, Plaka, Syntagma y el Estadio Panatenaico. Unas 3 horas."],
      ["Tour al cabo Sunión", "Templo de Poseidón y la Riviera de Atenas, incluidas salidas al atardecer. Unas 5 horas."],
      ["Tour privado a Delfos", "El santuario de Apolo, con parada opcional en Arájova. Unas 8 horas."],
      ["Tour privado a Nauplia", "La primera capital de Grecia, con paradas opcionales en Micenas, Epidauro y el canal de Corinto. Unas 8 horas."],
      ["Tour privado a Meteora", "Los monasterios de la UNESCO, un viaje de día completo desde Atenas. Unas 12 horas."],
    ]),
    priceNote: "El precio actual por vehículo figura en cada página de tour y en la [calculadora de precios](/#calculator).",
    included: "Recogida y regreso en el lugar que elija, un Mercedes Vito VIP, Wi-Fi y agua embotellada, y un tour solo para su grupo.",
    links: links("Obtenga su precio al instante", "Traslados del aeropuerto de Atenas"),
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿Qué tours VIP ofrecen desde Atenas?", a: "Ofrecemos tours privados por Atenas, al cabo Sunión y el templo de Poseidón, a Delfos, Nauplia y Meteora, en un Mercedes Vito VIP para hasta 7 pasajeros. Las sillas infantiles están incluidas bajo petición." },
      { q: "¿Los tours son privados y cuántos pasajeros pueden participar?", a: "Sí. Cada tour es solo para su grupo. El Mercedes Vito VIP lleva hasta 7 pasajeros, sin contar al conductor." },
      { q: "¿Puede empezar el tour en nuestro hotel, el aeropuerto o el puerto?", a: "Sí. La recogida y el regreso son en el lugar que elija, como un hotel o Airbnb en Atenas, el aeropuerto de Atenas (ATH) o el puerto del Pireo." },
      { q: "¿Cómo reservo un tour privado?", a: "Escríbanos por WhatsApp o correo electrónico, o use la calculadora de precios de nuestra página de inicio para solicitar un presupuesto. Confirmaremos la fecha, el punto de recogida y el número de pasajeros." },
    ],
  },
  fr: {
    title: "Excursions VIP Athènes | Visites Privées & Journées | H&A VIP Tours",
    description: "Excursions VIP privées depuis Athènes : visite de la ville, cap Sounion, Delphes, Nauplie et Météores. Mercedes Vito VIP, jusqu’à 7 passagers, sièges enfants sur demande.",
    h1: "Excursions VIP à Athènes",
    intro: "H&A VIP Tours propose des excursions VIP privées depuis Athènes en Mercedes Vito VIP, pour jusqu’à 7 passagers, avec un chauffeur professionnel anglophone. Chaque excursion à la journée est réservée à votre seul groupe. Nous venons vous chercher à votre hôtel, votre Airbnb, l’aéroport d’Athènes ou le port du Pirée, et nous planifions l’itinéraire avec vous. [Les sièges enfants sont inclus sur demande.](/child-seats)",
    toursTitle: "Nos excursions privées depuis Athènes",
    tours: tours([
      ["Visite d’Athènes", "Le quartier de l’Acropole, Plaka, Syntagma et le stade panathénaïque. Environ 3 heures."],
      ["Excursion au cap Sounion", "Le temple de Poséidon et la Riviera athénienne, avec départs au coucher du soleil. Environ 5 heures."],
      ["Excursion privée à Delphes", "Le sanctuaire d’Apollon, avec un arrêt facultatif à Arachova. Environ 8 heures."],
      ["Excursion privée à Nauplie", "La première capitale de la Grèce, avec des arrêts facultatifs à Mycènes, Épidaure et au canal de Corinthe. Environ 8 heures."],
      ["Excursion privée aux Météores", "Les monastères classés par l’UNESCO, une journée complète depuis Athènes. Environ 12 heures."],
    ]),
    priceNote: "Le prix actuel par véhicule est indiqué sur chaque page d’excursion et dans le [calculateur de prix](/#calculator).",
    included: "Prise en charge et retour au lieu de votre choix, un Mercedes Vito VIP, Wi-Fi et eau en bouteille, et une excursion réservée à votre seul groupe.",
    links: links("Obtenez votre prix immédiat", "Transferts depuis l’aéroport d’Athènes"),
    faqTitle: "Questions fréquentes",
    faq: [
      { q: "Quelles excursions VIP proposez-vous depuis Athènes ?", a: "Nous proposons des excursions privées à Athènes, au cap Sounion et au temple de Poséidon, à Delphes, à Nauplie et aux Météores, en Mercedes Vito VIP pour jusqu’à 7 passagers. Les sièges enfants sont inclus sur demande." },
      { q: "Les excursions sont-elles privées, et combien de passagers peuvent participer ?", a: "Oui. Chaque excursion est réservée à votre seul groupe. Le Mercedes Vito VIP transporte jusqu’à 7 passagers, sans compter le chauffeur." },
      { q: "L’excursion peut-elle commencer à notre hôtel, à l’aéroport ou au port ?", a: "Oui. La prise en charge et le retour se font au lieu de votre choix, notamment un hôtel ou un Airbnb à Athènes, l’aéroport d’Athènes (ATH) ou le port du Pirée." },
      { q: "Comment réserver une excursion privée ?", a: "Écrivez-nous sur WhatsApp ou par e-mail, ou utilisez le calculateur de prix sur notre page d’accueil pour demander un devis. Nous confirmerons la date, le lieu de prise en charge et le nombre de passagers." },
    ],
  },
  it: {
    title: "Tour VIP Atene | Tour Privati e Gite di un Giorno | H&A VIP Tours",
    description: "Tour VIP privati da Atene: tour della città, Capo Sounion, Delfi, Nauplia e Meteora. Mercedes Vito VIP, fino a 7 passeggeri, seggiolini inclusi su richiesta.",
    h1: "Tour VIP ad Atene",
    intro: "H&A VIP Tours offre tour VIP privati da Atene con un Mercedes Vito VIP, per fino a 7 passeggeri, con un autista professionista che parla inglese. Ogni gita di un giorno è solo per il vostro gruppo. Vi prendiamo in hotel, all’Airbnb, all’aeroporto di Atene o al porto del Pireo, e pianifichiamo il percorso insieme a voi. [I seggiolini sono inclusi su richiesta.](/child-seats)",
    toursTitle: "I nostri tour privati da Atene",
    tours: tours([
      ["Tour di Atene", "Zona dell’Acropoli, Plaka, Syntagma e lo Stadio Panatenaico. Circa 3 ore."],
      ["Tour a Capo Sounion", "Il Tempio di Poseidone e la Riviera di Atene, con partenze anche al tramonto. Circa 5 ore."],
      ["Tour privato a Delfi", "Il santuario di Apollo, con sosta facoltativa ad Arachova. Circa 8 ore."],
      ["Tour privato a Nauplia", "La prima capitale della Grecia, con soste facoltative a Micene, Epidauro e al Canale di Corinto. Circa 8 ore."],
      ["Tour privato alle Meteore", "I monasteri patrimonio UNESCO, un viaggio di un’intera giornata da Atene. Circa 12 ore."],
    ]),
    priceNote: "Il prezzo attuale per veicolo è indicato in ogni pagina del tour e nel [calcolatore di prezzo](/#calculator).",
    included: "Prelievo e rientro nel luogo che scegliete, un Mercedes Vito VIP, Wi-Fi e acqua in bottiglia, e un tour solo per il vostro gruppo.",
    links: links("Ottieni subito il tuo prezzo", "Transfer dall’aeroporto di Atene"),
    faqTitle: "Domande frequenti",
    faq: [
      { q: "Quali tour VIP offrite da Atene?", a: "Offriamo tour privati di Atene, Capo Sounion e il Tempio di Poseidone, Delfi, Nauplia e Meteora, con un Mercedes Vito VIP per fino a 7 passeggeri. I seggiolini sono inclusi su richiesta." },
      { q: "I tour sono privati e quanti passeggeri possono partecipare?", a: "Sì. Ogni tour è solo per il vostro gruppo. Il Mercedes Vito VIP trasporta fino a 7 passeggeri, escluso l’autista." },
      { q: "Il tour può partire dal nostro hotel, dall’aeroporto o dal porto?", a: "Sì. Prelievo e rientro avvengono nel luogo che scegliete, come un hotel o Airbnb ad Atene, l’aeroporto di Atene (ATH) o il porto del Pireo." },
      { q: "Come prenoto un tour privato?", a: "Scriveteci su WhatsApp o via email, oppure usate il calcolatore di prezzo nella nostra homepage per richiedere un preventivo. Confermeremo data, punto di prelievo e numero di passeggeri." },
    ],
  },
  he: {
    title: "סיורי VIP באתונה | סיורים פרטיים וטיולי יום | H&A VIP Tours",
    description: "סיורי VIP פרטיים מאתונה: סיור בעיר, כף סוניון, דלפי, נפליון ומטאורה. Mercedes Vito VIP, עד 7 נוסעים, מושבי בטיחות לילדים כלולים לפי בקשה.",
    h1: "סיורי VIP באתונה",
    intro: "H&A VIP Tours מציעה סיורי VIP פרטיים מאתונה ב-Mercedes Vito VIP, לעד 7 נוסעים, עם נהג מקצועי דובר אנגלית. כל טיול יום מיועד לקבוצה שלכם בלבד. אנחנו אוספים אתכם מהמלון, מה-Airbnb, מנמל התעופה של אתונה או מנמל פיראוס, ומתכננים איתכם את המסלול. [מושבי בטיחות לילדים כלולים לפי בקשה.](/child-seats)",
    toursTitle: "הסיורים הפרטיים שלנו מאתונה",
    tours: tours([
      ["סיור בעיר אתונה", "אזור האקרופוליס, פלאקה, סינטגמה והאצטדיון הפנאתנאי. כ-3 שעות."],
      ["סיור לכף סוניון", "מקדש פוסידון והריביירה של אתונה, כולל יציאות לשקיעה. כ-5 שעות."],
      ["סיור פרטי לדלפי", "מקדש אפולו, עם עצירה אופציונלית בארחובה. כ-8 שעות."],
      ["סיור פרטי לנפליון", "בירתה הראשונה של יוון, עם עצירות אופציונליות במיקנה, באפידאורוס ובתעלת קורינתוס. כ-8 שעות."],
      ["סיור פרטי למטאורה", "מנזרי אונסק\"ו, מסע של יום שלם מאתונה. כ-12 שעות."],
    ]),
    priceNote: "המחיר העדכני לרכב מופיע בכל עמוד סיור וב[מחשבון המחירים](/#calculator).",
    included: "איסוף והחזרה מהמקום שתבחרו, Mercedes Vito VIP, Wi-Fi ומים בבקבוקים, וסיור לקבוצה שלכם בלבד.",
    links: links("קבלו מחיר מיידי", "הסעות מנמל התעופה של אתונה"),
    faqTitle: "שאלות נפוצות",
    faq: [
      { q: "אילו סיורי VIP אתם מציעים מאתונה?", a: "אנחנו מציעים סיורים פרטיים באתונה, לכף סוניון ולמקדש פוסידון, לדלפי, לנפליון ולמטאורה, ב-Mercedes Vito VIP לעד 7 נוסעים. מושבי בטיחות לילדים כלולים לפי בקשה." },
      { q: "האם הסיורים פרטיים, וכמה נוסעים יכולים להצטרף?", a: "כן. כל סיור מיועד לקבוצה שלכם בלבד. ה-Mercedes Vito VIP מסיע עד 7 נוסעים, לא כולל הנהג." },
      { q: "האם הסיור יכול להתחיל מהמלון שלנו, מנמל התעופה או מהנמל?", a: "כן. האיסוף וההחזרה הם מהמקום שתבחרו, כולל מלון או Airbnb באתונה, נמל התעופה של אתונה (ATH) או נמל פיראוס." },
      { q: "איך מזמינים סיור פרטי?", a: "שלחו לנו הודעה ב-WhatsApp או באימייל, או השתמשו במחשבון המחירים בדף הבית שלנו כדי לבקש הצעת מחיר. נאשר את התאריך, נקודת האיסוף ומספר הנוסעים." },
    ],
  },
  ar: {
    title: "جولات VIP في أثينا | جولات خاصة ورحلات يومية | H&A VIP Tours",
    description: "جولات VIP خاصة من أثينا: جولة في المدينة، رأس سونيون، دلفي، نافبليو وميتيورا. Mercedes Vito VIP، حتى 7 ركاب، مقاعد الأطفال مشمولة عند الطلب.",
    h1: "جولات VIP في أثينا",
    intro: "تقدم H&A VIP Tours جولات VIP خاصة من أثينا في Mercedes Vito VIP، لما يصل إلى 7 ركاب، مع سائق محترف يتحدث الإنجليزية. كل رحلة يومية مخصصة لمجموعتكم فقط. نستقبلكم من فندقكم أو Airbnb أو مطار أثينا أو ميناء بيرايوس، ونخطط المسار معكم. [مقاعد الأطفال مشمولة عند الطلب.](/child-seats)",
    toursTitle: "جولاتنا الخاصة من أثينا",
    tours: tours([
      ["جولة في مدينة أثينا", "منطقة الأكروبوليس وبلاكا وسينتاغما والملعب الباناثينايكي. نحو 3 ساعات."],
      ["جولة إلى رأس سونيون", "معبد بوسيدون وريفييرا أثينا، بما في ذلك الانطلاق وقت الغروب. نحو 5 ساعات."],
      ["جولة خاصة إلى دلفي", "معبد أبولو، مع توقف اختياري في أراخوفا. نحو 8 ساعات."],
      ["جولة خاصة إلى نافبليو", "أول عاصمة لليونان، مع توقفات اختيارية في ميكيناي وإبيداوروس وقناة كورنثوس. نحو 8 ساعات."],
      ["جولة خاصة إلى ميتيورا", "أديرة اليونسكو، رحلة ليوم كامل من أثينا. نحو 12 ساعة."],
    ]),
    priceNote: "السعر الحالي لكل مركبة مذكور في صفحة كل جولة وفي [حاسبة الأسعار](/#calculator).",
    included: "الاستقبال والتوصيل من الموقع الذي تختارونه، وMercedes Vito VIP، وWi-Fi ومياه معبأة، وجولة مخصصة لمجموعتكم فقط.",
    links: links("احصلوا على سعركم فورًا", "خدمات النقل من مطار أثينا"),
    faqTitle: "الأسئلة الشائعة",
    faq: [
      { q: "ما جولات VIP التي تقدمونها من أثينا؟", a: "نقدم جولات خاصة في أثينا، وإلى رأس سونيون ومعبد بوسيدون، ودلفي، ونافبليو، وميتيورا، في Mercedes Vito VIP لما يصل إلى 7 ركاب. مقاعد الأطفال مشمولة عند الطلب." },
      { q: "هل الجولات خاصة، وكم عدد الركاب الذين يمكنهم الانضمام؟", a: "نعم. كل جولة مخصصة لمجموعتكم فقط. تتسع Mercedes Vito VIP لما يصل إلى 7 ركاب، دون احتساب السائق." },
      { q: "هل يمكن أن تبدأ الجولة من فندقنا أو المطار أو الميناء؟", a: "نعم. يكون الاستقبال والتوصيل من الموقع الذي تختارونه، بما في ذلك فندق أو Airbnb في أثينا، أو مطار أثينا (ATH)، أو ميناء بيرايوس." },
      { q: "كيف أحجز جولة خاصة؟", a: "راسلونا عبر WhatsApp أو البريد الإلكتروني، أو استخدموا حاسبة الأسعار في صفحتنا الرئيسية لطلب عرض سعر. سنؤكد التاريخ ونقطة الاستقبال وعدد الركاب." },
    ],
  },
};

export const vipToursCopy = (language: string) => vipToursHub[language.split("-")[0]] ?? vipToursHub.en;

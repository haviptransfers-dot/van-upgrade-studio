import tourAcropolis from "@/assets/tour-acropolis.webp";

export interface BlogSection {
  heading?: string; // H2
  subheading?: string; // H3
  paragraphs?: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  date: string; // ISO
  metaTitle: string;
  metaDescription: string;
  sections: BlogSection[];
}

export const WHATSAPP_URL = "https://wa.me/306949393700";

export const blogPosts: BlogPost[] = [
  {
    slug: "test-article",
    title: "Athens Airport Transfer Guide: Everything You Need to Know",
    excerpt:
      "Landing at Athens International Airport? Here's how to get to the city center comfortably, what to expect, and why a private transfer makes all the difference.",
    image: tourAcropolis,
    imageAlt: "The Acropolis of Athens at golden hour",
    date: "2026-09-01",
    metaTitle: "Athens Airport Transfer Guide | H&A VIP Transfers",
    metaDescription:
      "Complete guide to Athens airport transfers: options, prices, travel times and tips. Book a premium Mercedes V Class private transfer with H&A Tours.",
    sections: [
      {
        heading: "Arriving at Athens International Airport",
        paragraphs: [
          "Athens International Airport (ATH) is located about 33 km east of the city center. After a long flight, the last thing you want is to figure out public transport with your luggage or negotiate with taxi drivers.",
          "A pre-booked private transfer means your driver is already waiting for you at the arrivals hall, holding a sign with your name.",
        ],
      },
      {
        heading: "Your Transfer Options",
        subheading: "Comparing the main choices",
        bullets: [
          "Private transfer: fixed price, door-to-door, flight monitoring included",
          "Taxi: available 24/7 but prices vary and queues can be long in summer",
          "Metro: cheapest option, ~40 minutes to Syntagma, but crowded with luggage",
          "Bus (X95): runs 24/7 but takes 60+ minutes depending on traffic",
        ],
      },
      {
        heading: "Why Choose a Private Transfer",
        paragraphs: [
          "With H&A Tours you travel in a premium Mercedes V Class with leather seats, complimentary Wi-Fi and bottled water. Your English-speaking driver monitors your flight, so even if you're delayed, we'll be there.",
        ],
        bullets: [
          "Fixed, transparent pricing — no surprises",
          "Free waiting time and flight tracking",
          "Child seats available on request",
          "5.0-star rated service on Google",
        ],
      },
      {
        heading: "How to Book",
        paragraphs: [
          "Booking takes less than a minute. Send us a message on WhatsApp with your flight number, arrival time and destination — we'll confirm instantly and take care of the rest.",
        ],
      },
    ],
  },
];

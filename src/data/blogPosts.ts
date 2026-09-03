import tourAcropolis from "@/assets/tour-acropolis.webp";
import athensAirportHotelTransfer from "@/assets/athens-airport-hotel-transfer.webp";
import { blogPostTranslations, type BlogPostTranslation } from "./blogPostTranslations";

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

/** Returns the post with localized fields for `lang`, falling back to the base (English) content. */
export function localizePost(post: BlogPost, lang: string): BlogPost {
  const base = lang?.split("-")[0];
  const tr: BlogPostTranslation | undefined =
    blogPostTranslations[post.slug]?.[lang] ??
    (base ? blogPostTranslations[post.slug]?.[base] : undefined);
  if (!tr) return post;
  return { ...post, ...tr };
}

export const WHATSAPP_URL = "https://wa.me/306949393700";

export const blogPosts: BlogPost[] = [
  {
    slug: "private-transfer-athens-airport-to-hotel",
    title: "Private Transfer from Athens Airport to Hotel",
    excerpt:
      "Skip taxi queues and travel from Athens Airport to your hotel in comfort. Discover why a private Mercedes V-Class transfer is the smartest start to your Athens stay.",
    image: athensAirportHotelTransfer,
    imageAlt:
      "Stylized illustration of a private car transfer from Athens Airport to a hotel at sunset",
    date: "2026-09-03",
    metaTitle:
      "Private Transfer from Athens Airport to Hotel | H&A VIP Transfers",
    metaDescription:
      "Book a premium private transfer from Athens Airport to your hotel. Mercedes V-Class, 24/7 WhatsApp support, fixed pickup, direct route.",
    sections: [
      {
        paragraphs: [
          "After a flight, the last thing a traveler needs is to deal with queues, search for an available taxi, or squeeze luggage into a limited vehicle. A private transfer from Athens Airport to your hotel gives your arrival a different pace: the driver and vehicle are scheduled for you, the route is direct, and the service adapts to your own travel schedule.",
          "For guests who choose comfort, discretion, and reliable transfer time, a private service is not just a way to get to their accommodation. It is the first properly organized experience of their stay in Athens.",
        ],
      },
      {
        heading: "What changes with a private transfer from Athens Airport",
        paragraphs: [
          "Athens International Airport is quite far from the center. The duration of the ride to a hotel in Syntagma, Plaka, Kolonaki or the Riviera depends on the time, traffic and final destination. This is why organizing your transfer in advance has real value, especially when arrival is late at night, early in the morning or during peak tourist season.",
          "In a premium private transfer, you don't need to negotiate the route, explain the address in a hurry, or wonder if there is enough space for your suitcases. Flight details, number of passengers, luggage and hotel are confirmed in advance.",
          "This is especially useful for couples who want a quiet arrival, families with children and strollers, small groups with a lot of luggage, or professionals who need to be at their hotel without delay.",
        ],
      },
      {
        heading: "Mercedes V-Class: comfort in every detail",
        paragraphs: [
          "The quality of the vehicle affects the journey much more than it seems at first. A Mercedes V-Class offers a spacious cabin, comfortable seats and practical luggage space. For a family or a small group, the ability to travel all together without compromises creates a noticeably better experience.",
          "Comfort is not just about size. It is about cleanliness, air conditioning, a quiet ride and the fact that you do not share the vehicle with strangers. The transfer is private, from pickup to the entrance of your hotel.",
        ],
      },
      {
        heading: "Punctuality is not a detail",
        paragraphs: [
          "A proper transfer service monitors the arrival details you provide and organizes pickup based on your actual travel plan. Flight delays happen. In these cases, direct communication with the provider is crucial.",
          "24/7 access via WhatsApp makes managing a change simple and immediate. You can confirm details before you fly, inform about a change or ask for help for your next route.",
        ],
      },
      {
        heading: "When is a private Athens Airport to Hotel transfer the best choice?",
        paragraphs: [
          "It is the best choice when comfort and time are a priority. Especially for evening arrivals, families with children, guests arriving after a long-haul flight, or business trips with scheduled meetings.",
          "It is also a smart solution for guests who continue their journey from Athens to the port of Piraeus, Rafina or other destinations in Attica.",
        ],
      },
      {
        heading: "How to make a correct booking",
        paragraphs: [
          "You need: main passenger name, date, time and flight number, destination or full hotel address, number of passengers and luggage. If you travel with a child, ask for the appropriate child seat in advance.",
          "H&A VIP Tours serves exactly this need with premium private transfers in Athens, Mercedes V-Class and direct communication via WhatsApp, 24 hours a day.",
        ],
      },
    ],
  },
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

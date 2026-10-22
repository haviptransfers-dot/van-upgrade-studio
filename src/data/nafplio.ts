import cover from "../assets/nafplio-van-vip-800.webp.asset.json";
import map from "../assets/route-athens-nafplio-map-800.webp.asset.json";

const hosted = (url: string) => `https://van-move-boost.lovable.app${url}`;

export const nafplioPost = {
  slug: "athens-to-nafplio-private-tour",
  title: "Nafplio Private Tour from Athens",
  metaTitle: "Nafplio Private Tour from Athens | Mercedes V-Class VIP Day Trip",
  metaDescription: "Private Nafplio tour from Athens in Mercedes V-Class. Corinth Canal, Mycenae, Epidaurus stops. 24/7 WhatsApp, child seats, hotel/port pickup.",
  keywords: "nafplio private tour, athens to nafplio transfer, private day trip nafplio",
  excerpt: "A private Mercedes V-Class day journey from Athens to Nafplio, with a relaxed old-town visit and optional Corinth Canal, Mycenae and Epidaurus stops.",
  image: hosted(cover.url),
  imageAlt: "Private Mercedes V-Class in Nafplio with Bourtzi view",
  map: hosted(map.url),
  mapAlt: "Road map Athens to Nafplio route 135km",
  date: "2026-10-22",
  staticDocument: true,
  sections: [],
};

export const nafplioFaq = [
  { question: "How long is Athens to Nafplio?", answer: "~2 hours, 150km" },
  { question: "Can we stop at Corinth Canal?", answer: "Yes, ideal 15-min stop" },
  { question: "Is car seat available?", answer: "Yes, free on request" },
];
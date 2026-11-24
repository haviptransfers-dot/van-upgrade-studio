import cover from "../assets/nafplio-van-vip-800.webp.asset.json";
import map from "../assets/route-athens-nafplio-map-800.webp.asset.json";
import { hostedImageUrl } from "../lib/mediaUrl";

const hosted = hostedImageUrl;

export const nafplioPost = {
  slug: "athens-to-nafplio-private-tour",
  title: "Nafplio Private Tour from Athens",
  metaTitle: "Nafplio Private Tour from Athens | Mercedes Vito VIP Day Trip",
  metaDescription: "Private Nafplio tour from Athens in Mercedes Vito VIP. Corinth Canal, Mycenae, Epidaurus stops. 24/7 WhatsApp, child seats, hotel/port pickup.",
  keywords: "nafplio private tour, athens to nafplio transfer, private day trip nafplio",
  excerpt: "A private Mercedes Vito VIP day journey from Athens to Nafplio, with a relaxed old-town visit and optional Corinth Canal, Mycenae and Epidaurus stops.",
  image: hosted(cover.url),
  socialImage: "https://haviptransfers.gr/static-media/nafplio-van-vip-1200.webp",
  imageAlt: "Private Mercedes Vito VIP in Nafplio with Bourtzi view",
  map: hosted(map.url),
  mapAlt: "Road map Athens to Nafplio route 135km",
  date: "2026-10-22",
  staticDocument: true,
  sections: [],
};

export const nafplioFaq = [
  { question: "How long is Athens to Nafplio?", answer: "~2 hours, 150km" },
  { question: "Can we stop at Corinth Canal?", answer: "Yes, ideal 15-min stop" },
  { question: "Is car seat available?", answer: "Yes, included on request" },
];
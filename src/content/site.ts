import { getOffering, offerings, serviceSlugs } from "@/content/offerings";

export { offerings, serviceSlugs, getOffering } from "@/content/offerings";
export type { Offering, OfferingSlug } from "@/content/offerings";

export const studio = {
  name: "MAKS Consulting Services",
  short: "MAKS",
  scheme: "MAKS Business Consulting and Services",
  city: "Hyderabad",
  region: "Telangana",
  email: "maksconsulting.in@gmail.com",
  phone: "9346032432",
  phoneDisplay: "+91 93460 32432",
  phoneE164: "919346032432",
  website: "maksconsulting.in",
  websiteUrl: "https://maksconsulting.in",
  hours: "Monday to Friday, 10:00–18:00 IST",
  visit: "Hyderabad, Telangana. Visits by appointment.",
  greeting: "MAKS",
  tagline: "Empower Insights. Stronger Tomorrow.",
  motto: "Smart minds · Wise decisions · Sustainable growth",
  // partners: "CaryPact · BOT Chain",
};

export function joinWhatsAppHref() {
  return `https://wa.me/${studio.phoneE164}?text=${encodeURIComponent(studio.greeting)}`;
}

export const scheme = {
  kicker: "Revived for our community",
  lede: "A simple, transparent and community-driven savings model that rewards participation with 100 BOT.",
  draw: "7:00 PM on the 7th of every month",
  afterLift: "After a member receives a payout, they still contribute 10 BOT each remaining month.",
};

export const facts = [
  { value: "10", unit: "Members", detail: "One closed group" },
  { value: "10", unit: "Months", detail: "A fixed cycle" },
  { value: "10", unit: "BOT", detail: "Per person, every month" },
  { value: "7 PM", unit: "On the 7th", detail: "The monthly draw" },
] as const;

export const steps = [
  {
    index: "01",
    title: "Form a group of ten",
    body: "Ten members make one group. The cycle does not start as an open list.",
  },
  {
    index: "02",
    title: "Contribute equally",
    body: "Every member contributes 10 BOT per month. No one pays a different amount.",
  },
  {
    index: "03",
    title: "Run for ten months",
    body: "The scheme continues for ten months. The draw is at 7:00 PM on the 7th.",
  },
  {
    index: "04",
    title: "One member each month",
    body: "Each month, one member who has not yet received a payout is selected at random and receives that month’s scheduled payout.",
  },
] as const;

export const payouts = [
  { month: 1, contribution: "10 BOT", payout: "92 BOT" },
  { month: 2, contribution: "10 BOT", payout: "93 BOT" },
  { month: 3, contribution: "10 BOT", payout: "94 BOT" },
  { month: 4, contribution: "10 BOT", payout: "95 BOT" },
  { month: 5, contribution: "10 BOT", payout: "96 BOT" },
  { month: 6, contribution: "10 BOT", payout: "97 BOT" },
  { month: 7, contribution: "10 BOT", payout: "98 BOT" },
  { month: 8, contribution: "10 BOT", payout: "99 BOT" },
  { month: 9, contribution: "10 BOT", payout: "100 BOT" },
  { month: 10, contribution: "10 BOT", payout: "101 BOT" },
] as const;

export const advantages = [
  {
    title: "Affordable participation",
    body: "The monthly contribution is 10 BOT. The amount does not change across the cycle.",
  },
  {
    title: "Equal contribution",
    body: "All ten members contribute the same amount, including a member who has already received a payout.",
  },
  {
    title: "A random draw",
    body: "One member is selected each month, from those still waiting for their turn.",
  },
  {
    title: "Progressive payouts",
    body: "The published credit starts at 92 BOT and rises by 1 BOT each month, through 101 BOT.",
  },
  {
    title: "Everyone gets a turn",
    body: "Ten members and ten months. Each member is selected once.",
  },
  {
    title: "Transparent and fair",
    body: "The draw is confirmed on a WhatsApp call, with member verification.",
  },
  {
    title: "A fixed duration",
    body: "The cycle is ten months. It is not an open-ended subscription.",
  },
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export type Service = {
  slug: ServiceSlug;
  name: string;
  short: string;
};

export const services: Service[] = offerings.map((offering) => ({
  slug: offering.slug,
  name: offering.name,
  short: offering.short,
}));

export function getService(slug: string) {
  const offering = getOffering(slug);
  if (!offering) return undefined;
  return { slug: offering.slug, name: offering.name, short: offering.short };
}

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/practice", label: "How we work" },
  { href: "/contact", label: "Contact" },
] as const;

export const engagement = [
  {
    index: "01",
    title: "Listen",
    body: "A working session in Hyderabad or on a call. We ask what you need decided, not which page of a brochure to open.",
  },
  {
    index: "02",
    title: "Separate",
    body: "The coin scheme, advice, consulting, digital holdings, a website, and a marketing note are different pieces of work. We name which one this is.",
  },
  {
    index: "03",
    title: "Write",
    body: "You leave with a page: the rules, the brief, the runbook, or the suggestion. It is written so someone else in the room can read it.",
  },
  {
    index: "04",
    title: "Stop cleanly",
    body: "A season ends. The accounts that should be yours are in your name. You can ask us to continue, or to leave.",
  },
] as const;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:43123";

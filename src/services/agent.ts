import { getOffering, offerings } from "@/content/offerings";
import { payouts, scheme, studio } from "@/content/site";

export type DeskLink = { href: string; label: string };

type Intent = {
  id: string;
  phrases: string[];
  content: string;
  links: DeskLink[];
};

const offeringIntents: Intent[] = offerings.map((offering) => ({
  id: offering.slug,
  phrases: [offering.name.toLowerCase(), offering.slug.replace("-", " "), offering.short.toLowerCase()],
  content: `${offering.name}. ${offering.lede} ${offering.boundary}`,
  links: [
    { href: `/services/${offering.slug}`, label: offering.name },
    { href: `/contact?service=${offering.slug}`, label: "Ask about this" },
  ],
}));

const schedule = payouts
  .map((row) => `Month ${row.month}: ${row.contribution} in, ${row.payout} credited`)
  .join(". ");

const intents: Intent[] = [
  ...offeringIntents,
  {
    id: "schedule",
    phrases: ["payout", "schedule", "92", "101", "bot", "ten members", "10 bot"],
    content: `The coin scheme: ten members, 10 BOT each per month, draw at ${scheme.draw}. ${schedule}. ${scheme.afterLift}`,
    links: [{ href: "/services/coin-scheme", label: "Coin scheme" }],
  },
  {
    id: "visit",
    phrases: ["where", "hyderabad", "address", "email", "phone", "call", "hours"],
    content: `${studio.name} is in ${studio.city}, ${studio.region}. Call ${studio.phoneDisplay} or write to ${studio.email}. ${studio.hours}.`,
    links: [{ href: "/contact", label: "Contact" }],
  },
  {
    id: "services",
    phrases: ["services", "what do you do", "who are you"],
    content: `${studio.name} keeps six services: ${offerings.map((item) => item.name).join(", ")}. Each has its own page.`,
    links: [{ href: "/services", label: "All services" }],
  },
];

function score(text: string, phrases: string[]) {
  return phrases.reduce(
    (total, phrase) => (text.includes(phrase) ? total + phrase.length : total),
    0,
  );
}

export function answerDesk(message: string): { content: string; links: DeskLink[] } {
  const text = message.toLowerCase().replace(/\s+/g, " ").trim();
  if (/^(hi|hello|hey|maks)[.! ]*$/.test(text)) {
    return {
      content: `This is the ${studio.short} desk in ${studio.city}. I can explain any of the six services. A person still answers WhatsApp on ${studio.phoneDisplay}.`,
      links: [
        { href: "/services", label: "Six services" },
        { href: "/contact", label: "Write to us" },
      ],
    };
  }

  let best: Intent | null = null;
  let bestScore = 0;
  for (const intent of intents) {
    const value = score(text, intent.phrases);
    if (value > bestScore) {
      best = intent;
      bestScore = value;
    }
  }

  if (!best) {
    const named = getOffering("business-consulting");
    return {
      content: named
        ? `I can open any of the six services: ${offerings.map((item) => item.name).join(", ")}.`
        : `I can explain the six services at ${studio.name}.`,
      links: [
        { href: "/services", label: "All services" },
        { href: "/contact", label: "Contact" },
      ],
    };
  }

  return { content: best.content, links: best.links };
}

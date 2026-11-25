import { payouts, scheme, steps, studio } from "@/content/site";

export type DeskLink = { href: string; label: string };

type Intent = {
  id: string;
  phrases: string[];
  content: string;
  links: DeskLink[];
};

const schedule = payouts
  .map((row) => `Month ${row.month}: ${row.contribution} in, ${row.payout} credited`)
  .join(". ");

const intents: Intent[] = [
  {
    id: "overview",
    phrases: ["what is", "coin", "scheme", "maks", "who are you", "about"],
    content: `${studio.scheme} is a ten-member, ten-month savings group from ${studio.name}. ${scheme.lede} The draw is at ${scheme.draw}.`,
    links: [
      { href: "/#how", label: "How it works" },
      { href: "/contact", label: "Ask to join" },
    ],
  },
  {
    id: "how",
    phrases: ["how", "work", "group", "members", "contribute", "rules"],
    content: steps.map((step) => `${step.index} ${step.title}. ${step.body}`).join(" "),
    links: [{ href: "/#how", label: "The four rules" }],
  },
  {
    id: "schedule",
    phrases: ["payout", "schedule", "month", "credit", "92", "101", "bot", "winner"],
    content: `Each person contributes 10 BOT every month. The credited payout rises from 92 BOT to 101 BOT. ${schedule}. ${scheme.afterLift}`,
    links: [{ href: "/#schedule", label: "Payout schedule" }],
  },
  {
    id: "join",
    phrases: ["join", "participate", "whatsapp", "enroll", "register", "sign"],
    content: `Send the word MAKS on WhatsApp to ${studio.phoneDisplay}, or write to ${studio.email}. A person replies. The draw is confirmed on a WhatsApp call.`,
    links: [{ href: "/contact", label: "Write to us" }],
  },
  {
    id: "visit",
    phrases: ["where", "hyderabad", "hyd", "address", "email", "phone", "call", "hours"],
    content: `The practice is in ${studio.city}, ${studio.region}. Call ${studio.phoneDisplay} or write to ${studio.email}. Visits are by appointment, ${studio.hours}.`,
    links: [{ href: "/contact", label: "Contact" }],
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
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|maks)[.! ]*$/.test(text)) {
    return {
      content: `This is the ${studio.short} desk. I can explain the ten-member scheme, the payout schedule, or how to send MAKS on WhatsApp.`,
      links: [
        { href: "/#how", label: "How it works" },
        { href: "/contact", label: "Participate" },
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
    return {
      content: `I can explain the ${studio.scheme}, the ten-month schedule, and how to join from ${studio.city}. Send MAKS on WhatsApp to ${studio.phoneDisplay} if you want a person.`,
      links: [
        { href: "/#schedule", label: "Schedule" },
        { href: "/contact", label: "Write to us" },
      ],
    };
  }

  return { content: best.content, links: best.links };
}

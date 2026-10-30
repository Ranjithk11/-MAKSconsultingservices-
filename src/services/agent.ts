import { services } from "@/content/site";

export type DeskLink = { href: string; label: string };

type Intent = {
  id: string;
  phrases: string[];
  content: string;
  links: DeskLink[];
};

const overview = services
  .map((service) => `${service.index} ${service.name} — ${service.short}`)
  .join(" ");

const intents: Intent[] = [
  {
    id: "overview",
    phrases: [
      "what do you do",
      "five systems",
      "your services",
      "the services",
      "what is maks",
      "who are you",
      "consulting",
    ],
    content: `MAKS keeps five systems a firm already depends on. ${overview} We take one of them for a first season of ninety days.`,
    links: [{ href: "/services", label: "See the five systems" }],
  },
  {
    id: "database",
    phrases: ["database", "storage", "backup", "sql", "spreadsheet", "record"],
    content:
      "Database storage is the store of record: the schema, the backups, and who may see what. We name the tables in the language of the firm, and we restore a backup once while we are still in the room. Notes left on this website are written to SQLite and shown on the studio desk.",
    links: [
      { href: "/services/database-storage", label: "Database storage" },
      { href: "/desk", label: "Studio desk" },
    ],
  },
  {
    id: "hosting",
    phrases: ["hosting", "host", "server", "deploy", "uptime", "vercel", "domain"],
    content:
      "The hosting platform is one production environment and one staging copy, with logs a person can read. This site itself runs as a Node process and publishes a plain status report. Credentials stay in the client name.",
    links: [{ href: "/services/hosting-platform", label: "Hosting platform" }],
  },
  {
    id: "mail",
    phrases: ["email", "e-mail", "inbox", "smtp", "mail service", "letter"],
    content:
      "The mail service is the firm on the envelope: inboxes, and the short transactional letters that follow a meeting or a filing. On this site, a contact note is handed to that module. If SMTP is not connected, the letter waits in the outbox and is not marked sent.",
    links: [{ href: "/services/mail-service", label: "Mail service" }],
  },
  {
    id: "whatsapp",
    phrases: ["whatsapp", "whats app", "wa.me", "chat line"],
    content:
      "WhatsApp is kept as a shared desk, not a phone in a pocket. The firm owns the number. Templates cover the messages you repeat. Choosing WhatsApp on the contact form queues a reply through the Cloud API. This agent cannot send that message by itself.",
    links: [
      { href: "/services/whatsapp-service", label: "WhatsApp service" },
      { href: "/contact?channel=whatsapp", label: "Leave a WhatsApp note" },
    ],
  },
  {
    id: "agent",
    phrases: ["agent", "bot", "artificial", "chatgpt", "draft"],
    content:
      "An agent here is a colleague for the routine: intake, status, and the questions that repeat. It works from a brief you can read. It drafts. A person sends. I am that pattern on this site. I can explain the practice. I cannot write to a client.",
    links: [{ href: "/services/agent-services", label: "Agent services" }],
  },
  {
    id: "price",
    phrases: ["price", "pricing", "cost", "quote", "fee", "charge", "how much"],
    content:
      "We do not sell a licence. A working session is complimentary. After it, we quote one system for a ninety-day season, and we say what we will not take on. Write with the system that is failing and we will answer with a range, not a catalogue.",
    links: [{ href: "/contact", label: "Write to the desk" }],
  },
  {
    id: "visit",
    phrases: [
      "where",
      "kolkata",
      "calcutta",
      "address",
      "visit",
      "hours",
      "studio",
      "appointment",
      "when are you",
    ],
    content:
      "The practice is in Kolkata. Visits are by appointment, Monday to Friday, 10:00–18:00 IST. Most of the work happens on a call and inside the systems we leave running.",
    links: [{ href: "/practice", label: "The practice" }],
  },
  {
    id: "season",
    phrases: ["how do you work", "engagement", "process", "first season", "ninety", "method"],
    content:
      "Four steps. Listen: what broke last month. Map: the systems already in use. Build: one narrow system, in production. Keep: we stay for ninety days, then you can ask us to leave. The credentials are yours.",
    links: [{ href: "/practice", label: "How a season works" }],
  },
  {
    id: "human",
    phrases: ["person", "human", "call me", "meeting", "book", "talk to someone", "hire"],
    content:
      "A person reads what I cannot close. Leave your name, the system, and how you want the reply — mail or WhatsApp. Weekdays, 10:00–18:00 IST.",
    links: [{ href: "/contact", label: "Leave a note" }],
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
  if (/^(hi|hello|hey|good morning|good afternoon|good evening)[.! ]*$/.test(text)) {
    return {
      content:
        "This is the MAKS desk. I can explain the five systems, a first season, or how to leave a note for a person. I do not write to clients.",
      links: [
        { href: "/services", label: "Five systems" },
        { href: "/contact", label: "Leave a note" },
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
      content:
        "I can speak about the five systems, a first season, the Kolkata studio, and what an agent is allowed to send. If you want a person, leave a note and name the system.",
      links: [
        { href: "/services", label: "Five systems" },
        { href: "/contact", label: "Write to the desk" },
      ],
    };
  }

  return { content: best.content, links: best.links };
}

export const studio = {
  name: "MAKS Consulting Services",
  short: "MAKS",
  city: "Kolkata",
  email: "desk@maksconsulting.in",
  hours: "Monday to Friday, 10:00–18:00 IST",
  visit: "Kolkata. Visits by appointment.",
  greeting:
    "Hello MAKS desk. I would like to talk about a system we need kept in order.",
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:43123";

export const serviceSlugs = [
  "database-storage",
  "hosting-platform",
  "mail-service",
  "whatsapp-service",
  "agent-services",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export type Service = {
  slug: ServiceSlug;
  index: string;
  name: string;
  short: string;
  lede: string;
  image: string;
  imageAlt: string;
  takes: string[];
  leaves: string[];
  siteNote: string;
};

export const services: Service[] = [
  {
    slug: "database-storage",
    index: "01",
    name: "Database storage",
    short: "The record has to survive a bad day.",
    lede: "Schema, backups, and a clear answer to who may see what. We design the store of record, then we sit with it.",
    image: "/images/service-database.jpg",
    imageAlt:
      "Cream archival boxes, a matte black drive, and a brass key on a dark stone table.",
    takes: [
      "The tables a firm actually uses, named in its own language",
      "Backups that can be restored, with the date written down",
      "Access that matches the work, not a shared password",
      "A quiet move off the spreadsheet that became the system",
    ],
    leaves: [
      "A database with a named owner",
      "A restore drill, done once while we are in the room",
      "A one-page note of what is stored, and for how long",
    ],
    siteNote:
      "Notes sent from this website are written to a SQLite database and listed on the studio desk. Nothing is discarded when mail or WhatsApp is not connected.",
  },
  {
    slug: "hosting-platform",
    index: "02",
    name: "Hosting platform",
    short: "A place for the work to run, and a person when a deploy misbehaves.",
    lede: "One production environment, one staging copy, logs you can read, and a host that does not surprise you on a Sunday.",
    image: "/images/service-hosting.jpg",
    imageAlt:
      "Two charcoal server cabinets with warm amber lights in a quiet plaster room, seen through a glass door.",
    takes: [
      "Production and a staging copy that behaves like it",
      "Deploys a colleague can repeat without us",
      "Logs, a status report, and a disk that does not fill in silence",
      "A monthly cost you can explain",
    ],
    leaves: [
      "The host, the domain, and the credentials in your name",
      "A short runbook for the two failures that actually happen",
      "A status report as plain as the one this site publishes",
    ],
    siteNote:
      "This site is meant to run as a Node process. It publishes a plain status report at /api/health — platform, region, and how long the process has been up.",
  },
  {
    slug: "mail-service",
    index: "03",
    name: "Mail service",
    short: "Your name on the envelope, and mail that arrives.",
    lede: "Inboxes for the firm, and the transactional notes that follow a meeting, a payment, or a filing.",
    image: "/images/service-mail.jpg",
    imageAlt:
      "A stack of cream envelopes, a brass letter opener, and a stick of green sealing wax on a walnut desk.",
    takes: [
      "The domain, the inboxes, and who may send as the firm",
      "SPF, DKIM, and DMARC, set and then checked",
      "Templates for the few letters you send often",
      "A record of what went out",
    ],
    leaves: [
      "Inboxes your people can open",
      "A mail log, not a hope",
      "The sending reputation in your name",
    ],
    siteNote:
      "The contact form uses the mail module in this repository. Without an SMTP host, the letter is kept in the outbox and marked queued. It is never marked sent.",
  },
  {
    slug: "whatsapp-service",
    index: "04",
    name: "WhatsApp service",
    short: "The line clients already use, kept as a desk rather than a pocket.",
    lede: "A shared WhatsApp line, approved templates, and a record of what was promised.",
    image: "/images/service-whatsapp.jpg",
    imageAlt:
      "Hands holding a phone over a marble table beside a cup of coffee, the screen left unreadable.",
    takes: [
      "A WhatsApp Business line the firm owns",
      "Templates for the messages you repeat",
      "A shared desk, so a holiday does not hide the thread",
      "A handoff when a person should take over",
    ],
    leaves: [
      "The number in your name",
      "The thread, stored",
      "A rule for what the line will not answer",
    ],
    siteNote:
      "Choosing WhatsApp on the contact form queues a reply through the Cloud API module. Inbound webhook messages are stored on the desk. An agent never sends on that line alone.",
  },
  {
    slug: "agent-services",
    index: "05",
    name: "Agent services",
    short: "A colleague for the routine. It drafts. A person sends.",
    lede: "Intake, status, and the questions that repeat. The agent works from a brief you can read.",
    image: "/images/service-agents.jpg",
    imageAlt:
      "A person in a charcoal jacket, seen from behind, facing a wall of warm connected points of light.",
    takes: [
      "The questions your desk answers twice a day",
      "A brief written in your voice, with the refusals included",
      "A place the transcript is kept",
      "A person who approves anything that leaves the building",
    ],
    leaves: [
      "An agent that knows its limits",
      "The transcript",
      "The brief, which you can edit without us",
    ],
    siteNote:
      "Ask the desk, on this site, is that agent. It answers from a written brief, stores the exchange, and cannot email or message a client by itself.",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export const engagements = [
  {
    title: "The admissions record",
    place: "A hospital group, Howrah",
    image: "/images/engagement-records.jpg",
    imageAlt:
      "A quiet sunlit hospital corridor with pale green walls and a wooden bench.",
    body: "Admissions lived in three spreadsheets and a night-duty chat. The record is now one database, on a host the night staff can open, with an agent that answers only visiting-hour questions.",
  },
  {
    title: "The order desk",
    place: "A knitwear exporter",
    image: "/images/engagement-orders.jpg",
    imageAlt:
      "Folded undyed cotton and charcoal knitwear on a wooden work table, with a wooden ruler.",
    body: "Orders arrived as photographs of handwritten slips. The WhatsApp desk files them, the mail desk confirms them, and the store of record is no longer the chat thread.",
  },
  {
    title: "The first reply",
    place: "Chambers in Kolkata",
    image: "/images/engagement-chambers.jpg",
    imageAlt:
      "A wood-panelled library with a leather chair and a green glass lamp on a writing desk.",
    body: "A small chambers needed mail that looked like the firm, a host for the brief library, and an agent that drafts the first reply and then stops.",
  },
];

export const method = [
  {
    index: "01",
    title: "Listen",
    body: "A working session, at the studio or on a call. We ask what broke last month, not what a catalogue says you need.",
  },
  {
    index: "02",
    title: "Map",
    body: "The databases, hosts, inboxes, and chat lines already in use. We do not start by replacing them.",
  },
  {
    index: "03",
    title: "Build",
    body: "One narrow system, in production, with the people who will run it. A first season is ninety days.",
  },
  {
    index: "04",
    title: "Keep",
    body: "We stay through that season. Then the credentials are yours, the runbook is short, and you can ask us to leave.",
  },
];

export const notes = [
  "The night staff would not trust a system they had not seen fail and recover. So we restored a backup on a Tuesday afternoon, in the room.",
  "The argument about which order was the real order ended when the database, not the chat, became the record.",
  "The agent drafts. A person sends. That rule is written into the brief, and we do not install the agent without it.",
];

export const refusals = [
  "Rewrite everything in one proposal",
  "Leave an agent that writes to clients without a person",
  "Put the firm name on a platform we still own",
  "Hand you a dashboard and call it an operation",
];

export const nav = [
  { href: "/practice", label: "Practice" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

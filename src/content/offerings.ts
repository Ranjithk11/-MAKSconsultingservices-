export const serviceSlugs = [
  "coin-scheme",
  "financial-adviser",
  "business-consulting",
  "digital-investment",
  "website-development",
  "marketing",
] as const;

export type OfferingSlug = (typeof serviceSlugs)[number];

export type Offering = {
  slug: OfferingSlug;
  index: string;
  name: string;
  short: string;
  promise: string;
  lede: string;
  audience: string;
  facts: { value: string; label: string }[];
  steps: { title: string; body: string }[];
  delivers: string[];
  notes: { title: string; body: string }[];
  boundary: string;
};

export const offerings: Offering[] = [
  {
    slug: "coin-scheme",
    index: "01",
    name: "Coin scheme",
    short: "A closed group of ten, for ten months.",
    promise: "One group. Equal contributions. A published payout for each month.",
    lede: "The MAKS coin scheme is a community savings group. Ten members each contribute 10 BOT a month. Each month, one member who has not yet been paid is selected and receives that month’s published credit.",
    audience:
      "People who want the rules in writing before they join: the amount, the length, the draw time, and what happens after a member has already received a payout.",
    facts: [
      { value: "10", label: "Members in a group" },
      { value: "10 BOT", label: "Each person, each month" },
      { value: "7 PM", label: "Draw on the 7th" },
    ],
    steps: [
      {
        title: "The group is closed at ten",
        body: "A cycle starts when ten members are in. It is not an open list that keeps adding people after the first draw.",
      },
      {
        title: "Everyone pays the same",
        body: "The contribution is 10 BOT per person per month, including a member who has already received a payout.",
      },
      {
        title: "One selection a month",
        body: "At 7:00 PM on the 7th, one member still waiting for a turn is selected. The selection is confirmed on a WhatsApp call.",
      },
      {
        title: "The credit follows the month",
        body: "Month one credits 92 BOT. The published credit rises by 1 BOT each month and finishes at 101 BOT in month ten.",
      },
    ],
    delivers: [
      "The ten-month payout table, written down",
      "A group that stays at ten members",
      "A draw at a stated time, confirmed on a call",
      "One turn for each member across the cycle",
    ],
    notes: [
      {
        title: "After a payout",
        body: "A member who has received a credit still contributes 10 BOT for each remaining month.",
      },
      {
        title: "How to ask for a place",
        body: "Send the word MAKS on WhatsApp. A person replies about the next group. The form on this site is the other way in.",
      },
    ],
    boundary:
      "This page states the scheme’s published rules. It is not a promise that a later cycle will use different numbers. If the table changes, the page changes with it.",
  },
  {
    slug: "financial-adviser",
    index: "02",
    name: "Financial adviser",
    short: "A written view of the money you already have.",
    promise: "We start from your cash, your obligations, and the goal you can name.",
    lede: "A financial conversation at MAKS is a working session, not a product catalogue. We sit with income, spending, and the goal, and we leave you a short note you can read without us in the room.",
    audience:
      "Households and small-business owners in and around Hyderabad who want a clear picture before they buy a policy, a fund, or a digital asset.",
    facts: [
      { value: "1", label: "Written brief after the session" },
      { value: "90 min", label: "A first working session" },
      { value: "Weekdays", label: "By appointment, 10:00–18:00" },
    ],
    steps: [
      {
        title: "Name the question",
        body: "We start with the decision in front of you: a reserve, a school fee, a shop expansion, or a product someone has already suggested.",
      },
      {
        title: "Put the month on one page",
        body: "Income, fixed costs, and what is already committed. We do not begin with a recommended product.",
      },
      {
        title: "Separate the reserve from the goal",
        body: "Money you may need this year is not treated the same as money you can leave for longer. That split is written down.",
      },
      {
        title: "Leave with the next question",
        body: "You leave with a one-page brief and the questions to ask before anyone, including us, suggests a specific product.",
      },
    ],
    delivers: [
      "A one-page note of income, costs, and the goal",
      "A list of what is still unknown",
      "The questions to ask of any product",
      "A follow-up only if you want one",
    ],
    notes: [
      {
        title: "What the session is for",
        body: "It is for a decision you can explain to your family. It is not a forecast of next year’s markets.",
      },
      {
        title: "What we will say no to",
        body: "We will not dress a product as advice. If a product belongs in the conversation, it comes after the goal is written.",
      },
    ],
    boundary:
      "Nothing on this page is a promised return. Advice is the written brief from the session. A product, if one is discussed, is named separately from the advice.",
  },
  {
    slug: "business-consulting",
    index: "03",
    name: "Business consulting",
    short: "One operating problem, held for a season.",
    promise: "We stay with the work a firm already runs, and we leave the notes in your name.",
    lede: "MAKS consulting is for a firm that has outgrown a notebook. We take one operating problem — cash, customers, the weekly meeting, or the system the staff actually use — and we stay through a first season of ninety days.",
    audience:
      "Owners who are still the only person who knows where the orders, the money, or the promises live.",
    facts: [
      { value: "90 days", label: "A first season" },
      { value: "1", label: "Problem in that season" },
      { value: "Hyderabad", label: "In the room, or on a call" },
    ],
    steps: [
      {
        title: "Listen for what broke",
        body: "We ask what failed last month. A catalogue of services is not the starting point.",
      },
      {
        title: "Map what already exists",
        body: "The books, the chat threads, the spreadsheet, and the person who actually closes the day. We do not begin by replacing them.",
      },
      {
        title: "Change one thing in use",
        body: "One narrow change goes into the real week: a meeting, a record, or a handoff. The people who will run it are in the room.",
      },
      {
        title: "Leave the runbook",
        body: "At the end of the season the note is short, the credentials that matter are in your name, and you can ask us to leave.",
      },
    ],
    delivers: [
      "A written map of how the work actually moves",
      "One change running in the week, not a slide",
      "A short runbook for the two failures that recur",
      "A decision about whether a second season is useful",
    ],
    notes: [
      {
        title: "A season, not a retainer slogan",
        body: "Ninety days is the first commitment. We say at the start what we will not take on in that season.",
      },
      {
        title: "The other services sit beside this",
        body: "A website, a marketing note, or the coin scheme can follow. They are separate conversations, with their own pages.",
      },
    ],
    boundary:
      "We will not rewrite the whole firm in one proposal, and we will not leave a dashboard and call it an operation.",
  },
  {
    slug: "digital-investment",
    index: "04",
    name: "Digital investment",
    short: "A review of digital holdings, with the risks written down.",
    promise: "We look at what you already hold and the amount you can leave untouched.",
    lede: "Digital investment at MAKS is a review, not a quoted yield. We inventory what you hold, the time you can leave it, and the loss you can bear. You decide. We write the reasoning down.",
    audience:
      "People who already hold digital assets, or who have been offered one, and want the decision separated from a chat message.",
    facts: [
      { value: "Written", label: "Reasons, not a slogan" },
      { value: "Separate", label: "From the coin scheme" },
      { value: "Yours", label: "The decision stays with you" },
    ],
    steps: [
      {
        title: "List what is already held",
        body: "The assets, the place they sit, and who can move them. If that list is unclear, the review starts there.",
      },
      {
        title: "Name the money that can wait",
        body: "Only an amount you can leave, after the household reserve, belongs in this conversation.",
      },
      {
        title: "Write the ways it can fall",
        body: "Price, access, and the chance you need the money early. Those are part of the note, not a footnote.",
      },
      {
        title: "You choose",
        body: "We do not move assets for you. The note lists the choices. The decision, and the account, stay in your name.",
      },
    ],
    delivers: [
      "An inventory of what is held and where",
      "A line between reserve money and money that can wait",
      "A written note of the risks you are accepting",
      "No transfer made by us",
    ],
    notes: [
      {
        title: "Not the coin scheme",
        body: "The coin scheme has its own group, its own table, and its own page. A digital-investment review does not enrol you in that group.",
      },
      {
        title: "No published yield",
        body: "We will not put a return on this page. If a number belongs in your note, it is from your holdings and your dates, and it can be wrong.",
      },
    ],
    boundary:
      "Digital assets can lose value, including all of it. This service is a written review. It is not custody, and it is not a promise of profit.",
  },
  {
    slug: "website-development",
    index: "05",
    name: "Website development",
    short: "A site a customer can read on a phone, in your name.",
    promise: "The pages you need, the words on them, and a handoff you can use.",
    lede: "We design and build the site a firm is missing: a clear home, a page for each service, and a way to write or call. It is built to be read on a phone first, and the account is put in your name.",
    audience:
      "Practices and shops that are still introducing themselves through a PDF, a visiting card, or a WhatsApp status.",
    facts: [
      { value: "Phone first", label: "Then the wider screen" },
      { value: "One page", label: "For each service you offer" },
      { value: "Your name", label: "On the domain and the host" },
    ],
    steps: [
      {
        title: "Decide the pages",
        body: "Home, the services, and a way to reach you. Extra pages are added only when a customer would look for them.",
      },
      {
        title: "Write the sentences",
        body: "Each page says who it is for, what happens, and what it does not do. We do not fill the page with claims we cannot stand behind.",
      },
      {
        title: "Build and read it on a phone",
        body: "Type, spacing, and the buttons are checked on a small screen before we call it finished.",
      },
      {
        title: "Hand it over",
        body: "The domain, the host, and a short note on how to change a sentence. We do not keep the keys as the price of the work.",
      },
    ],
    delivers: [
      "A home page and a page for each service",
      "A contact path: call, mail, or WhatsApp",
      "A layout that holds on a phone and on a desk",
      "The site and the domain in your name",
    ],
    notes: [
      {
        title: "This site is the pattern",
        body: "The MAKS site is built the same way: one page per service, a phone layout, and the contact details in the open.",
      },
      {
        title: "What we leave out",
        body: "We do not add a blog, a login, or a payment page unless the work needs it. A smaller site that is finished is better than a large one that is not.",
      },
    ],
    boundary:
      "We will not launch a site that only looks finished on a wide screen, and we will not leave the hosting account in our name.",
  },
  {
    slug: "marketing",
    index: "06",
    name: "Marketing suggestions",
    short: "A written note on what to say, and where not to spend yet.",
    promise: "Two channels, one message, and a month you can actually run.",
    lede: "A marketing suggestion from MAKS is a one-page plan. We write who the message is for, the sentence you should repeat, and the two places it should appear. We also write what to ignore for now.",
    audience:
      "Owners who are being sold ads, reels, and posters at the same time, and who want a smaller plan they can run this month.",
    facts: [
      { value: "1 page", label: "The suggestion, in writing" },
      { value: "2", label: "Channels, not a catalogue" },
      { value: "30 days", label: "A first test" },
    ],
    steps: [
      {
        title: "Hear the last customers",
        body: "We ask how the last ten people found you, and what they thought they were buying. The plan starts there.",
      },
      {
        title: "Write one sentence",
        body: "The sentence a stranger can repeat. If it needs a paragraph, it is not ready.",
      },
      {
        title: "Pick two places",
        body: "Usually the place customers already are, and one new place. The rest of the catalogue waits.",
      },
      {
        title: "Set a month and a stop",
        body: "What you will do for thirty days, what you will count, and what you will stop if it is quiet.",
      },
    ],
    delivers: [
      "The audience, in a few lines",
      "The sentence to repeat",
      "Two channels and what to do on each",
      "A list of what not to buy yet",
    ],
    notes: [
      {
        title: "Suggestions, then a choice",
        body: "We do not run the ads unless you ask for that as a separate piece of work. The first deliverable is the note.",
      },
      {
        title: "It can sit with the website",
        body: "If the site is the place the message lands, the website page and this page are planned together. They are still two services.",
      },
    ],
    boundary:
      "We will not promise a number of leads. The suggestion says what to try, what to count, and when to stop.",
  },
];

export function getOffering(slug: string) {
  return offerings.find((offering) => offering.slug === slug);
}

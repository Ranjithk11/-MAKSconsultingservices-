import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StudioDock } from "@/components/dock/StudioDock";
import { siteUrl, studio } from "@/content/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${studio.name} · Kolkata`,
    template: `%s · ${studio.short}`,
  },
  description:
    "MAKS Consulting Services keeps the database, the host, the mail, the WhatsApp line, and the agents a firm already depends on. A practice in Kolkata.",
  openGraph: {
    title: studio.name,
    description:
      "Database storage, hosting, mail, WhatsApp, and agents — operated as one desk in Kolkata.",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/practice-courtyard.jpg", width: 1200, height: 675 }],
  },
  twitter: {
    card: "summary_large_image",
    title: studio.name,
    description:
      "Database storage, hosting, mail, WhatsApp, and agents — operated as one desk in Kolkata.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: studio.name,
  url: siteUrl,
  email: studio.email,
  areaServed: "IN",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kolkata",
    addressCountry: "IN",
  },
  description:
    "Consulting practice for database storage, hosting, mail, WhatsApp, and agent services.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-forest focus:px-3 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <StudioDock />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

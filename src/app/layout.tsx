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
    default: `${studio.scheme} · ${studio.city}`,
    template: `%s · ${studio.short}`,
  },
  description: `${studio.name} in ${studio.city}: coin scheme, financial advice, business consulting, digital investment, website development, and marketing suggestions.`,
  openGraph: {
    title: studio.name,
    description: `Six services from one desk in ${studio.city}. Each service has its own page.`,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 639,
        height: 313,
        alt: "MAKS Business Consulting and Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: studio.name,
    description: `Six services from one desk in ${studio.city}.`,
    images: ["/images/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: studio.name,
  url: siteUrl,
  email: studio.email,
  telephone: `+${studio.phoneE164}`,
  areaServed: "IN",
  address: {
    "@type": "PostalAddress",
    addressLocality: studio.city,
    addressRegion: studio.region,
    addressCountry: "IN",
  },
  description:
    `${studio.name} in ${studio.city}. Coin scheme, financial advice, business consulting, digital investment, websites, and marketing suggestions.`,
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
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-forest focus:px-3 focus:py-2 focus:text-white"
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

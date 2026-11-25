"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Logo } from "@/components/layout/Logo";
import { offerings } from "@/content/offerings";
import { joinWhatsAppHref, nav, studio } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="h-1 bg-gradient-to-r from-[#071426] via-[#0e7c86] to-[#3ec6d4]" />
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-8">
        <Link href="/" className="block shrink-0" aria-label={studio.name}>
          <Logo priority className="h-14 w-auto sm:h-16 lg:h-20" />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm tracking-wide",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={joinWhatsAppHref()}
            className={cn(buttonVariants({ size: "lg" }), "h-10 px-4")}
          >
            WhatsApp
          </a>
        </nav>
        <Link
          href="/contact"
          className={cn(buttonVariants({ size: "lg" }), "h-10 px-3 lg:hidden")}
        >
          Talk
        </Link>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            className="inline-flex h-10 items-center gap-2 px-1 text-sm lg:hidden"
            aria-label="Open the menu"
          >
            <Menu className="size-5" />
            Menu
          </DialogTrigger>
          <DialogContent className="top-0 left-0 h-dvh w-screen max-w-none translate-x-0 translate-y-0 rounded-none p-8 sm:max-w-none">
            <DialogTitle>
              <Logo className="h-16 w-auto" />
            </DialogTitle>
            <nav className="mt-10 flex flex-col gap-5" aria-label="Mobile">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="font-heading text-4xl tracking-tight"
              >
                Home
              </Link>
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-heading text-4xl tracking-tight"
                >
                  {item.label}
                </Link>
              ))}
              <p className="mt-6 text-[0.72rem] uppercase tracking-[0.22em] text-brass">Each service</p>
              {offerings.map((offering) => (
                <Link
                  key={offering.slug}
                  href={`/services/${offering.slug}`}
                  onClick={() => setOpen(false)}
                  className="font-heading text-2xl tracking-tight"
                >
                  {offering.index} {offering.name}
                </Link>
              ))}
              <a
                href={joinWhatsAppHref()}
                onClick={() => setOpen(false)}
                className="mt-6 text-sm uppercase tracking-[0.18em] text-brass"
              >
                Send MAKS on WhatsApp
              </a>
            </nav>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}

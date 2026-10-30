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
import { nav, studio } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="h-1 bg-forest" />
      <div className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="block">
          <span className="block font-heading text-[1.65rem] leading-none tracking-tight">
            {studio.short}
          </span>
          <span className="mt-1 block text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
            Consulting Services
          </span>
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
          <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "h-10 px-4")}>
            Book a session
          </Link>
        </nav>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            className="inline-flex h-10 items-center gap-2 px-1 text-sm lg:hidden"
            aria-label="Open the menu"
          >
            <Menu className="size-5" />
            Menu
          </DialogTrigger>
          <DialogContent className="top-0 left-0 h-dvh w-screen max-w-none translate-x-0 translate-y-0 rounded-none p-8 sm:max-w-none">
            <DialogTitle className="font-heading text-3xl">MAKS</DialogTitle>
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
              <Link
                href="/desk"
                onClick={() => setOpen(false)}
                className="mt-4 text-sm uppercase tracking-[0.18em] text-brass"
              >
                Studio desk
              </Link>
            </nav>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { studio } from "@/content/site";
import { cn } from "@/lib/utils";

export function WhatsAppPanel() {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? "").replace(/\D/g, "");
  const href = number
    ? `https://wa.me/${number}?text=${encodeURIComponent(studio.greeting)}`
    : null;

  return (
    <Dialog>
      <DialogTrigger className="inline-flex h-12 items-center rounded-sm border border-border bg-background px-4 text-sm shadow-sm">
        WhatsApp
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">WhatsApp the studio</DialogTitle>
          <DialogDescription>
            The prepared note below is what the line would carry. A person still answers it.
          </DialogDescription>
        </DialogHeader>
        <p className="border border-border bg-paper-deep/50 p-4 text-sm leading-6">{studio.greeting}</p>
        <div className="flex flex-col gap-2">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "xl" })}
            >
              Open WhatsApp
            </a>
          ) : (
            <p className="text-sm leading-6 text-muted-foreground">
              The public WhatsApp number is not set on this host. Leave a note and choose WhatsApp as the reply. It queues in the outbox until the Cloud API is connected.
            </p>
          )}
          <Link
            href="/contact?channel=whatsapp"
            className={cn(buttonVariants({ size: "xl", variant: "outline" }))}
          >
            Leave a WhatsApp note
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

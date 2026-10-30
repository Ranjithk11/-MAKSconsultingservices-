"use client";

import { DeskAgent } from "@/components/dock/DeskAgent";
import { WhatsAppPanel } from "@/components/dock/WhatsAppPanel";

export function StudioDock() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-end gap-2 px-5 py-3 sm:justify-between sm:px-8">
        <p className="hidden text-sm text-muted-foreground sm:block">
          The desk answers from a brief. A person sends.
        </p>
        <div className="flex items-center gap-2">
          <WhatsAppPanel />
          <DeskAgent />
        </div>
      </div>
    </div>
  );
}

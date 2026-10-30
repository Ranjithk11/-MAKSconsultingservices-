"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Turn = { role: "user" | "assistant"; content: string; links?: { href: string; label: string }[] };

const suggestions = [
  "What are the five systems?",
  "How does a first season work?",
  "Can an agent write to clients?",
  "Where is the studio?",
];

const intro: Turn = {
  role: "assistant",
  content:
    "This is the MAKS desk. I answer from a written brief. A person reads what I cannot close, and I do not write to clients.",
};

export function DeskAgent() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([intro]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const sessionRef = useRef<string>("");
  const listRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const existing = window.sessionStorage.getItem("maks-desk-session");
    if (existing) {
      sessionRef.current = existing;
      return;
    }
    const created = crypto.randomUUID();
    sessionRef.current = created;
    window.sessionStorage.setItem("maks-desk-session", created);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [turns, open]);

  async function ask(message: string) {
    const text = message.trim();
    if (!text || busy) return;
    setDraft("");
    setError("");
    setBusy(true);
    setTurns((current) => [...current, { role: "user", content: text }]);
    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionRef.current, message: text }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        content?: string;
        links?: { href: string; label: string }[];
        error?: string;
      };
      if (!response.ok || !data.ok || !data.content) {
        setError(data.error ?? "The desk did not answer.");
        return;
      }
      setTurns((current) => [
        ...current,
        { role: "assistant", content: data.content!, links: data.links },
      ]);
    } catch {
      setError("The desk could not be reached.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative">
      {open ? (
        <section
          role="dialog"
          aria-labelledby={titleId}
          className="fixed right-4 bottom-20 z-50 flex max-h-[min(32rem,calc(100vh-7rem))] w-[min(24rem,calc(100vw-2rem))] flex-col border border-border bg-background shadow-xl sm:right-8"
        >
          <header className="flex items-start justify-between gap-4 border-b border-border px-4 py-3">
            <div>
              <p id={titleId} className="font-heading text-xl">
                Ask the desk
              </p>
              <p className="text-xs text-muted-foreground">An agent. It does not send.</p>
            </div>
            <button type="button" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>
              Close
            </button>
          </header>
          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {turns.map((turn, index) => (
              <div key={`${turn.role}-${index}`} className={turn.role === "user" ? "text-right" : ""}>
                <p
                  className={
                    turn.role === "user"
                      ? "inline-block bg-forest px-3 py-2 text-left text-sm leading-6 text-paper"
                      : "text-sm leading-6"
                  }
                >
                  {turn.content}
                </p>
                {turn.links?.length ? (
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {turn.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-xs underline decoration-brass underline-offset-4"
                          onClick={() => setOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
            {busy ? <p className="text-sm text-muted-foreground">The desk is reading…</p> : null}
            {error ? (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="border border-border px-2 py-1 text-left text-xs"
                onClick={() => ask(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2 border-t border-border p-3"
            onSubmit={(event) => {
              event.preventDefault();
              void ask(draft);
            }}
          >
            <Textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask about a system"
              className="min-h-12 rounded-sm"
              aria-label="Question for the desk"
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void ask(draft);
                }
              }}
            />
            <Button type="submit" size="lg" disabled={busy}>
              Send
            </Button>
          </form>
        </section>
      ) : null}
      <button
        type="button"
        className="inline-flex h-12 items-center rounded-sm bg-forest px-4 text-sm text-paper shadow-sm"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        Ask the desk
      </button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatWhen } from "@/lib/format";

type Lead = {
  id: number;
  reference: string;
  name: string;
  email: string;
  phone: string;
  organisation: string;
  service: string;
  message: string;
  channel: string;
  createdAt: string;
};

type OutboxItem = {
  id: number;
  channel: string;
  recipient: string;
  subject: string;
  body: string;
  status: string;
  detail: string;
  createdAt: string;
};

type Turn = {
  id: number;
  sessionId: string;
  role: string;
  content: string;
  createdAt: string;
};

type Inbound = {
  id: number;
  fromNumber: string;
  body: string;
  createdAt: string;
};

type Snapshot = {
  leads: Lead[];
  outbox: OutboxItem[];
  turns: Turn[];
  inbound: Inbound[];
};

export function DeskBoard() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [locked, setLocked] = useState(true);
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    const response = await fetch("/api/desk");
    if (response.status === 503) {
      const data = (await response.json()) as { error?: string };
      setLocked(true);
      setSnapshot(null);
      setError(data.error ?? "The desk is not configured.");
      return;
    }
    const data = (await response.json()) as Snapshot & { ok?: boolean; locked?: boolean; error?: string };
    if (!response.ok) {
      setError(data.error ?? "The desk could not be read.");
      return;
    }
    if (data.locked || !data.ok) {
      setLocked(true);
      setSnapshot(null);
      return;
    }
    setSnapshot(data);
    setLocked(false);
    setError("");
  }

  useEffect(() => {
    let cancelled = false;
    fetch("/api/desk")
      .then(async (response) => {
        if (cancelled) return;
        const data = (await response.json()) as Snapshot & {
          ok?: boolean;
          locked?: boolean;
          error?: string;
        };
        if (response.status === 503) {
          setError(data.error ?? "The desk is not configured.");
          return;
        }
        if (data.ok && !data.locked) {
          setSnapshot(data);
          setLocked(false);
        }
      })
      .catch(() => {
        if (!cancelled) setError("The desk could not be reached.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function unlock(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/desk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
    const data = (await response.json()) as Snapshot & { ok?: boolean; error?: string };
    if (!response.ok || !data.ok) {
      setError(data.error ?? "That key does not open the desk.");
      return;
    }
    setSnapshot(data);
    setLocked(false);
    setKey("");
  }

  async function lock() {
    await fetch("/api/desk", { method: "DELETE" });
    setSnapshot(null);
    setLocked(true);
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Opening the desk…</p>;
  }

  if (locked || !snapshot) {
    return (
      <form onSubmit={unlock} className="max-w-md border border-border p-6">
        <Label htmlFor="desk-key">Desk key</Label>
        <Input
          id="desk-key"
          type="password"
          autoComplete="current-password"
          value={key}
          onChange={(event) => setKey(event.target.value)}
          className="mt-2 h-12 rounded-sm px-3"
        />
        {process.env.NODE_ENV !== "production" ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            If you have not set MAKS_DESK_KEY, the local key is russell-studio. Change it before any public host.
          </p>
        ) : (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Enter the desk key configured on this host.
          </p>
        )}
        {error ? (
          <p className="mt-3 text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" size="xl" className="mt-5">
          Open the desk
        </Button>
      </form>
    );
  }

  return (
    <div className="space-y-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {snapshot.leads.length} notes · {snapshot.outbox.length} outbox · {snapshot.turns.length} agent turns
        </p>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => void load()}>
            Refresh
          </Button>
          <Button type="button" variant="outline" onClick={() => void lock()}>
            Lock
          </Button>
        </div>
      </div>

      <section>
        <h2 className="font-heading text-3xl tracking-tight">Notes</h2>
        {snapshot.leads.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No notes yet. A message from the contact page lands here, even when mail is not connected.
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {snapshot.leads.map((lead) => (
              <li key={lead.id} className="grid gap-3 py-5 sm:grid-cols-12">
                <div className="sm:col-span-3">
                  <p className="font-heading text-xl">{lead.reference}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{formatWhen(lead.createdAt)} IST</p>
                </div>
                <div className="sm:col-span-4 text-sm leading-6">
                  <p>{lead.name}</p>
                  <p className="text-muted-foreground">{lead.email}</p>
                  {lead.phone ? <p>{lead.phone}</p> : null}
                  {lead.organisation ? <p>{lead.organisation}</p> : null}
                </div>
                <div className="sm:col-span-5">
                  <p className="text-[0.72rem] uppercase tracking-[0.16em] text-brass">
                    {lead.service} · {lead.channel}
                  </p>
                  <p className="mt-2 text-sm leading-6">{lead.message}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="font-heading text-3xl tracking-tight">Outbox</h2>
        {snapshot.outbox.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">Nothing is waiting to be sent.</p>
        ) : (
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {snapshot.outbox.map((item) => (
              <li key={item.id} className="grid gap-2 py-5 sm:grid-cols-12">
                <div className="sm:col-span-3">
                  <p className="text-[0.72rem] uppercase tracking-[0.16em]">{item.channel}</p>
                  <p className={`mt-2 text-sm ${statusClass(item.status)}`}>{item.status}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{formatWhen(item.createdAt)} IST</p>
                </div>
                <div className="sm:col-span-9 text-sm leading-6">
                  <p>{item.recipient}</p>
                  {item.subject ? <p className="text-muted-foreground">{item.subject}</p> : null}
                  <p className="mt-2 whitespace-pre-wrap">{item.body}</p>
                  {item.detail ? <p className="mt-2 text-muted-foreground">{item.detail}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="font-heading text-3xl tracking-tight">WhatsApp inbound</h2>
        {snapshot.inbound.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No webhook messages yet. The Cloud API posts them to /api/whatsapp.
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {snapshot.inbound.map((item) => (
              <li key={item.id} className="py-5 text-sm leading-6">
                <p className="text-muted-foreground">
                  {item.fromNumber} · {formatWhen(item.createdAt)} IST
                </p>
                <p className="mt-2">{item.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="font-heading text-3xl tracking-tight">Agent transcript</h2>
        {snapshot.turns.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No one has asked the desk yet. The button on every page stores the exchange here.
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {snapshot.turns.map((turn) => (
              <li key={turn.id} className="py-4 text-sm leading-6">
                <p className="text-[0.72rem] uppercase tracking-[0.16em] text-brass">
                  {turn.role} · {formatWhen(turn.createdAt)} IST
                </p>
                <p className="mt-2">{turn.content}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function statusClass(status: string) {
  if (status === "sent") return "text-forest";
  if (status === "failed") return "text-destructive";
  return "text-brass";
}

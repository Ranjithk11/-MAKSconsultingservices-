"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { formatUptime, formatWhen } from "@/lib/format";

type Report = {
  platform: string;
  region: string;
  environment: string;
  commit: string;
  uptimeSeconds: number;
  node: string;
  time: string;
};

export function HostStatus() {
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/health")
      .then(async (response) => {
        if (!response.ok) throw new Error("status");
        return (await response.json()) as Report;
      })
      .then((data) => {
        if (!cancelled) setReport(data);
      })
      .catch(() => {
        if (!cancelled) setError("The status report did not come back.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="border-t border-border bg-paper-deep/40 py-16">
      <Container>
        <p className="text-[0.72rem] uppercase tracking-[0.22em] text-brass">Live status</p>
        <h2 className="mt-3 font-heading text-3xl tracking-tight">This host, right now.</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          The same plain report we leave with a system we host. No chart, no colour for its own sake.
        </p>
        {error ? (
          <p className="mt-6 text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        {!report && !error ? (
          <p className="mt-6 text-sm text-muted-foreground">Reading the host…</p>
        ) : null}
        {report ? (
          <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatusItem label="Platform" value={report.platform} />
            <StatusItem label="Region" value={report.region} />
            <StatusItem label="Environment" value={report.environment} />
            <StatusItem label="Node" value={report.node} />
            <StatusItem label="Uptime" value={formatUptime(report.uptimeSeconds)} />
            <StatusItem label="Report time (IST)" value={formatWhen(report.time)} />
          </dl>
        ) : null}
      </Container>
    </section>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-border pt-3">
      <dt className="text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">{label}</dt>
      <dd className="mt-2 font-heading text-2xl tracking-tight">{value}</dd>
    </div>
  );
}

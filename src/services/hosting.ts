import "server-only";

export type HostTarget = {
  name: string;
  fit: string;
};

export const hostTargets: HostTarget[] = [
  {
    name: "A small VPS",
    fit: "The usual home for a MAKS desk. Node stays up, and the SQLite file stays on disk.",
  },
  {
    name: "This machine",
    fit: "next dev or next start. The same database, mail outbox, and agent transcript.",
  },
  {
    name: "A platform with a persistent disk",
    fit: "Fine, if DATABASE_PATH points at a volume that survives a restart. A purely serverless disk will forget the desk.",
  },
];

export function getHostingReport() {
  return {
    service: "MAKS hosting",
    platform: process.env.HOSTING_PLATFORM ?? "node",
    region: process.env.HOSTING_REGION ?? "local",
    environment: process.env.NODE_ENV ?? "development",
    commit:
      process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GIT_COMMIT ?? "dev",
    uptimeSeconds: Math.round(process.uptime()),
    node: process.version,
    time: new Date().toISOString(),
    targets: hostTargets,
  };
}

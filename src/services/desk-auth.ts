import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export const DESK_COOKIE = "maks_desk";

export function deskKey() {
  if (process.env.MAKS_DESK_KEY) return process.env.MAKS_DESK_KEY;
  if (process.env.NODE_ENV !== "production") return "russell-studio";
  return null;
}

export function deskToken() {
  const key = deskKey();
  if (!key) return null;
  return createHmac("sha256", key).update("maks-desk-session").digest("hex");
}

export function deskKeyMatches(candidate: string) {
  const key = deskKey();
  if (!key) return false;
  const left = Buffer.from(candidate);
  const right = Buffer.from(key);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function cookieIsDesk(value: string | undefined) {
  const token = deskToken();
  if (!token || !value) return false;
  const left = Buffer.from(value);
  const right = Buffer.from(token);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

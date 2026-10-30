import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { keepInboundMessages, parseInboundMessages } from "@/services/whatsapp";

function signatureMatches(raw: string, header: string | null, secret: string) {
  if (!header) return false;
  const digest = `sha256=${createHmac("sha256", secret).update(raw).digest("hex")}`;
  const left = Buffer.from(header);
  const right = Buffer.from(digest);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  const expected = process.env.WHATSAPP_VERIFY_TOKEN;
  if (
    mode === "subscribe" &&
    expected &&
    token === expected &&
    challenge
  ) {
    return new Response(challenge, { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}

export async function POST(request: Request) {
  const raw = await request.text();
  const secret = process.env.WHATSAPP_APP_SECRET;
  if (secret && !signatureMatches(raw, request.headers.get("x-hub-signature-256"), secret)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    keepInboundMessages(parseInboundMessages(payload));
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

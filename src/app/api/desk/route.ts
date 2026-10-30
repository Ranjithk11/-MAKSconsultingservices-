import { NextResponse } from "next/server";
import {
  cookieIsDesk,
  DESK_COOKIE,
  deskKey,
  deskKeyMatches,
  deskToken,
} from "@/services/desk-auth";
import {
  listAgentTurns,
  listInboundWhatsApp,
  listLeads,
  listOutbox,
} from "@/services/database";
import { clientIp, rateLimit } from "@/services/rate-limit";
import { deskKeySchema } from "@/services/validation";

function snapshot() {
  return {
    leads: listLeads(),
    outbox: listOutbox(),
    turns: listAgentTurns(),
    inbound: listInboundWhatsApp(),
  };
}

export async function GET(request: Request) {
  if (!deskKey()) {
    return NextResponse.json(
      { ok: false, error: "The desk key is not configured on this host." },
      { status: 503 },
    );
  }
  const cookie = readCookie(request, DESK_COOKIE);
  if (!cookieIsDesk(cookie)) {
    return NextResponse.json({ ok: false, locked: true });
  }
  return NextResponse.json({ ok: true, ...snapshot() });
}

export async function POST(request: Request) {
  if (!rateLimit(`desk:${clientIp(request)}`, 12)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Wait a little." },
      { status: 429 },
    );
  }
  if (!deskKey() || !deskToken()) {
    return NextResponse.json(
      { ok: false, error: "The desk key is not configured on this host." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "The key could not be read." }, { status: 400 });
  }
  const parsed = deskKeySchema.safeParse(body);
  if (!parsed.success || !deskKeyMatches(parsed.data.key)) {
    return NextResponse.json(
      { ok: false, error: "That key does not open the desk." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true, ...snapshot() });
  response.cookies.set(DESK_COOKIE, deskToken()!, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(DESK_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}

function readCookie(request: Request, name: string) {
  const header = request.headers.get("cookie");
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return undefined;
}

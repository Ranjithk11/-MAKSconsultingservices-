import { NextResponse } from "next/server";
import { receiveNote } from "@/services/intake";
import { clientIp, rateLimit } from "@/services/rate-limit";
import { contactSchema } from "@/services/validation";

export async function POST(request: Request) {
  if (!rateLimit(`contact:${clientIp(request)}`)) {
    return NextResponse.json(
      { ok: false, error: "Too many notes from this connection. Wait a little, then try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "The note could not be read." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const field = issue?.path[0];
    return NextResponse.json(
      {
        ok: false,
        error: issue?.message ?? "Check the form and try again.",
        field: typeof field === "string" ? field : undefined,
      },
      { status: 400 },
    );
  }

  if (parsed.data.companyWebsite) {
    return NextResponse.json({
      ok: true,
      reference: `MAKS-${new Date().getFullYear()}-RECEIVED`,
      mail: "queued",
      whatsapp: null,
    });
  }

  try {
    const result = await receiveNote(parsed.data);
    return NextResponse.json({ ok: true, ...result });
  } catch {
    return NextResponse.json(
      { ok: false, error: "The desk could not store the note. Try again in a moment." },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { answerDesk } from "@/services/agent";
import { insertAgentTurn } from "@/services/database";
import { clientIp, rateLimit } from "@/services/rate-limit";
import { agentSchema } from "@/services/validation";

export async function POST(request: Request) {
  if (!rateLimit(`agent:${clientIp(request)}`, 20)) {
    return NextResponse.json(
      { ok: false, error: "The desk needs a short pause. Try again in a moment." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "The question could not be read." },
      { status: 400 },
    );
  }

  const parsed = agentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Write a question." },
      { status: 400 },
    );
  }

  const reply = answerDesk(parsed.data.message);
  try {
    insertAgentTurn({
      sessionId: parsed.data.sessionId,
      role: "user",
      content: parsed.data.message,
    });
    insertAgentTurn({
      sessionId: parsed.data.sessionId,
      role: "assistant",
      content: reply.content,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "The exchange could not be stored." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, ...reply });
}

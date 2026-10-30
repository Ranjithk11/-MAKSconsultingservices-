import { NextResponse } from "next/server";
import { getHostingReport } from "@/services/hosting";

export async function GET() {
  return NextResponse.json(getHostingReport());
}

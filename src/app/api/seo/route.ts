import { NextResponse } from "next/server";
import { SEOServerService } from "@/services/SEOServerService";
import { SEOEntry } from "@/types/seo";

export async function GET() {
  try {
    const entries = SEOServerService.readEntries();
    return NextResponse.json({ success: true, data: entries });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to read SEO entries" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!Array.isArray(body?.entries)) {
      return NextResponse.json(
        { success: false, error: "Invalid payload: 'entries' must be an array" },
        { status: 400 }
      );
    }

    const entries: SEOEntry[] = body.entries;
    const ok = SEOServerService.writeEntries(entries);

    if (!ok) {
      return NextResponse.json(
        { success: false, error: "Failed to persist SEO entries to disk" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: entries });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to save SEO entries" },
      { status: 500 }
    );
  }
}

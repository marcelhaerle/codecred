import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { rssFeedService } from "@/lib/services/rssFeedService";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rssFeeds = await rssFeedService.getFeeds();

  return NextResponse.json(rssFeeds);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url } = await req.json();

  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const newFeed = await rssFeedService.createFeed(url);

  return NextResponse.json(newFeed);
}

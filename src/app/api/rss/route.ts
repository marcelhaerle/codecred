import { NextResponse } from "next/server";
import { rssFeedService } from "@/lib/services/rssFeedService";
import { withAuth } from "@/lib/api/with-auth";

const getHandler = async () => {
  const rssFeeds = await rssFeedService.getFeeds();

  return NextResponse.json(rssFeeds);
}

const postHandler = async (req: Request) => {
  const { url } = await req.json();

  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const newFeed = await rssFeedService.createFeed(url);

  return NextResponse.json(newFeed);
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler);

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rssFeeds = await prisma.rssFeed.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return NextResponse.json(rssFeeds.map(feed => ({
    id: feed.id,
    url: feed.url,
    lastFetchedAt: feed.lastFetchedAt,
  })));
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

  const newFeed = await prisma.rssFeed.create({
    data: {
      url,
      userId: session.user.id,
    },
  });

  return NextResponse.json({
    id: newFeed.id,
    url: newFeed.url,
    lastFetchedAt: newFeed.lastFetchedAt,
  });
}

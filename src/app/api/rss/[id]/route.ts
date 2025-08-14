import { withAuth } from "@/lib/api/with-auth";
import { rssFeedService } from "@/lib/services/rssFeedService";
import { NextResponse } from "next/server";

const deleteHandler = async (req: Request, { params }: { params: { id: string } }) => {
  const feedId = params.id;

  await rssFeedService.deleteFeed(feedId);

  return new NextResponse(null, { status: 204 });
}

const putHandler = async (req: Request, { params }: { params: { id: string } }) => {
  const feedId = params.id;

  const feed = await rssFeedService.getFeed(feedId);

  if (!feed) {
    return NextResponse.json({ error: "Feed not found" }, { status: 404 });
  }

  await rssFeedService.fetchFeed(feed);

  const updatedFeed = await rssFeedService.getFeed(feedId);

  return NextResponse.json(updatedFeed);
}

export const DELETE = withAuth(deleteHandler);
export const PUT = withAuth(putHandler);

import { rssFeedService } from "@/lib/services/rssFeedService";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const feedId = (await params).id;

  await rssFeedService.deleteFeed(feedId);

  return new NextResponse(null, { status: 204 });
}

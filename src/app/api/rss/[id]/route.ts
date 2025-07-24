import { PrismaClient } from "@/generated/prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const feedId = (await params).id;

  await prisma.rssFeed.delete({
    where: {
      id: feedId,
      user: {
        id: session.user.id,
      },
    },
  });

  return new NextResponse(null, { status: 204 });
}

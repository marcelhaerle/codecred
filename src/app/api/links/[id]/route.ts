import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const linkId = (await params).id;
  const { active } = await req.json();

  const link = await prisma.link.update({
    where: {
      id: linkId,
      user: {
        email: session.user.email,
      },
    },
    data: {
      active,
    },
  });

  return NextResponse.json(link);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const linkId = (await params).id;

  await prisma.link.delete({
    where: {
      id: linkId,
      user: {
        email: session.user.email,
      },
    },
  });

  return new NextResponse(null, { status: 204 });
}

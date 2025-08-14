import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, url, position } = await req.json();

  const link = await prisma.link.create({
    data: {
      title,
      url,
      position,
      user: {
        connect: {
          email: session.user.email,
        },
      },
    },
  });

  return NextResponse.json(link);
}

export async function PUT(req: Request) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const links: { id: string; position: number }[] = await req.json();

  const updatedLinks = await prisma.$transaction(
    links.map((link) =>
      prisma.link.update({
        where: { id: link.id },
        data: { position: link.position },
      })
    )
  );

  return NextResponse.json(updatedLinks);
}
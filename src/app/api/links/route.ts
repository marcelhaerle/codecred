import { withAuth } from "@/lib/api/with-auth";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";
import { NextResponse } from "next/server";

const postHandler = async (req: Request, { session }: { session: Session }) => {
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

const putHandler = async (req: Request, { session }: { session: Session }) => {
  const links: { id: string; position: number }[] = await req.json();

  const updatedLinks = await prisma.$transaction(
    links.map((link) =>
      prisma.link.update({
        where: { id: link.id, user: { email: session.user.email } },
        data: { position: link.position },
      })
    )
  );

  return NextResponse.json(updatedLinks);
}

export const POST = withAuth(postHandler);
export const PUT = withAuth(putHandler);

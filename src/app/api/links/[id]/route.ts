import { withAuth } from "@/lib/api/with-auth";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";
import { NextResponse } from "next/server";

const putHandler = async (req: Request, { session, params }: { session: Session, params: { id: string } }) => {
  const linkId = params.id;
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

const deleteHandler = async (req: Request, { session, params }: { session: Session, params: { id: string } }) => {
  const linkId = params.id;

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

export const PUT = withAuth(putHandler);
export const DELETE = withAuth(deleteHandler);


import { PrismaClient } from "@/generated/prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function getLinks() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return [];
  }

  return prisma.link.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    orderBy: {
      position: "asc",
    },
  });
}

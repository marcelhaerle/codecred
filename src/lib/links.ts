
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

export async function getLinksByUsername(username: string) {
  return prisma.link.findMany({
    where: {
      user: {
        username: username,
      },
    },
    orderBy: {
      position: "asc",
    },
  });
}

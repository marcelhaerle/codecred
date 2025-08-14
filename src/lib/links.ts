import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

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

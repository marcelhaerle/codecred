import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function getCachedArticlesByUsername(username: string) {
  if (!username) {
    throw new Error("Username is required");
  }

  const articles = await prisma.cachedArticle.findMany({
    where: {
      feed: {
        user: {
          username: username,
        },
      },
    },
  });

  return articles;
}

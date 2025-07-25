import { PrismaClient } from "@/generated/prisma";
import { Article } from "@/types/custom";

const prisma = new PrismaClient();

export async function getCachedArticlesByUsername(username: string): Promise<Article[]> {
  const articles = await prisma.cachedArticle.findMany({
    where: {
      feed: {
        user: {
          username: username,
        },
      },
    },
  });

  return articles.map((article) => ({
    title: article.title,
    link: article.link,
    pubDate: article.pubDate instanceof Date ? article.pubDate.toISOString() : article.pubDate,
    snippet: article.snippet || "",
    imageUrl: article.imageUrl || "",
  }));
}

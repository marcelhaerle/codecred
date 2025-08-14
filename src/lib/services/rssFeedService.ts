import { prisma } from "@/lib/prisma";
import Parser from 'rss-parser';
import { CachedArticle, RssFeed } from "../types";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";

const parser = new Parser();

const MAX_FEED_AGE = 2 * 60 * 60 * 1000;

export const rssFeedService = {
  getFeeds: async (): Promise<RssFeed[]> => {
    const session = await getServerSession(authOptions);

    return await prisma.rssFeed.findMany({
      where: { userId: session?.user.id, },
    });
  },

  getFeed: async (feedId: string): Promise<RssFeed | null> => {
    const session = await getServerSession(authOptions);

    return await prisma.rssFeed.findUnique({
      where: { id: feedId, userId: session?.user.id },
    });
  },

  createFeed: async (url: string): Promise<RssFeed> => {
    const session = await getServerSession(authOptions);

    const newFeed = await prisma.rssFeed.create({
      data: {
        url,
        userId: session?.user.id,
      },
    });

    return newFeed;
  },

  deleteFeed: async (feedId: string): Promise<void> => {
    const session = await getServerSession(authOptions);

    await prisma.rssFeed.deleteMany({
      where: {
        id: feedId,
        userId: session?.user.id,
      },
    });
  },

  getCachedArticlesByUsername: async (username: string): Promise<CachedArticle[]> => {
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
  },

  fetchFeed: async (feed: RssFeed): Promise<number> => {
    console.log(`Fetching feed: ${feed.url}`);

    try {
      const parsedFeed = await parser.parseURL(feed.url);

      if (!parsedFeed?.items) {
        console.warn(`Feed at ${feed.url} has no items. Skipping.`);
        return 0;
      }

      const articlesToCache = parsedFeed.items
        .filter(item => item.title && item.link && item.pubDate) // Ensure essential fields exist
        .map(item => ({
          feedId: feed.id,
          title: item.title!,
          link: item.link!,
          pubDate: new Date(item.pubDate!),
          snippet: item.contentSnippet?.slice(0, 200), // Truncate snippet
          imageUrl: item.enclosure?.url,
        }));

      // --- Update Cache in a Transaction ---
      // A transaction ensures that we either do everything or nothing,
      // which prevents data inconsistencies if something fails.
      await prisma.$transaction(async (tx) => {
        // A. Delete old articles for this feed
        await tx.cachedArticle.deleteMany({
          where: { feedId: feed.id },
        });

        // B. Insert the new articles
        await tx.cachedArticle.createMany({
          data: articlesToCache,
        });

        // C. Update the feed's lastFetchedAt timestamp
        await tx.rssFeed.update({
          where: { id: feed.id },
          data: { lastFetchedAt: new Date() },
        });
      });

      return articlesToCache.length;

    } catch (error) {
      console.error(`Failed to process feed ${feed.url}:`, error);
      throw error;
    }
  },

  fetchFeeds: async (): Promise<{
    feedsProcessed: number,
    articlesCached: number,
  }> => {
    // --- Find Stale Feeds ---
    const twoHoursAgo = new Date(Date.now() - MAX_FEED_AGE);
    const staleFeeds = await prisma.rssFeed.findMany({
      where: {
        // Find feeds that haven't been fetched in the last 2 hours.
        // Also includes feeds that have never been fetched (lastFetchedAt is null).
        OR: [
          { lastFetchedAt: { lt: twoHoursAgo } },
          { lastFetchedAt: null }
        ]
      },
    });

    // --- Process Each Stale Feed ---
    let totalFeedsProcessed = 0;
    let totalArticlesCached = 0;

    for (const feed of staleFeeds) {
      try {
        const articlesCached = await rssFeedService.fetchFeed(feed);

        totalFeedsProcessed++;
        totalArticlesCached += articlesCached;
      } catch (error) {
        console.error(`Failed to process feed ${feed.url}:`, error);
        // Continue to the next feed even if one fails.
      }
    }

    return {
      feedsProcessed: totalFeedsProcessed,
      articlesCached: totalArticlesCached,
    };
  }
};

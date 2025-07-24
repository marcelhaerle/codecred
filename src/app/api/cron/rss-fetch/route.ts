import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import Parser from 'rss-parser';

const prisma = new PrismaClient();
const parser = new Parser();

const MAX_FEED_AGE = 2 * 60 * 60 * 1000;

export async function GET(req: NextRequest) {
  // --- 1. Security Check ---
  // Protect the endpoint with a secret key passed as a query parameter.
  const cronSecret = req.nextUrl.searchParams.get('cron_secret');
  if (cronSecret !== process.env.CRON_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // --- 2. Find Stale Feeds ---
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

    if (staleFeeds.length === 0) {
      return NextResponse.json({ message: 'No stale feeds to process.' });
    }

    // --- 3. Process Each Stale Feed ---
    let totalFeedsProcessed = 0;
    let totalArticlesCached = 0;

    for (const feed of staleFeeds) {
      try {
        const parsedFeed = await parser.parseURL(feed.url);

        if (!parsedFeed?.items) {
          console.warn(`Feed at ${feed.url} has no items. Skipping.`);
          continue;
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

        // --- 4. Update Cache in a Transaction ---
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

        totalFeedsProcessed++;
        totalArticlesCached += articlesToCache.length;

      } catch (error) {
        console.error(`Failed to process feed ${feed.url}:`, error);
        // Continue to the next feed even if one fails.
      }
    }

    return NextResponse.json({
      message: 'RSS feed processing complete.',
      feedsProcessed: totalFeedsProcessed,
      articlesCached: totalArticlesCached,
    });

  } catch (error) {
    console.error('An unexpected error occurred during the cron job:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

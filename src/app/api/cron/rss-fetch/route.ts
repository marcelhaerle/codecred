import { NextRequest, NextResponse } from 'next/server';
import { rssFeedService } from '@/lib/services/rssFeedService';

export async function GET(req: NextRequest) {
  // --- Security Check ---
  // Protect the endpoint with a secret key passed as a bearer token.
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { feedsProcessed, articlesCached } = await rssFeedService.fetchFeeds();

    return NextResponse.json({
      message: 'RSS feed processing complete.',
      feedsProcessed,
      articlesCached,
    });

  } catch (error) {
    console.error('An unexpected error occurred during the cron job:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

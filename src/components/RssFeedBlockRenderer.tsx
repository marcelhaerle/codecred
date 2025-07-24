"use client";

import { RssFeedBlock, Theme } from '@/types/custom';
import { Rss } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Represents a single parsed article from the cache.
 */
interface Article {
  title: string;
  link: string;
  pubDate: string; // ISO date string
  snippet?: string;
  imageUrl?: string;
}

interface RssFeedBlockProps {
  username: string;
  block: RssFeedBlock;
  theme: Theme;
}

export default function RssFeedBlockRenderer({ username, block, theme }: RssFeedBlockProps) {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchArticles() {
      const res = await fetch(`/api/p/rss?username=${username}`, {
        cache: 'no-store', // Ensure we always get the latest data
      });
      if (!res.ok) {
        console.error('Failed to fetch RSS articles:', res.statusText);
        return;
      }
      const articles: Article[] = await res.json();

      const articlesToShow = articles
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
        .slice(0, block.limit);

      setArticles(articlesToShow);
    }
    fetchArticles();
  }, [username, block]);

  // Helper to format date nicely
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full">
      <h3
        className="mb-4 flex items-center gap-2"
        style={{
          fontSize: theme.typography.headingSize,
          fontWeight: theme.typography.headingWeight,
          color: theme.colors.primaryText
        }}
      >
        <Rss className="w-5 h-5 text-orange-400" />
        Recent Articles
      </h3>
      {articles.length > 0 ? (
        <div className="space-y-4">
          {articles.map((article, index) => (
            <div key={index} className="p-2">

              <div className="flex-grow">
                <p className="leading-tight" style={{ fontSize: theme.typography.blockTextSize }}>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >{article.title}
                  </a>
                </p>
                <p className="text-sm mt-1" style={{ color: theme.colors.secondaryText }}>
                  {formatDate(article.pubDate)}
                </p>
              </div>
            </div>

          ))}
        </div>
      ) : (
        <p className="text-gray-500">No articles found.</p>
      )}
    </div>
  );
};

"use client";

import { Article, RssFeedBlock, Theme } from '@/types/custom';
import { Rss } from 'lucide-react';

interface RssFeedBlockProps {
  block: RssFeedBlock;
  theme: Theme;
  data: Article[];
}

export default function RssFeedBlockRenderer({ data: articles, block, theme }: RssFeedBlockProps) {
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
          {articles.slice(0, block.limit).map((article, index) => (
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

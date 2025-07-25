"use client";

import { RssFeed } from "@/types/custom";
import { useEffect, useState } from "react";
import RssFeedEditor from "./RssFeedEditor";
import RssFeedList from "./RssFeedList";
import LoadingSpinner from "./LoadingSpinner";

export default function RssFeedManager() {
  const [rssFeeds, setRssFeeds] = useState<RssFeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRssFeeds = async () => {
    try {
      const response = await fetch('/api/rss');
      if (!response.ok) {
        throw new Error('Failed to fetch RSS feeds');
      }
      const data = await response.json();
      setRssFeeds(data);
    } catch (err) {
      console.error('Error fetching RSS feeds:', err);
      const errMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRssFeeds();
  }, []);

  const handleSave = async (newUrl: string) => {
    try {
      const response = await fetch('/api/rss', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: newUrl }),
      });
      if (!response.ok) {
        throw new Error('Failed to save RSS feed');
      }
      const updatedFeeds = await response.json();

      setRssFeeds(prevFeeds => [...prevFeeds, updatedFeeds]);
      return true;
    } catch (err) {
      console.error('Error saving RSS feed:', err);
      const errMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errMessage);
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/rss/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete RSS feed');
      }
      setRssFeeds(prevFeeds => prevFeeds.filter(feed => feed.id !== id));
    } catch (err) {
      console.error('Error deleting RSS feed:', err);
      const errMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errMessage);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <RssFeedEditor onSave={handleSave} />
      <RssFeedList rssFeeds={rssFeeds} onDelete={handleDelete} />
    </div>
  );
}

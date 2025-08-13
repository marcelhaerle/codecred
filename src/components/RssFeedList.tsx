"use client";

import { RssFeed } from "@/lib/types";
import { faTrash, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RssFeedList({ rssFeeds, onDelete, onFetch }: { rssFeeds: RssFeed[], onDelete: (id: string) => void, onFetch: (id: string) => void }) {
  return (
    <div className="mt-12">
      <h1 className="text-2xl font-semibold mb-4">RSS Feed List</h1>
      <div className="p-6">
        {rssFeeds.map(feed => (
          <div key={feed.id} className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{feed.url}</h2>
              <p className="text-sm text-gray-500">
                Last fetched: {feed.lastFetchedAt ? new Date(feed.lastFetchedAt).toLocaleString() : 'Never'}
              </p>
            </div>
            <div>
              <button
                onClick={() => onFetch(feed.id)}
                className="bg-transparent hover:text-blue-700 text-blue-600 p-2 rounded-lg"
              >
                <FontAwesomeIcon icon={faRefresh} />
              </button>
              <button
                onClick={() => onDelete(feed.id)}
                className="bg-transparent hover:text-red-700 text-red-600 p-2 rounded-lg"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

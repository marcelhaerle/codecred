import { useState } from 'react';
import { Rss, CheckCircle, AlertTriangle } from 'lucide-react';

export default function RssFeedEditor({ onSave }: { onSave: (newUrl: string) => Promise<boolean> }) {
  const [url, setUrl] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    if (!url) return;
    setStatus('loading');
    const success = await onSave(url);
    setStatus(success ? 'success' : 'error');
    setUrl('');
    // Hide status message after a few seconds
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Rss className="w-5 h-5 text-orange-400" />
        RSS Feeds
      </h3>
      <p className="text-sm text-gray-400 mb-4">
        Enter the URL of your RSS or Atom feed to automatically display your latest articles.
      </p>
      <div className="space-y-4">
        <div>
          <label htmlFor="rss-url" className="block text-sm font-medium text-gray-300 mb-1">
            Feed URL
          </label>
          <div className="flex gap-2">
            <input
              id="rss-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://yourblog.com/feed.xml"
              className="flex-grow bg-gray-900 border border-gray-700 rounded-md p-2 text-white focus:ring-blue-800 focus:border-blue-800"
            />
            <button
              onClick={handleSave}
              disabled={status === 'loading'}
              className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="flex items-center gap-2 text-sm text-green-400">
            <CheckCircle className="w-4 h-4" />
            <span>Feed URL saved successfully! We&pos;ll fetch your articles shortly.</span>
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center gap-2 text-sm text-red-400">
            <AlertTriangle className="w-4 h-4" />
            <span>Could not validate feed URL. Please check and try again.</span>
          </div>
        )}
      </div>
    </div>
  );
};

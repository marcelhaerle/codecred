export default function RssFeedManagerFallback() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="animate-pulse w-full max-w-6xl mx-auto p-4">
        {/* Editor Form Skeleton */}
        <div className="bg-gray-800 p-4 rounded-lg mb-8">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div> {/* Title */}
          <div className="h-4 bg-gray-700 rounded w-2/3 mb-4"></div> {/* Description */}
          <div className="flex gap-2">
            <div className="flex-grow h-10 bg-gray-700 rounded-md"></div> {/* Input */}
            <div className="w-24 h-10 bg-blue-600 rounded-lg"></div> {/* Button */}
          </div>
        </div>

        {/* List Header Skeleton */}
        <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>

        {/* List Item Skeletons */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="p-4 border-b border-gray-700 flex items-center justify-between">
            <div className="flex-grow space-y-2">
              <div className="h-6 bg-gray-700 rounded w-3/4"></div> {/* URL */}
              <div className="h-4 bg-gray-700 rounded w-1/2"></div> {/* Last fetched */}
            </div>
            <div className="w-8 h-8 bg-gray-700 rounded-lg"></div> {/* Delete Button */}
          </div>
        ))}
      </div>
    </div>
  );
}

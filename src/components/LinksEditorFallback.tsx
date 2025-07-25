export default function LinksEditorFallback() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="animate-pulse w-full max-w-6xl mx-auto p-4">
        {/* Form Skeleton */}
        <div className="flex gap-4 mb-8">
          <div className="flex-grow h-10 bg-gray-700 rounded-lg"></div>
          <div className="flex-grow h-10 bg-gray-700 rounded-lg"></div>
          <div className="w-24 h-10 bg-blue-600 rounded-lg"></div>
        </div>

        {/* Reorder Hint Skeleton */}
        <div className="h-6 bg-gray-700 rounded-lg w-1/2 mx-auto mb-4"></div>

        {/* Link Item Skeletons */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg mb-4 flex items-center gap-4">
            <div className="w-6 h-6 bg-gray-700 rounded-full"></div> {/* Drag Handle */}
            <div className="flex-grow space-y-2">
              <div className="h-6 bg-gray-700 rounded w-3/4"></div> {/* Title */}
              <div className="h-4 bg-gray-700 rounded w-1/2"></div> {/* URL */}
            </div>
            <div className="w-12 h-6 bg-gray-700 rounded-full"></div> {/* Toggle */}
            <div className="w-8 h-8 bg-gray-700 rounded-lg"></div> {/* Delete Button */}
          </div>
        ))}
      </div>
    </div>
  );
}

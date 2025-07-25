export default function DashboardFallback() {
  return (
    <div className="max-w-6xl mx-auto p-16">
      <div className="animate-pulse space-y-4 p-4">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="h-10 w-32 bg-gray-700 rounded-lg"></div>
          <div className="h-10 w-40 bg-gray-700 rounded-lg"></div>
        </div>

        {/* Profile Header Skeleton */}
        <div className="flex flex-col items-center mb-12">
          <div className=" h-24 w-24 rounded-full bg-gray-700 mb-12"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
        </div>

        {/* Block Skeletons */}
        <div className="space-y-6">
          {/* Links Block Skeleton */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="flex gap-3">
              <div className="h-8 w-24 bg-gray-700 rounded"></div>
              <div className="h-8 w-24 bg-gray-700 rounded"></div>
              <div className="h-8 w-24 bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* GitHub Pinned Repos Block Skeleton */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 bg-gray-700 rounded"></div>
              <div className="h-24 bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Generic Block Skeleton */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="h-6 bg-gray-700 rounded w-2/3 mb-4"></div>
            <div className="h-16 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectShowcaseEditorFallback() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="animate-pulse w-full max-w-6xl mx-auto p-4">
        {/* Header and Add Button Skeleton */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold mb-8">Your Projects</h1>
          <div className="h-10 bg-blue-600 rounded-lg w-32"></div>
        </div>

        {/* Project List Skeletons */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-gray-900 p-3 rounded-md flex justify-between items-center mb-2">
            <div className="h-6 bg-gray-700 rounded w-1/2"></div>
            <div className="flex gap-8">
              <div className="w-4 h-4 bg-gray-700 rounded"></div>
              <div className="w-4 h-4 bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

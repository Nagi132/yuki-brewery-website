// File path: client/src/app/shop/loading.js
// Loading component for the shop page

export default function LoadingProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg">
          <div className="aspect-square mb-6 bg-gray-200 animate-pulse rounded-md" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
            <div className="h-8 bg-gray-200 rounded animate-pulse mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}
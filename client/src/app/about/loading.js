export default function Loading() {
    return (
      <div className="min-h-screen bg-off-white py-16 px-4">
        <div className="container mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <div className="h-10 w-48 bg-gray-200 rounded-md mx-auto mb-4 animate-pulse" />
            <div className="h-4 w-96 max-w-full bg-gray-200 rounded-md mx-auto animate-pulse" />
          </div>
  
          {/* Story Sections Skeleton */}
          <div className="space-y-24">
            {/* Section 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-square lg:h-[600px] bg-gray-200 rounded-lg animate-pulse" />
              <div className="lg:pl-12 space-y-4">
                <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded-md animate-pulse" />
                </div>
              </div>
            </div>
  
            {/* Section 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="lg:pr-12 space-y-4 order-2 lg:order-1">
                <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded-md animate-pulse" />
                </div>
              </div>
              <div className="aspect-square lg:h-[600px] bg-gray-200 rounded-lg animate-pulse order-1 lg:order-2" />
            </div>
          </div>
        </div>
      </div>
    );
  }
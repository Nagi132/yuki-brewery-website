export default function Loading() {
    return (
      <div className="min-h-screen bg-off-white py-16 px-4">
        <div className="container mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <div className="h-10 w-48 bg-gray-200 rounded-md mx-auto mb-4 animate-pulse" />
            <div className="h-4 w-96 max-w-full bg-gray-200 rounded-md mx-auto animate-pulse" />
          </div>
  
          {/* Beer List Skeleton */}
          <div className="space-y-24">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="aspect-square lg:h-[600px] bg-gray-200 rounded-lg animate-pulse" />
                <div className="space-y-6">
                  <div>
                    <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse mb-2" />
                    <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />
                  </div>
                  <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse" />
                  <div className="space-y-4 bg-white/80 rounded-lg p-6">
                    {[...Array(4)].map((_, i) => (
                      <div key={i}>
                        <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse mb-2" />
                        <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
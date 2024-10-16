const SkeletonCard = () => {
    return (
      <section className="flex flex-col lg:flex-row my-10">
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-6 w-full">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="relative p-4 bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
            >
              <div className="animate-pulse flex flex-col space-y-4">
                <div className="bg-gray-200 dark:bg-gray-800 h-40 w-full rounded"></div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default SkeletonCard;
  
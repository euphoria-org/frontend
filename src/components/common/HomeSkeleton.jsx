import React from "react";
import { SkeletonTestCard, SkeletonText } from "./Skeleton";
import Meteors from "./Meteors";

const HomeSkeleton = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Meteors number={25} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header Section Skeleton */}
        <div className="text-center mb-20">
          <div className="mb-6">
            <div className="h-16 w-3/4 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <SkeletonText lines={3} className="text-center" />
          </div>
        </div>

        {/* Test Cards Grid Skeleton */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonTestCard key={index} />
          ))}
        </div>

        {/* Statistics Section Skeleton */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-8 md:p-12 mb-16">
          <div className="text-center">
            <div className="mb-8">
              <div className="h-10 w-64 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="text-center space-y-3">
                  <div className="h-12 w-20 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
                  <div className="h-5 w-24 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
                  <div className="h-4 w-32 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action Section Skeleton */}
        <div className="text-center">
          <div className="mb-6">
            <div className="h-10 w-80 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
          </div>
          <div className="max-w-2xl mx-auto mb-8">
            <SkeletonText lines={2} />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-12 w-40 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
            <div className="h-12 w-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;

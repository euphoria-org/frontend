import React from "react";
import { SkeletonTestCard, SkeletonText } from "./Skeleton";
import Meteors from "./Meteors";

const HomeSkeleton = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Meteors number={25} />
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Header Section Skeleton */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <div className="h-20 w-3/4 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
          </div>
          <div className="max-w-4xl mx-auto mb-12">
            <SkeletonText lines={2} className="text-center" />
          </div>
          <div className="flex justify-center gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-10 w-40 bg-white/5 border border-white/10 rounded-full animate-shimmer bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%]"></div>
            ))}
          </div>
        </div>

        {/* Test Cards Grid Skeleton */}
        <div className="grid md:grid-cols-3 gap-10 mb-24">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-8">
              <div className="w-24 h-24 mx-auto rounded-2xl bg-white/10 animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
              <div className="h-8 w-48 mx-auto bg-white/10 rounded-lg animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-white/5 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%]"></div>
                <div className="h-4 w-5/6 mx-auto bg-white/5 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%]"></div>
              </div>
              <div className="h-14 w-full bg-white/10 rounded-full animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
            </div>
          ))}
        </div>

        {/* Statistics Section Skeleton */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[2.5rem] p-12 md:p-20 mb-24">
          <div className="text-center">
            <div className="mb-16">
              <div className="h-12 w-80 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="h-16 w-24 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
                  <div className="h-6 w-32 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
                  <div className="h-4 w-40 mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;

import React from "react";
import { SkeletonQuestion } from "./Skeleton";
import Meteors from "./Meteors";

const TestSkeleton = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-6 px-4 sm:px-6 lg:px-8">
      {/* Meteors background */}
      <Meteors number={25} />

      {/* Static stars background */}
      <div className="absolute inset-0 stars-background opacity-70"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-8">
          <div className="h-10 w-64 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%] mb-4"></div>
          <div className="h-5 w-48 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
        </div>

        {/* Progress bar skeleton */}
        <div className="mb-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="h-5 w-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
            <div className="h-5 w-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-1/4 bg-white/20 rounded-full animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
          </div>
        </div>

        {/* Questions skeleton */}
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonQuestion key={index} />
          ))}
        </div>

        {/* Navigation skeleton */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6">
          <div className="flex justify-between items-center">
            <div className="h-12 w-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
            <div className="flex space-x-4">
              <div className="h-12 w-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
              <div className="h-12 w-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSkeleton;

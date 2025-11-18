import React from "react";
import Meteors from "./Meteors";

const IQTestSkeleton = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 overflow-hidden">
      <Meteors number={20} />
      <div className="absolute inset-0 stars-background opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Skeleton */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1">
              <div className="h-10 w-72 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl mb-2 animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
              <div className="h-6 w-80 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
            </div>
            <div className="h-12 w-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
          </div>

          <div className="relative w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl h-3 mb-6 overflow-hidden">
            <div className="h-3 w-1/3 rounded-2xl animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <div className="h-5 w-48 bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
            <div className="h-5 w-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
          </div>
        </div>

        {/* Questions Grid */}
        <div className="grid gap-6 mb-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex-shrink-0 animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
                  <div className="flex-1 space-y-3">
                    {/* Category Badges */}
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-32 bg-purple-500/20 border border-purple-400/30 rounded-full animate-shimmer bg-gradient-to-r from-purple-500/10 via-purple-500/20 to-purple-500/10 bg-[length:200%_100%]"></div>
                      <div className="h-6 w-24 bg-yellow-500/20 border border-yellow-400/30 rounded-full animate-shimmer bg-gradient-to-r from-yellow-500/10 via-yellow-500/20 to-yellow-500/10 bg-[length:200%_100%]"></div>
                      <div className="h-6 w-20 bg-blue-500/20 border border-blue-400/30 rounded-full animate-shimmer bg-gradient-to-r from-blue-500/10 via-blue-500/20 to-blue-500/10 bg-[length:200%_100%]"></div>
                    </div>
                    {/* Question Text */}
                    <div className="h-6 w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
                    <div className="h-6 w-3/4 bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
                  </div>
                </div>
              </div>

              {/* Multiple Choice Options - IQ Style */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-14">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border-2 border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
                      <div className="h-5 flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-6">
          <div className="flex justify-between items-center">
            <div className="h-12 w-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
            
            <div className="text-center space-y-2">
              <div className="h-4 w-32 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
              <div className="h-3 w-40 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
            </div>

            <div className="h-12 w-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IQTestSkeleton;

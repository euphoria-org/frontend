import React from "react";
import { SkeletonText } from "./Skeleton";
import Meteors from "./Meteors";

const IQAboutSkeleton = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <Meteors number={30} />
      <div className="absolute inset-0 stars-background opacity-60"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 animate-pulse shadow-xl"></div>
          <div className="h-14 w-2/3 max-w-3xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-md mb-6"></div>
          <div className="max-w-4xl mx-auto mb-8">
            <SkeletonText lines={2} />
          </div>
          <div className="h-14 w-48 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-lg"></div>
        </div>

        {/* Overview Section */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-10 mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="h-8 w-64 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-md mb-4"></div>
              <SkeletonText lines={5} />
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-5 w-24 bg-white/10 rounded mb-2 animate-pulse"></div>
                      <div className="h-4 w-32 bg-white/10 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Test Categories */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <div className="h-10 w-96 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-md mb-4"></div>
            <div className="max-w-3xl mx-auto">
              <SkeletonText lines={1} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-6 w-3/4 bg-white/10 rounded-lg animate-pulse mb-2"></div>
                    <SkeletonText lines={3} />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <div key={idx} className="h-6 w-20 bg-white/10 rounded-full animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score Ranges */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-10 mb-12">
          <div className="text-center mb-10">
            <div className="h-10 w-96 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-md mb-4"></div>
            <div className="max-w-3xl mx-auto">
              <SkeletonText lines={1} />
            </div>
          </div>

          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center space-x-6">
                  <div className="w-8 h-8 bg-white/10 rounded-lg animate-pulse"></div>
                  <div className="h-12 w-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%]"></div>
                  <div className="flex-1">
                    <div className="h-6 w-1/3 bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] mb-2"></div>
                    <SkeletonText lines={1} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <div className="h-10 w-80 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-md mb-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-6 w-2/3 bg-white/10 rounded-lg animate-pulse mb-3"></div>
                    <SkeletonText lines={2} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Test Instructions */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-10 mb-12">
          <div className="h-8 w-56 mx-auto text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-md mb-6"></div>
          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, colIndex) => (
              <div key={colIndex} className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse mt-1"></div>
                    <SkeletonText lines={1} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-400/30 shadow-xl rounded-3xl p-12 text-center">
          <div className="h-10 w-96 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-md mb-4"></div>
          <div className="max-w-2xl mx-auto mb-8">
            <SkeletonText lines={2} />
          </div>
          <div className="h-16 w-56 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default IQAboutSkeleton;

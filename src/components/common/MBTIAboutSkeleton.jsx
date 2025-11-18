import React from "react";
import { SkeletonText } from "./Skeleton";
import Meteors from "./Meteors";

const MBTIAboutSkeleton = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <Meteors number={25} />
      <div className="absolute inset-0 stars-background opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header Section Skeleton */}
        <div className="text-center mb-20">
          <div className="mb-6">
            <div className="h-16 w-2/3 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-lg"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <SkeletonText lines={3} />
          </div>
        </div>

        {/* MBTI Dimensions Skeleton */}
        <div className="space-y-16 mb-20">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Content Side */}
              <div className="lg:w-1/2 space-y-6">
                <div className="space-y-4">
                  <div className="h-8 w-3/4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-md"></div>
                  <div
                    className="h-6 w-1/2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-md"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <SkeletonText lines={3} />
              </div>

              {/* Traits Side */}
              <div className="lg:w-1/2 space-y-6">
                {Array.from({ length: 2 }).map((_, traitIndex) => (
                  <div
                    key={traitIndex}
                    className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 space-y-4 shadow-lg"
                    style={{ animationDelay: `${(traitIndex + 1) * 0.3}s` }}
                  >
                    <div className="h-6 w-1/3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-sm"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-1/4 bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-sm"></div>
                      <SkeletonText lines={1} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Avatar Section Skeleton */}
        <div className="mb-20">
          {Array.from({ length: 4 }).map((_, groupIndex) => (
            <div key={groupIndex} className={`${groupIndex > 0 ? "mt-24" : ""}`}>
              <div className="text-center mb-16">
                <div className="h-12 w-48 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-lg"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex flex-col items-center space-y-4">
                    <div className="w-48 h-48 md:w-56 md:h-56 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-lg">
                      <div className="w-full h-full flex items-center justify-center p-6">
                        <div className="w-full h-full bg-gradient-to-br from-white/15 via-white/8 to-white/5 rounded-2xl animate-pulse"></div>
                      </div>
                    </div>
                    <div className="h-6 w-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%]"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MBTIAboutSkeleton;

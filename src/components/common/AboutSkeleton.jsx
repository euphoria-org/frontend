import React from "react";
import { SkeletonText, SkeletonAvatar } from "./Skeleton";
import Meteors from "./Meteors";

const AboutSkeleton = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Meteors number={25} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header Section Skeleton */}
        <div className="text-center mb-20">
          <div className="mb-6">
            <div className="h-16 w-2/3 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
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
                  <div className="h-8 w-3/4 bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
                  <div className="h-6 w-1/2 bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
                </div>
                <SkeletonText lines={3} />
              </div>

              {/* Traits Side */}
              <div className="lg:w-1/2 space-y-6">
                {Array.from({ length: 2 }).map((_, traitIndex) => (
                  <div
                    key={traitIndex}
                    className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 space-y-4"
                  >
                    <div className="h-6 w-1/3 bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-1/4 bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
                      <SkeletonText lines={1} />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-1/3 bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
                      <SkeletonText lines={1} />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-1/4 bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
                      <SkeletonText lines={1} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Real World Applications Skeleton */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="h-10 w-80 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%] mb-6"></div>
            <div className="max-w-3xl mx-auto">
              <SkeletonText lines={2} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 space-y-6"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <SkeletonAvatar size="medium" />
                  <div className="h-6 w-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
                </div>
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, pointIndex) => (
                    <div
                      key={pointIndex}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-white/20 rounded-full mt-2 flex-shrink-0"></div>
                      <SkeletonText lines={1} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personality Types Grid Skeleton */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="h-10 w-64 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%] mb-6"></div>
            <div className="max-w-2xl mx-auto">
              <SkeletonText lines={2} />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 16 }).map((_, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 text-center space-y-3"
              >
                <div className="h-6 w-12 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
                <div className="h-5 w-20 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
                <div className="h-4 w-24 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Skeleton */}
        <div className="text-center">
          <div className="mb-6">
            <div className="h-10 w-72 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
          </div>
          <div className="max-w-2xl mx-auto mb-8">
            <SkeletonText lines={2} />
          </div>
          <div className="h-12 w-40 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutSkeleton;

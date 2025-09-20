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
                      <div
                        className="h-4 w-1/4 bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-sm"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <SkeletonText lines={1} />
                    </div>
                    <div className="space-y-2">
                      <div
                        className="h-4 w-1/3 bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-sm"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <SkeletonText lines={1} />
                    </div>
                    <div className="space-y-2">
                      <div
                        className="h-4 w-1/4 bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-sm"
                        style={{ animationDelay: "0.3s" }}
                      ></div>
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
            <div className="h-10 w-80 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] mb-6 shadow-lg"></div>
            <div className="max-w-3xl mx-auto">
              <SkeletonText lines={2} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 space-y-6 shadow-lg"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <SkeletonAvatar size="medium" />
                  <div className="h-6 w-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-sm"></div>
                </div>
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, pointIndex) => (
                    <div
                      key={pointIndex}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-white/30 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                      <SkeletonText lines={1} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section Skeleton */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="h-10 w-64 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] mb-6 shadow-lg"></div>
            <div className="max-w-2xl mx-auto">
              <SkeletonText lines={2} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 transition-all duration-300"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl animate-pulse shadow-lg"></div>
                    <div
                      className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl animate-pulse shadow-lg"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                  </div>

                  <div className="h-6 w-3/4 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] mb-4 shadow-sm"></div>

                  <div className="space-y-2">
                    <div
                      className="h-4 w-full bg-white/5 rounded animate-pulse"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="h-4 w-5/6 mx-auto bg-white/5 rounded animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="h-4 w-4/5 mx-auto bg-white/5 rounded animate-pulse"
                      style={{ animationDelay: "0.3s" }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar Section Skeleton */}
        <div className="w-full bg-white/10 backdrop-blur-lg border-t border-white/20 shadow-lg relative z-10 py-20">
          {/* MBTI Groups Grid with Headings */}
          {Array.from({ length: 4 }).map((groupIndex) => (
            <div
              key={groupIndex}
              className={`${
                groupIndex > 0 ? "mt-24" : ""
              } max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}
            >
              {/* Group Header Skeleton */}
              <div className="text-center mb-16">
                <div
                  className="h-12 w-48 mx-auto bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-2xl animate-pulse-shimmer bg-[length:200%_100%] mb-4 shadow-lg"
                  style={{ animationDelay: `${groupIndex * 0.1}s` }}
                ></div>
                <div className="w-32 h-1 bg-gradient-to-r from-purple-400/30 to-indigo-400/30 mx-auto rounded-full"></div>
              </div>

              {/* Avatars Grid Skeleton for this group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center text-center space-y-6 transform transition-all duration-500"
                    style={{
                      animationDelay: `${(groupIndex * 4 + index) * 120}ms`,
                    }}
                  >
                    {/* Avatar Container */}
                    <div className="flex flex-col items-center justify-center w-full">
                      {/* Avatar Image Skeleton */}
                      <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto mb-4 rounded-3xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
                        <div className="w-full h-full flex items-center justify-center p-6">
                          <div
                            className="w-full h-full bg-gradient-to-br from-white/15 via-white/8 to-white/5 rounded-2xl animate-pulse-shimmer bg-[length:200%_200%] shadow-inner"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          ></div>
                        </div>
                      </div>

                      {/* Type Code Badge Skeleton */}
                      <div className="flex items-center justify-center mb-3">
                        <div
                          className="h-8 w-20 bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl animate-pulse-shimmer bg-gradient-to-r from-white/10 via-white/25 to-white/10 bg-[length:200%_100%] shadow-md"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        ></div>
                      </div>
                    </div>

                    {/* Text Content Skeleton */}
                    <div className="flex flex-col items-center justify-center space-y-3 w-full max-w-xs mx-auto">
                      {/* Name/Title Skeleton */}
                      <div
                        className="h-6 w-36 bg-white/12 backdrop-blur-sm border border-white/20 rounded-lg animate-pulse-shimmer bg-gradient-to-r from-white/8 via-white/20 to-white/8 bg-[length:200%_100%] shadow-sm"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      ></div>

                      {/* Description Skeleton - Multi-line */}
                      <div className="flex flex-col items-center space-y-2 w-full">
                        <div
                          className="h-4 w-full bg-white/8 rounded animate-pulse"
                          style={{ animationDelay: `${index * 0.1 + 0.05}s` }}
                        ></div>
                        <div
                          className="h-4 w-5/6 bg-white/8 rounded animate-pulse"
                          style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
                        ></div>
                        <div
                          className="h-4 w-4/5 bg-white/8 rounded animate-pulse"
                          style={{ animationDelay: `${index * 0.1 + 0.15}s` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Skeleton */}
        <div className="text-center py-12">
          <div className="mb-6">
            <div className="h-10 w-72 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-lg"></div>
          </div>
          <div className="max-w-2xl mx-auto mb-8">
            <SkeletonText lines={2} />
          </div>
          <div className="h-12 w-40 mx-auto bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl animate-pulse-shimmer bg-[length:200%_100%] shadow-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutSkeleton;

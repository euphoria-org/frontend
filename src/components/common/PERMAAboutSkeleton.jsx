import React from "react";
import { SkeletonText } from "./Skeleton";
import Meteors from "./Meteors";

const PERMAAboutSkeleton = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <Meteors number={20} />
      <div className="absolute inset-0 stars-background opacity-60"></div>
      
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="h-16 w-3/4 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-lg mb-6"></div>
          <div className="max-w-4xl mx-auto mb-8">
            <SkeletonText lines={3} />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="h-14 w-64 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-lg"></div>
            <div className="h-14 w-48 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-lg"></div>
          </div>
        </div>

        {/* PERMA Dimensions Cards */}
        <div className="grid gap-8 lg:gap-10 mb-20">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 md:p-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl animate-pulse shadow-lg"></div>
                <div className="flex-1">
                  <div className="h-8 w-2/3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] mb-3"></div>
                  <SkeletonText lines={2} />
                </div>
              </div>
              
              <div className="space-y-3 mt-6">
                <div className="h-5 w-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%]"></div>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white/30 rounded-full mt-2 animate-pulse"></div>
                    <SkeletonText lines={1} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Wellbeing Pathways Section */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-10 md:p-14 mb-20">
          <div className="text-center mb-12">
            <div className="h-10 w-96 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-lg mb-4"></div>
            <SkeletonText lines={2} />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="h-7 w-2/3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] mb-4"></div>
                <SkeletonText lines={2} className="mb-4" />
                
                <div className="space-y-3 mt-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-white/20 rounded-full mt-1 animate-pulse"></div>
                      <SkeletonText lines={1} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-12 text-center">
          <div className="h-10 w-96 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-lg mb-6"></div>
          <div className="max-w-2xl mx-auto mb-8">
            <SkeletonText lines={2} />
          </div>
          <div className="h-14 w-64 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] shadow-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default PERMAAboutSkeleton;

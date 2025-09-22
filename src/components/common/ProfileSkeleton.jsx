import React from "react";
import { SkeletonText, SkeletonAvatar } from "./Skeleton";

export const ProfileSkeleton = () => {
  return (
    <div className="p-6">

      <div className="flex flex-col lg:flex-row gap-6 mb-8">

        <div className="lg:w-1/3">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center shadow-lg">
            <div className="h-40 w-40 mx-auto mb-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-pulse-shimmer bg-gradient-to-br from-white/15 via-white/8 to-white/5 bg-[length:200%_200%] shadow-md"></div>
            <div className="h-4 w-24 mx-auto bg-white/8 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="lg:w-2/3">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-lg">
            <div className="h-6 w-32 bg-white/15 backdrop-blur-sm border border-white/25 rounded-lg animate-pulse-shimmer bg-gradient-to-r from-white/10 via-white/25 to-white/10 bg-[length:200%_100%] mb-6 shadow-md"></div>

            <div className="space-y-4">

              <div>
                <div
                  className="h-4 w-16 bg-white/12 rounded mb-2 animate-pulse"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="h-6 w-48 bg-white/8 rounded animate-pulse"
                  style={{ animationDelay: "0.05s" }}
                ></div>
              </div>

              <div>
                <div
                  className="h-4 w-12 bg-white/12 rounded mb-2 animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="h-5 w-56 bg-white/8 rounded animate-pulse"
                  style={{ animationDelay: "0.15s" }}
                ></div>
              </div>

              <div>
                <div
                  className="h-4 w-24 bg-white/12 rounded mb-2 animate-pulse"
                  style={{ animationDelay: "0.3s" }}
                ></div>
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-16 bg-blue-500/20 rounded-full animate-pulse-shimmer bg-gradient-to-r from-blue-400/10 via-blue-400/25 to-blue-400/10 bg-[length:200%_100%]"></div>
                  <div
                    className="h-4 w-32 bg-white/8 rounded animate-pulse"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                </div>
              </div>

              <div>
                <div
                  className="h-4 w-20 bg-white/12 rounded mb-2 animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
                <div
                  className="h-5 w-28 bg-white/8 rounded animate-pulse"
                  style={{ animationDelay: "0.35s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings Section */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg">
        <div className="h-6 w-36 bg-white/15 backdrop-blur-sm border border-white/25 rounded-lg animate-pulse-shimmer bg-gradient-to-r from-white/10 via-white/25 to-white/10 bg-[length:200%_100%] mb-6 shadow-md"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Edit Section */}
          <div className="space-y-4">
            <div
              className="h-5 w-40 bg-white/12 rounded mb-4 animate-pulse"
              style={{ animationDelay: "0.1s" }}
            ></div>

            <div className="space-y-4">
              {/* Name and Email Fields */}
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index}>
                  <div
                    className="h-4 w-16 bg-white/12 rounded mb-2 animate-pulse"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  ></div>
                  <div
                    className="h-5 w-full bg-white/8 rounded animate-pulse"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  ></div>
                </div>
              ))}

              {/* Edit Button at Bottom */}
              <div className="pt-4">
                <div className="h-10 w-24 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-lg animate-pulse-shimmer bg-gradient-to-r from-blue-400/10 via-blue-400/25 to-blue-400/10 bg-[length:200%_100%] shadow-md"></div>
              </div>
            </div>
          </div>

          {/* Password Change Section */}
          <div className="space-y-4">
            <div
              className="h-5 w-32 bg-white/12 rounded mb-4 animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>

            {/* Password Fields */}
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <div
                  className="h-4 w-24 bg-white/12 rounded mb-2 animate-pulse"
                  style={{ animationDelay: `${index * 0.1}s` }}
                ></div>
                <div
                  className="h-12 w-full bg-white/8 backdrop-blur-sm border border-white/15 rounded-xl animate-pulse-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"
                  style={{ animationDelay: `${index * 0.05}s` }}
                ></div>
              </div>
            ))}

            <div className="h-10 w-36 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-lg animate-pulse-shimmer bg-gradient-to-r from-green-400/10 via-green-400/25 to-green-400/10 bg-[length:200%_100%] mt-4 shadow-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// MBTI Card Skeleton - Can be used independently
export const MBTICardSkeleton = () => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg">
      <div className="h-6 w-40 bg-white/15 backdrop-blur-sm border border-white/25 rounded-lg animate-pulse-shimmer bg-gradient-to-r from-white/10 via-white/25 to-white/10 bg-[length:200%_100%] mb-6 shadow-md"></div>

      <div className="flex items-center space-x-4 mb-4">
        {/* Avatar Skeleton */}
        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-pulse-shimmer bg-gradient-to-br from-white/15 via-white/8 to-white/5 bg-[length:200%_200%] shadow-md"></div>

        <div className="flex-1">
          <div className="h-6 w-20 bg-white/15 rounded-lg mb-2 animate-pulse-shimmer bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%]"></div>
          <div
            className="h-4 w-32 bg-white/10 rounded animate-pulse"
            style={{ animationDelay: "0.1s" }}
          ></div>
        </div>
      </div>

      <div className="space-y-2">
        <div
          className="h-4 w-full bg-white/8 rounded animate-pulse"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="h-4 w-4/5 bg-white/8 rounded animate-pulse"
          style={{ animationDelay: "0.3s" }}
        ></div>
      </div>

      <div className="h-10 w-full bg-blue-500/15 backdrop-blur-sm border border-blue-400/25 rounded-lg animate-pulse-shimmer bg-gradient-to-r from-blue-400/8 via-blue-400/20 to-blue-400/8 bg-[length:200%_100%] mt-4 shadow-sm"></div>
    </div>
  );
};

export default ProfileSkeleton;

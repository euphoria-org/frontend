import React from "react";
import {
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonCard,
} from "./Skeleton";
import Meteors from "./Meteors";

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 stars-background opacity-70"></div>

      <Meteors number={25} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section Skeleton */}
        <div className="mb-8">
          <div className="h-10 w-64 bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl animate-pulse-shimmer bg-gradient-to-r from-white/10 via-white/25 to-white/10 bg-[length:200%_100%] mb-3 shadow-lg"></div>
          <div
            className="h-6 w-48 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg animate-pulse-shimmer bg-gradient-to-r from-white/8 via-white/20 to-white/8 bg-[length:200%_100%] shadow-md"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

        {/* Tab Navigation Skeleton */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-full p-3 shadow-xl max-w-fit mx-auto">
            <nav className="flex space-x-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-full backdrop-blur-sm"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-4 w-4 bg-white/15 rounded animate-pulse-shimmer bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%]"></div>
                  <div className="h-4 w-16 bg-white/12 rounded animate-pulse-shimmer bg-gradient-to-r from-white/8 via-white/18 to-white/8 bg-[length:200%_100%]"></div>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl overflow-hidden">
          <ProfileSectionSkeleton />
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="mt-16 p-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center space-x-8">
            <div
              className="h-8 w-32 bg-white/8 rounded animate-pulse"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="h-8 w-24 bg-white/8 rounded animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="h-8 w-28 bg-white/8 rounded animate-pulse"
              style={{ animationDelay: "0.3s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Section Skeleton Component
const ProfileSectionSkeleton = () => {
  return (
    <div className="p-6">
      {/* Layout: Avatar on Left, Profile Overview on Right */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Left Side - Avatar Section Skeleton */}
        <div className="lg:w-1/3 flex">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center shadow-lg h-full w-full">
            <div className="h-64 w-64 mx-auto mb-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-pulse-shimmer bg-gradient-to-br from-white/15 via-white/8 to-white/5 bg-[length:200%_200%] shadow-md"></div>
            <div className="h-4 w-24 mx-auto bg-white/8 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Right Side - Profile Overview Skeleton (Shrunk) */}
        <div className="lg:w-2/3 flex">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-lg h-full w-full">
            <div className="h-6 w-32 bg-white/15 backdrop-blur-sm border border-white/25 rounded-lg animate-pulse-shimmer bg-gradient-to-r from-white/10 via-white/25 to-white/10 bg-[length:200%_100%] mb-6 shadow-md"></div>

            <div className="space-y-4">
              {/* Name Field */}
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

              {/* Email Field */}
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

              {/* Personality Type */}
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

              {/* Member Since */}
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

// MBTI Results Section Skeleton Component
export const MBTIResultsSkeleton = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-48 bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl animate-pulse-shimmer bg-gradient-to-r from-white/10 via-white/25 to-white/10 bg-[length:200%_100%] shadow-lg"></div>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-white/12 rounded animate-pulse"></div>
          <div
            className="h-4 w-24 bg-white/10 rounded animate-pulse"
            style={{ animationDelay: "0.1s" }}
          ></div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10 border-b border-white/20">
              <tr>
                <th className="px-6 py-4 text-left">
                  <div className="h-4 w-16 bg-white/15 rounded animate-pulse"></div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="h-4 w-28 bg-white/15 rounded animate-pulse" style={{ animationDelay: "0.05s" }}></div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="h-4 w-24 bg-white/15 rounded animate-pulse" style={{ animationDelay: "0.1s" }}></div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="h-4 w-32 bg-white/15 rounded animate-pulse" style={{ animationDelay: "0.15s" }}></div>
                </th>
                <th className="px-6 py-4 text-center">
                  <div className="h-4 w-16 bg-white/15 rounded animate-pulse mx-auto" style={{ animationDelay: "0.2s" }}></div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {Array.from({ length: 3 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-white/5">
                  {/* Test # Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="bg-blue-500/20 p-2 rounded-full border border-blue-400/30">
                        <div className="h-4 w-4 bg-blue-400/30 rounded animate-pulse"></div>
                      </div>
                      <div className="h-5 w-8 bg-white/12 rounded animate-pulse" style={{ animationDelay: `${rowIndex * 0.1}s` }}></div>
                    </div>
                  </td>
                  {/* Personality Type Column */}
                  <td className="px-6 py-4">
                    <div className="h-6 w-16 bg-blue-500/20 border border-blue-400/30 rounded-full animate-pulse-shimmer bg-gradient-to-r from-blue-400/10 via-blue-400/25 to-blue-400/10 bg-[length:200%_100%]" style={{ animationDelay: `${rowIndex * 0.1 + 0.05}s` }}></div>
                  </td>
                  {/* Description Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-white/12 rounded animate-pulse" style={{ animationDelay: `${rowIndex * 0.1 + 0.1}s` }}></div>
                      <div className="h-3 w-48 bg-white/8 rounded animate-pulse" style={{ animationDelay: `${rowIndex * 0.1 + 0.15}s` }}></div>
                    </div>
                  </td>
                  {/* Date Column */}
                  <td className="px-6 py-4">
                    <div className="h-4 w-40 bg-white/10 rounded animate-pulse" style={{ animationDelay: `${rowIndex * 0.1 + 0.2}s` }}></div>
                  </td>
                  {/* Action Column */}
                  <td className="px-6 py-4 text-center">
                    <div className="h-4 w-24 bg-blue-400/20 rounded animate-pulse mx-auto" style={{ animationDelay: `${rowIndex * 0.1 + 0.25}s` }}></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const PERMAResultsSkeleton = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-48 bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl animate-pulse-shimmer bg-gradient-to-r from-white/10 via-white/25 to-white/10 bg-[length:200%_100%] shadow-lg"></div>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-white/12 rounded animate-pulse"></div>
          <div
            className="h-4 w-24 bg-white/10 rounded animate-pulse"
            style={{ animationDelay: "0.1s" }}
          ></div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10 border-b border-white/20">
              <tr>
                <th className="px-6 py-4 text-left">
                  <div className="h-4 w-16 bg-white/15 rounded animate-pulse"></div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="h-4 w-32 bg-white/15 rounded animate-pulse" style={{ animationDelay: "0.05s" }}></div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="h-4 w-28 bg-white/15 rounded animate-pulse" style={{ animationDelay: "0.1s" }}></div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="h-4 w-24 bg-white/15 rounded animate-pulse" style={{ animationDelay: "0.15s" }}></div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="h-4 w-32 bg-white/15 rounded animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                </th>
                <th className="px-6 py-4 text-center">
                  <div className="h-4 w-16 bg-white/15 rounded animate-pulse mx-auto" style={{ animationDelay: "0.25s" }}></div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {Array.from({ length: 3 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-white/5">
                  {/* Test # Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="bg-purple-500/20 p-2 rounded-full border border-purple-400/30">
                        <div className="h-4 w-4 bg-purple-400/30 rounded animate-pulse"></div>
                      </div>
                      <div className="h-5 w-8 bg-white/12 rounded animate-pulse" style={{ animationDelay: `${rowIndex * 0.1}s` }}></div>
                    </div>
                  </td>
                  {/* Wellbeing Level Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="h-6 w-24 bg-green-500/20 border border-green-400/30 rounded-full animate-pulse-shimmer bg-gradient-to-r from-green-400/10 via-green-400/25 to-green-400/10 bg-[length:200%_100%]" style={{ animationDelay: `${rowIndex * 0.1 + 0.05}s` }}></div>
                      <div className="h-3 w-40 bg-white/8 rounded animate-pulse" style={{ animationDelay: `${rowIndex * 0.1 + 0.1}s` }}></div>
                    </div>
                  </td>
                  {/* Average Score Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-5 w-8 bg-white/15 rounded animate-pulse" style={{ animationDelay: `${rowIndex * 0.1 + 0.15}s` }}></div>
                      <div className="h-4 w-8 bg-white/10 rounded animate-pulse" style={{ animationDelay: `${rowIndex * 0.1 + 0.18}s` }}></div>
                    </div>
                  </td>
                  {/* Dimensions Column - 5 color-coded badges */}
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {["purple", "blue", "pink", "yellow", "green"].map((color, dimIndex) => (
                        <div
                          key={dimIndex}
                          className={`h-6 w-16 bg-${color}-500/20 border border-${color}-400/30 rounded animate-pulse-shimmer bg-gradient-to-r from-${color}-400/10 via-${color}-400/25 to-${color}-400/10 bg-[length:200%_100%]`}
                          style={{ animationDelay: `${rowIndex * 0.1 + dimIndex * 0.05}s` }}
                        ></div>
                      ))}
                    </div>
                  </td>
                  {/* Date Column */}
                  <td className="px-6 py-4">
                    <div className="h-4 w-40 bg-white/10 rounded animate-pulse" style={{ animationDelay: `${rowIndex * 0.1 + 0.25}s` }}></div>
                  </td>
                  {/* Action Column */}
                  <td className="px-6 py-4 text-center">
                    <div className="h-4 w-24 bg-purple-400/20 rounded animate-pulse mx-auto" style={{ animationDelay: `${rowIndex * 0.1 + 0.3}s` }}></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const IQResultsSkeleton = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-48 bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl animate-pulse-shimmer bg-gradient-to-r from-white/10 via-white/25 to-white/10 bg-[length:200%_100%] shadow-lg"></div>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-white/12 rounded animate-pulse"></div>
          <div
            className="h-4 w-24 bg-white/10 rounded animate-pulse"
            style={{ animationDelay: "0.1s" }}
          ></div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Results Table */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10 border-b border-white/20">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <div className="h-4 w-16 bg-white/15 rounded animate-pulse"></div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="h-4 w-20 bg-white/15 rounded animate-pulse" style={{ animationDelay: "0.05s" }}></div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="h-4 w-36 bg-white/15 rounded animate-pulse" style={{ animationDelay: "0.1s" }}></div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="h-4 w-24 bg-white/15 rounded animate-pulse" style={{ animationDelay: "0.15s" }}></div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="h-4 w-32 bg-white/15 rounded animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="h-4 w-16 bg-white/15 rounded animate-pulse mx-auto" style={{ animationDelay: "0.25s" }}></div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {Array.from({ length: 3 }).map((_, rowIndex) => {
                  // Varying colors for different IQ levels
                  const colors = ["purple", "blue", "cyan"];
                  const color = colors[rowIndex % colors.length];
                  
                  return (
                    <tr key={rowIndex} className="hover:bg-white/5">
                      {/* Test # Column */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className={`bg-${color}-500/20 p-2 rounded-full border border-${color}-400/30`}>
                            <div className={`h-4 w-4 bg-${color}-400/30 rounded animate-pulse`}></div>
                          </div>
                          <div className="h-5 w-8 bg-white/12 rounded animate-pulse" style={{ animationDelay: `${rowIndex * 0.1}s` }}></div>
                        </div>
                      </td>
                      {/* IQ Score Column */}
                      <td className="px-6 py-4">
                        <div className={`h-7 w-16 bg-${color}-500/20 border border-${color}-400/30 rounded-full animate-pulse-shimmer bg-gradient-to-r from-${color}-400/10 via-${color}-400/25 to-${color}-400/10 bg-[length:200%_100%]`} style={{ animationDelay: `${rowIndex * 0.1 + 0.05}s` }}></div>
                      </td>
                      {/* Intelligence Level Column */}
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="h-4 w-28 bg-white/12 rounded animate-pulse" style={{ animationDelay: `${rowIndex * 0.1 + 0.1}s` }}></div>
                          <div className="h-3 w-52 bg-white/8 rounded animate-pulse" style={{ animationDelay: `${rowIndex * 0.1 + 0.15}s` }}></div>
                        </div>
                      </td>
                      {/* Percentile Column with Progress Bar */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-white/10 rounded-full h-2">
                            <div
                              className={`bg-${color}-400 h-2 rounded-full animate-pulse-shimmer bg-gradient-to-r from-${color}-400/50 via-${color}-400/80 to-${color}-400/50 bg-[length:200%_100%]`}
                              style={{ 
                                width: `${65 + rowIndex * 10}%`,
                                animationDelay: `${rowIndex * 0.1 + 0.2}s` 
                              }}
                            ></div>
                          </div>
                          <div className="h-4 w-10 bg-white/10 rounded animate-pulse" style={{ animationDelay: `${rowIndex * 0.1 + 0.25}s` }}></div>
                        </div>
                      </td>
                      {/* Date Column */}
                      <td className="px-6 py-4">
                        <div className="h-4 w-40 bg-white/10 rounded animate-pulse" style={{ animationDelay: `${rowIndex * 0.1 + 0.3}s` }}></div>
                      </td>
                      {/* Action Column */}
                      <td className="px-6 py-4 text-center">
                        <div className={`h-4 w-24 bg-${color}-400/20 rounded animate-pulse mx-auto`} style={{ animationDelay: `${rowIndex * 0.1 + 0.35}s` }}></div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => {
            const colors = ["purple", "green", "blue"];
            const color = colors[index];
            
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-4"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-3 w-24 bg-white/10 rounded animate-pulse mb-2" style={{ animationDelay: `${index * 0.05}s` }}></div>
                    <div className="h-8 w-16 bg-white/15 rounded animate-pulse" style={{ animationDelay: `${index * 0.05 + 0.05}s` }}></div>
                  </div>
                  <div className={`bg-${color}-500/20 p-3 rounded-full`}>
                    <div className={`h-6 w-6 bg-${color}-400/30 rounded animate-pulse`} style={{ animationDelay: `${index * 0.05 + 0.1}s` }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;

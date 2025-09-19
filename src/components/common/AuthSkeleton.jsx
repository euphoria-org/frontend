import React from "react";
import { SkeletonForm } from "./Skeleton";
import Meteors from "./Meteors";

const AuthSkeleton = ({
  title = "Authentication",
  subtitle = "Please wait while we load your form",
  fields = 3,
  hasGoogleButton = true,
  hasFooterLink = true,
}) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      {/* Meteors background */}
      <Meteors number={25} />

      {/* Static stars background */}
      <div className="absolute inset-0 stars-background opacity-70"></div>

      <div className="relative z-10 max-w-md w-full space-y-6">
        {/* Header skeleton */}
        <div className="text-center space-y-4">
          <div className="h-10 w-64 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
          <div className="h-5 w-48 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
        </div>

        {/* Form container skeleton */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-6">
          <SkeletonForm fields={fields} />

          {hasGoogleButton && (
            <>
              {/* Divider skeleton */}
              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-white/20"></div>
                <div className="h-4 w-8 mx-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
                <div className="flex-1 h-px bg-white/20"></div>
              </div>

              {/* Google button skeleton */}
              <div className="h-12 w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
            </>
          )}
        </div>

        {/* Footer link skeleton */}
        {hasFooterLink && (
          <div className="text-center">
            <div className="h-4 w-56 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]"></div>
          </div>
        )}
      </div>
    </div>
  );
};

// Specific skeleton components for each auth page
const LoginSkeleton = () => (
  <AuthSkeleton
    title="Welcome Back"
    subtitle="Sign in to your account"
    fields={2}
    hasGoogleButton={true}
    hasFooterLink={true}
  />
);

const SignupSkeleton = () => (
  <AuthSkeleton
    title="Create Account"
    subtitle="Join our community"
    fields={4}
    hasGoogleButton={true}
    hasFooterLink={true}
  />
);

const ForgotPasswordSkeleton = () => (
  <AuthSkeleton
    title="Reset Password"
    subtitle="Enter your email to reset"
    fields={1}
    hasGoogleButton={false}
    hasFooterLink={true}
  />
);

const UpdatePasswordSkeleton = () => (
  <AuthSkeleton
    title="Update Password"
    subtitle="Create a new password"
    fields={2}
    hasGoogleButton={false}
    hasFooterLink={false}
  />
);

export default AuthSkeleton;
export {
  LoginSkeleton,
  SignupSkeleton,
  ForgotPasswordSkeleton,
  UpdatePasswordSkeleton,
};

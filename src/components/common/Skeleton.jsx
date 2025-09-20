import React from "react";

const Skeleton = ({
  width = "w-full",
  height = "h-4",
  className = "",
  variant = "rectangle",
  animation = "shimmer",
  rounded = "rounded",
}) => {
  // Base skeleton classes
  const baseClasses = "bg-white/10 backdrop-blur-sm border border-white/20";

  // Variant classes
  const variantClasses = {
    rectangle: "",
    circle: "rounded-full aspect-square",
    text: "rounded",
    button: "rounded-2xl",
    card: "rounded-3xl",
  };

  // Animation classes
  const animationClasses = {
    shimmer:
      "animate-shimmer bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_100%]",
    "pulse-shimmer":
      "animate-pulse-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%]",
    "gentle-pulse": "animate-gentle-pulse",
    pulse: "animate-pulse",
    none: "",
  };

  // Rounded classes (only applied if variant is not circle)
  const roundedClasses = variant !== "circle" ? rounded : "";

  return (
    <div
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${animationClasses[animation]}
        ${roundedClasses}
        ${width}
        ${height}
        ${className}
      `}
    />
  );
};

// Preset skeleton components for common use cases
const SkeletonText = ({ lines = 1, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        height="h-4"
        width={index === lines - 1 && lines > 1 ? "w-3/4" : "w-full"}
        variant="text"
      />
    ))}
  </div>
);

const SkeletonAvatar = ({ size = "medium", className = "" }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
    xl: "w-20 h-20",
  };

  return (
    <Skeleton
      width={sizeClasses[size]}
      height={sizeClasses[size]}
      variant="circle"
      className={className}
    />
  );
};

const SkeletonButton = ({
  width = "w-full",
  height = "h-12",
  className = "",
}) => (
  <Skeleton
    width={width}
    height={height}
    variant="button"
    className={className}
  />
);

const SkeletonCard = ({ className = "" }) => (
  <div
    className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 space-y-4 ${className}`}
  >
    <div className="flex items-center space-x-4">
      <SkeletonAvatar size="large" />
      <div className="flex-1 space-y-2">
        <Skeleton height="h-5" width="w-3/4" variant="text" />
        <Skeleton height="h-4" width="w-1/2" variant="text" />
      </div>
    </div>
    <SkeletonText lines={3} />
    <SkeletonButton height="h-10" width="w-32" />
  </div>
);

const SkeletonTestCard = ({ className = "" }) => (
  <div
    className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 space-y-6 ${className}`}
  >
    {/* Header with icon and title */}
    <div className="flex items-center space-x-4">
      <Skeleton width="w-16" height="h-16" variant="circle" />
      <div className="flex-1 space-y-2">
        <Skeleton height="h-6" width="w-3/4" variant="text" />
        <Skeleton height="h-4" width="w-1/2" variant="text" />
      </div>
    </div>

    {/* Description */}
    <SkeletonText lines={2} />

    {/* Statistics */}
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Skeleton height="h-8" width="w-16" variant="text" />
        <Skeleton height="h-4" width="w-full" variant="text" />
      </div>
      <div className="space-y-2">
        <Skeleton height="h-8" width="w-20" variant="text" />
        <Skeleton height="h-4" width="w-full" variant="text" />
      </div>
    </div>

    {/* Button */}
    <SkeletonButton height="h-12" />
  </div>
);

const SkeletonForm = ({ fields = 3, className = "" }) => (
  <div className={`space-y-6 ${className}`}>
    {Array.from({ length: fields }).map((_, index) => (
      <div key={index} className="space-y-2">
        <Skeleton height="h-4" width="w-24" variant="text" />
        <Skeleton height="h-12" variant="button" />
      </div>
    ))}
    <SkeletonButton height="h-12" className="mt-6" />
  </div>
);

const SkeletonQuestion = ({ options = 4, className = "" }) => (
  <div
    className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 space-y-6 ${className}`}
  >
    {/* Question number and text */}
    <div className="space-y-3">
      <Skeleton height="h-5" width="w-32" variant="text" />
      <SkeletonText lines={2} />
    </div>

    {/* Options */}
    <div className="space-y-3">
      {Array.from({ length: options }).map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl"
        >
          <Skeleton width="w-5" height="h-5" variant="circle" />
          <Skeleton height="h-4" width="w-3/4" variant="text" />
        </div>
      ))}
    </div>

    {/* Navigation buttons */}
    <div className="flex justify-between">
      <SkeletonButton width="w-24" height="h-10" />
      <SkeletonButton width="w-24" height="h-10" />
    </div>
  </div>
);

// Export all components
export default Skeleton;
export {
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonCard,
  SkeletonTestCard,
  SkeletonForm,
  SkeletonQuestion,
};

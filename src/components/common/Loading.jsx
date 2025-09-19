import React from "react";
import { LoadingIcon } from "../../icons";

const Loading = ({
  message = "Loading...",
  size = "large",
  className = "",
  variant = "primary",
}) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  const variantClasses = {
    primary: "text-blue-600",
    purple: "text-purple-600",
    gray: "text-gray-600",
    custom: "",
  };

  const customStyle =
    variant === "custom" ? { color: "var(--color-custom-2)" } : {};

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      <div className="relative">
        <LoadingIcon
          className={`${sizeClasses[size]} ${
            variant === "custom" ? "" : variantClasses[variant]
          } animate-spin`}
          style={customStyle}
        />
        <div
          className="absolute inset-0 rounded-full border-2 opacity-20 animate-pulse"
          style={
            variant === "custom"
              ? { borderColor: "var(--color-custom-2)" }
              : { borderColor: "currentColor" }
          }
        ></div>
      </div>
      {message && (
        <p
          className={`${
            variant === "custom" ? "" : variantClasses[variant]
          } text-lg font-medium animate-pulse`}
          style={customStyle}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;

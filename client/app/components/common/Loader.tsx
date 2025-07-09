"use client";
import React, { FC } from "react";
import styles from "../../styles/styles";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  fullScreen?: boolean;
  text?: string;
}

const Loader: FC<LoaderProps> = ({
  size = "medium",
  fullScreen = false,
  text,
}) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  const loader = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={styles.combineStyles(
          sizeClasses[size],
          "border-4 border-slate-200 dark:border-slate-700 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"
        )}
      />
      {text && (
        <p className="text-sm text-slate-600 dark:text-slate-400 font-Poppins">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-slate-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-sm">
        {loader}
      </div>
    );
  }

  // Default behavior: take full width and height of parent container
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-slate-900">
      {loader}
    </div>
  );
};

export default Loader;

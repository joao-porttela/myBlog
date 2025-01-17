"use client";

import React from "react";
import {Skeleton} from "@/components/ui/skeleton";

export default function LoadingPostPage() {
  return (
    <div className="py-4 mx-4 md:mx-40">
      {/* Back Button Skeleton */}
      <Skeleton className="h-8 w-24 mb-4" />

      <div className="p-6 bg-gray-400 rounded-md shadow-md">
        {/* Title Section Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-10 w-3/4" /> {/* Post Title */}
          <div className="flex gap-4">
            <Skeleton className="h-8 w-8 rounded-full" /> {/* Edit Button */}
            <Skeleton className="h-8 w-8 rounded-full" /> {/* Delete Button */}
          </div>
        </div>
        <Skeleton className="h-5 w-1/2 mb-4" /> {/* Description */}
        {/* Content Section Skeleton */}
        <div className="mb-4">
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-3/4" />
        </div>
        {/* Tags Section Skeleton */}
        <div className="flex gap-2 mt-4">
          {Array.from({length: 3}).map((_, i) => (
            <Skeleton key={i} className="h-8 w-16 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

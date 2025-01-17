import React from "react";
import {Skeleton} from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="md:mx-40 px-4 mb-10 space-y-6">
      {/* Back Button Skeleton */}
      <Skeleton className="h-8 w-24 mb-4" />

      {/* Title */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-20" />
      </div>

      {/* Category */}
      <div>
        <Skeleton className="h-6 w-24 mb-2" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Subcategory */}
      <div>
        <Skeleton className="h-6 w-32 mb-2" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Title Input */}
      <div>
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Content */}
      <div>
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-96 w-full" />
      </div>

      {/* Tags */}
      <div>
        <Skeleton className="h-6 w-16 mb-2" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>

      {/* Submit Button */}
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

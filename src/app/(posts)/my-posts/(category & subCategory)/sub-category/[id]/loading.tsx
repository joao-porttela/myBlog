"use client";

import React from "react";
import {Skeleton} from "@/components/ui/skeleton";

export default function LoadingSubCategoryPage() {
  return (
    <div className="py-4 mx-4 md:mx-40">
      {/* Back Button Skeleton */}
      <Skeleton className="h-8 w-24 mb-4" />

      {/* Subcategory Title and Actions Skeleton */}
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-8 w-40" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>

      {/* Posts Section Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({length: 6}).map((_, index) => (
          <Skeleton key={index} className="h-40 w-full md:h-48 rounded-md" />
        ))}
      </div>
    </div>
  );
}

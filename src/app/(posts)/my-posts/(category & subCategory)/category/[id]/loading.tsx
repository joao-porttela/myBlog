"use client";

import React from "react";
import {Skeleton} from "@/components/ui/skeleton";

export default function LoadingCategoryPage() {
  return (
    <div className="py-4 mx-4 md:mx-40">
      {/* Back Button Skeleton */}
      <Skeleton className="h-8 w-24 mb-4" />

      {/* Subcategories Section Skeleton */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-8 w-40" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto mt-4 py-2">
          {Array.from({length: 4}).map((_, index) => (
            <Skeleton key={index} className="h-32 w-48 md:h-40 md:w-60 rounded-md" />
          ))}
        </div>
      </section>

      {/* Posts Section Skeleton */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-8 w-40" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({length: 6}).map((_, index) => (
            <Skeleton key={index} className="h-40 w-full md:h-48 rounded-md" />
          ))}
        </div>
      </section>
    </div>
  );
}

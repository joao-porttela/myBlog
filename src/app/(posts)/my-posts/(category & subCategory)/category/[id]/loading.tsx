"use client";

import React from "react";
import {Skeleton} from "@/components/ui/skeleton";

export default function LoadingCategoryPage() {
  return (
    <div className="py-4 mx-4 md:mx-40">
      <Skeleton className="h-8 w-24 mb-4" />

      <section className="my-8">
        <div className="flex items-center justify-between mb-4">
          <div className="h-full">
            <h2 className="text-xl md:text-3xl font-thin">My Subcategories</h2>
          </div>

          <div className="flex items-center justify-end gap-4">
            <Skeleton className="h-10 w-10 rounded-md" />

            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto mt-4 py-2">
          {Array.from({length: 4}).map((_, index) => (
            <Skeleton key={index} className="h-32 w-48 md:h-40 md:w-60 rounded-md" />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="h-full">
            <h2 className="text-xl md:text-3xl font-thin mb-4">My Posts</h2>
          </div>

          <div className="flex items-center gap-4">
            <Skeleton className="h-40 w-full md:h-48 rounded-md" />
          </div>
        </div>

        {Array.from({length: 6}).map((_, index) => (
          <Skeleton key={index} className="h-40 w-full md:h-48 rounded-md" />
        ))}
      </section>
    </div>
  );
}

"use client";

import React from "react";
import {Skeleton} from "@/components/ui/skeleton";

export default function LoadingSubCategoryPage() {
  return (
    <div className="py-4 mx-4 md:mx-40">
      <Skeleton className="h-8 w-24 mb-4" />

      <section>
        <div className="h-full">
          <h1 className="text-xl md:text-3xl font-thin mb-4">
            <Skeleton className="h-10 w-10 rounded-full" />
          </h1>
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

"use client";

import React from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";

export default function LoadingPostsPage() {
  return (
    <div className="py-4 mx-4 md:mx-40">
      {/* Categories Section Skeleton */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-8 w-40" /> {/* myCategories Title */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" /> {/* Search Icon */}
            <Skeleton className="h-10 w-10 rounded-full" /> {/* Plus Icon */}
            <Skeleton className="h-10 w-10 rounded-full" /> {/* Filter Icon */}
          </div>
        </div>
        <ScrollArea className="whitespace-nowrap mt-4 py-2">
          <div className="flex gap-4">
            {Array.from({length: 5}).map((_, i) => (
              <Skeleton key={i} className="h-32 w-64 rounded-md" />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>

      {/* Posts Section Skeleton */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-8 w-40" /> {/* myPosts Title */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" /> {/* Search Icon */}
            <Skeleton className="h-10 w-10 rounded-full" /> {/* Plus Icon */}
            <Skeleton className="h-10 w-10 rounded-full" /> {/* Filter Icon */}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({length: 6}).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-md" />
          ))}
        </div>
      </section>
    </div>
  );
}

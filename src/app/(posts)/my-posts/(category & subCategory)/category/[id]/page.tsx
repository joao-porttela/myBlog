"use client";

import React from "react";
import {useParams} from "next/navigation";

// Components
import ReturnButton from "@/components/global/return-button";

// Interfaces
import MyPosts from "@/components/posts/my-posts";
import MySubCategories from "@/components/subCategory/my-sub-categories";

export default function CategoryPage() {
  const params = useParams<{id: string}>();

  return (
    <div className="py-4 mx-4 md:mx-40">
      <ReturnButton />

      <MySubCategories />

      <section>
        <MyPosts categoryId={params.id} />
      </section>
    </div>
  );
}

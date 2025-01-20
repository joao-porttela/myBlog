"use client";

import React from "react";

// Components
import MyCategories from "@/components/category/my-categories";
import MyPosts from "@/components/posts/my-posts";

export default function Posts() {
  return (
    <div className="py-4 mx-4 md:mx-40">
      <section className="mb-8">
        <MyCategories />
      </section>

      <section>
        <MyPosts />
      </section>
    </div>
  );
}

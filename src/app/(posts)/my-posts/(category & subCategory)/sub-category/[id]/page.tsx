"use client";

import React, {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";

// Components
import PostCard from "@/components/posts/post-card";
import ReturnButton from "@/components/global/return-button";

// Hooks
import {toast} from "@/hooks/use-toast";

// Lib Actions
import {getSubCategory} from "@/lib/sub-category-actions";

// Interfaces
import {ISubCategory} from "@/interfaces/subCategory.interface";
import {IPost} from "@/interfaces/post.interface";
import {Separator} from "@/components/ui/separator";
import PostControlPanel from "@/components/posts/post-control-pannel";

export default function SubCategoryPage() {
  const router = useRouter();
  const params = useParams<{id: string}>();

  const [subCategory, setSubCategory] = useState<ISubCategory>({});
  const [posts, setPosts] = useState<IPost[]>([]);

  const fetchData = async () => {
    try {
      const subCategoryId = params.id;

      if (!subCategoryId) {
        router.push("/my-posts");
        return;
      }

      // Fetch subcategory data
      const subCategory = await getSubCategory(subCategoryId);
      setPosts(subCategory.posts);
      setSubCategory(subCategory);
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong while loading subcategory data",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="py-4 mx-4 md:mx-40">
      <ReturnButton categoryId={subCategory.categoryId} />

      <section>
        <div className="h-full">
          <h1 className="text-xl md:text-3xl font-thin mb-4">
            {subCategory.name}
            <Separator />
          </h1>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="h-full">
            <h2 className="text-xl md:text-3xl font-thin mb-4">My Posts</h2>
          </div>

          <div className="flex items-center gap-4">
            <PostControlPanel
              categoryId={subCategory.categoryId}
              subCategoryId={subCategory.id}
            />
          </div>
        </div>

        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} getData={fetchData} />)
        ) : (
          <p>No posts available.</p>
        )}
      </section>
    </div>
  );
}

"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

// Components
import MyCategories from "@/components/category/my-categories";
import PostCard from "@/components/posts/post-card";
import PostControlPanel from "@/components/posts/post-control-pannel";

// Hooks
import {toast} from "@/hooks/use-toast";

// Lib Actions
import {getUserPosts} from "@/lib/post-actions";
import {getAuthorCategories} from "@/lib/category-actions";

// Interfaces
import {IPost} from "@/interfaces/post.interface";
import {ICategory} from "@/interfaces/category.interface";

export default function Posts() {
  const router = useRouter();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);

  const getData = async () => {
    try {
      const authorId = JSON.parse(localStorage.getItem("user")!).id;

      if (!authorId) router.push("/");

      const result = await getUserPosts(authorId);

      setPosts(result.message);

      // Fetch categories
      const categoriesResult = await getAuthorCategories(authorId);

      setCategories(categoriesResult.message);
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong loading the posts",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="py-4 mx-4 md:mx-40">
      <section className="mb-8">
        <MyCategories categories={categories} />
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="h-full">
            <h2 className="text-xl md:text-3xl font-thin mb-4">My Posts</h2>
          </div>

          <div className="flex items-center gap-4">
            <PostControlPanel />
          </div>
        </div>

        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} getData={getData} />)
        ) : (
          <p>You have no posts. Start by creating one.</p>
        )}
      </section>
    </div>
  );
}

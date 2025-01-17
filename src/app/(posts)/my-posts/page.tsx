"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

// Components
import MyCategories from "@/components/category/my-categories";
import MyPosts from "@/components/posts/my-posts";

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

      const postsResult = await getUserPosts(authorId);

      setPosts(postsResult.message);

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
        <MyPosts posts={posts} getData={getData} />
      </section>
    </div>
  );
}

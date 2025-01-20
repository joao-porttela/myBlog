import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

import PostCard from "./post-card";
import PostControlPanel from "./post-control-pannel";

import {getUserPosts} from "@/lib/post-actions";

import {toast} from "@/hooks/use-toast";

import {IPost} from "@/interfaces/post.interface";

type MyPostsProsps = {
  categoryId?: string;
  subCategoryId?: string;
};

export default function MyPosts({categoryId, subCategoryId}: MyPostsProsps) {
  const router = useRouter();

  const [posts, setPosts] = useState<IPost[]>([]);

  const getPosts = async () => {
    try {
      const author = JSON.parse(localStorage.getItem("user")!);

      if (!author) return router.push("/auth/login");

      const postsResult = await getUserPosts({
        authorId: author.id,
        categoryId,
        subCategoryId,
      });

      setPosts(postsResult.message);
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong loading the posts",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const author = JSON.parse(localStorage.getItem("user")!);

        if (!author) return router.push("/auth/login");

        const postsResult = await getUserPosts({
          authorId: author.id,
          categoryId,
          subCategoryId,
        });

        setPosts(postsResult.message);
      } catch {
        toast({
          title: "Error",
          description: "Something went wrong loading the posts",
          variant: "destructive",
        });
      }
    };

    getPosts();
  }, [categoryId, subCategoryId, router]);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="h-full">
          <h2 className="text-xl md:text-3xl font-thin mb-4">My Posts</h2>
        </div>

        <div className="flex items-center gap-4">
          <PostControlPanel categoryId={categoryId} subCategoryId={subCategoryId} />
        </div>
      </div>

      {posts && posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} getData={getPosts} />)
      ) : (
        <p>No posts available.</p>
      )}
    </>
  );
}

import React from "react";

import PostCard from "./post-card";
import PostControlPanel from "./post-control-pannel";

import {IPost} from "@/interfaces/post.interface";

type myPostsProps = {
  posts: IPost[];
  getData: () => void;
};

export default function MyPosts({posts, getData}: myPostsProps) {
  return (
    <>
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
        <p>No posts available.</p>
      )}
    </>
  );
}

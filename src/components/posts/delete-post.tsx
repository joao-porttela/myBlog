"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";

// Components
import CustomModal from "../global/custom-modal";

// Hooks
import {useModal} from "@/hooks/use-modal";

// Lib actions
import {deletePost} from "@/lib/post-actions";

// UI
import {Button} from "../ui/button";
import Loading from "../ui/loading";

// Interfaces
import {IPost} from "@/interfaces/post.interface";
import {toast} from "@/hooks/use-toast";

export default function DeletePost({post, getData}: {post: IPost; getData?: () => void}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {dispatch} = useModal();

  function handleCancel() {
    dispatch({type: "close"});
  }

  async function handleDelete() {
    setIsLoading(true);

    await deletePost(post?.id);

    toast({title: "Post deleted", description: "Post deleted successfully"});

    dispatch({type: "close"});

    if (getData) {
      getData();
    } else {
      router.back();
    }

    setIsLoading(false);
  }

  return (
    <CustomModal
      defaultOpen
      title="Delete Post"
      subHeading="Are you sure you want to delete the post? This action is irreversible"
    >
      <div className="flex gap-4 justify-end">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button
          className="text-white w-32"
          variant="destructive"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? <Loading /> : "Delete Post"}
        </Button>
      </div>
    </CustomModal>
  );
}

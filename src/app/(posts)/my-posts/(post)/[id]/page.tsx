"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useParams, useRouter} from "next/navigation";

import {Badge} from "@/components/ui/badge";
import {CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import {getPost} from "@/lib/post-actions";
import LinkTag from "@/components/ui/link-tag";
import {ChevronLeftIcon, Edit, Trash} from "lucide-react";

import DeletePost from "@/components/posts/delete-post";

import {toast} from "@/hooks/use-toast";
import {useAuth} from "@/hooks/use-auth";
import {useModal} from "@/hooks/use-modal";

import {IPost} from "@/interfaces/post.interface";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {Editor} from "primereact/editor";

export default function POst() {
  const router = useRouter();
  const params = useParams<{id: string}>();
  const [post, setPost] = useState<IPost | null>(null);

  const {setOpen} = useModal();
  const {state} = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      if (!params.id) {
        router.push("/");
        return;
      }

      try {
        const response = await getPost(params.id);

        const data: IPost = await response;
        setPost(data);
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    fetchPost();
  }, [params, router]);

  if (!post) {
    return (
      <div className="h-screen py-4 mx-4 md:mx-40">
        <Loading />
      </div>
    );
  }

  const isAuthor = post.authorId === state.user?.id;

  return (
    <div className="py-4 mx-4 md:mx-40">
      <Button className="mb-4" size="sm" onClick={() => router.back()}>
        <ChevronLeftIcon />
      </Button>

      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>

          {isAuthor && (
            <div className="flex gap-4 mt-4">
              <Button variant="outline" size="sm">
                <Link href={`/my-posts/edit/${post.id}`}>
                  <Edit />
                </Link>
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setOpen(<DeletePost post={post} />)}
              >
                <Trash className="text-black" />
              </Button>
            </div>
          )}
        </div>
        <CardDescription>
          Published: {post.published ? "Yes" : "No"} | Created:{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        {(post.content && (
          <Editor
            style={{border: "0", fontSize: "16px"}}
            showHeader={false}
            readOnly
            value={post.content}
          />
        )) ||
          "No content available."}

        {post.tags && post.tags.length > 0 && (
          <ScrollArea className="whitespace-nowrap mt-4 px-4">
            <div className="flex gap-2 h-12">
              {post.tags.map((tag) => (
                <Badge className="text-sm h-fit" key={tag.id} variant="secondary">
                  <LinkTag tag={tag} />
                </Badge>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </CardContent>
    </div>
  );
}

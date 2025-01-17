"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useParams, useRouter} from "next/navigation";

import {Badge} from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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

export default function POst() {
  const router = useRouter();
  const params = useParams<{id: string}>();
  const [post, setPost] = useState<IPost | null>(null);

  const {setOpen} = useModal();
  const {user} = useAuth();

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

  const isAuthor = post.authorId === user?.id;

  return (
    <div className="py-4 mx-4 md:mx-40">
      <Button className="mb-4" size="sm" onClick={() => router.back()}>
        <ChevronLeftIcon />
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>

            {isAuthor && (
              <div className="flex gap-4 mt-4">
                <Button variant="outline" size="sm">
                  <Link href={`/posts/edit/${post.id}`}>
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
        <CardContent>
          <div className="mb-4">
            {(post.content && (
              <div dangerouslySetInnerHTML={{__html: post.content}}></div>
            )) ||
              "No content available."}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 mt-2">
              {post.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary">
                  <LinkTag tag={tag} />
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

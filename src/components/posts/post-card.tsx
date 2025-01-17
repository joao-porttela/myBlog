"use client";

import Link from "next/link";

// COmponents
import DeletePost from "./delete-post";

// Hooks
import {useModal} from "@/hooks/use-modal";

// UI
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {IPost} from "@/interfaces/post.interface";
import LinkTag from "../ui/link-tag";
import {ScrollArea, ScrollBar} from "../ui/scroll-area";
import {Switch} from "../ui/switch";
import {Button} from "../ui/button";
import {Edit, Trash} from "lucide-react";

interface PostCardProps {
  post: IPost;
  getData?: () => void;
}

export default function PostCard({post, getData}: PostCardProps) {
  const {setOpen} = useModal();

  return (
    <Card className="mb-4">
      <CardHeader className="">
        <CardTitle className="mb-2 flex items-center justify-between">
          <Link className="hover:underline text-primary" href={`/my-posts/${post.id}`}>
            {post.title}
          </Link>

          <div className="flex items-center gap-4">
            <Switch />

            <div className="flex items-center gap-2">
              <Button size="sm">
                <Link href={`/my-posts/edit/${post.id}`}>
                  <Edit />
                </Link>
              </Button>

              <Button
                size="sm"
                variant="destructive"
                className="text-black"
                onClick={() => setOpen(<DeletePost post={post} getData={getData} />)}
              >
                <Trash />
              </Button>
            </div>
          </div>
        </CardTitle>
        <CardDescription>
          Published: {post.published ? "Yes" : "No"} | Created:{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {post.content ? (
          <div
            dangerouslySetInnerHTML={{__html: post.content.substring(0, 100) + "..."}}
          ></div>
        ) : (
          <p>No content available.</p>
        )}
        {post.tags && post.tags.length > 0 && (
          <ScrollArea className="whitespace-nowrap mt-4">
            <div className="flex gap-2 h-fit">
              {post.tags.map((tag) => (
                <Badge className="text-sm" key={tag.id} variant="secondary">
                  <LinkTag tag={tag} />
                </Badge>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

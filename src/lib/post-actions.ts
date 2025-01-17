"use server";

import {revalidatePath} from "next/cache";

import {ICategory} from "@/interfaces/category.interface";
import {ISubCategory} from "@/interfaces/subCategory.interface";

export async function createPost(body: {
  authorId: string;
  published?: boolean;
  title?: string;
  content?: string;
  category?: ICategory;
  subCategory?: ISubCategory;
  tags?: string[];
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error();

  const result = await response.json();

  if (result.error) throw new Error(result.message);

  return result;
}

export async function getUserPosts(authorId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/post/get-user-posts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorId,
      }),
    }
  );

  if (!response.ok) throw new Error();

  const result = await response.json();

  if (result.error) throw new Error(result.message);

  return result;
}

export async function getPost(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/get`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });

  if (!response.ok) throw new Error();

  const result = await response.json();

  console.log(result);

  if (result.error) throw new Error(result.message);

  return result.message;
}

export async function updatePost(
  id: string,
  updatePost: {
    title?: string;
    content?: string;
    published?: boolean;
    tags?: string[] | [];
    category?: {id: string; name: string};
    subCategory?: {id: string; name: string};
  }
) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      updatePost,
    }),
  });

  if (!response.ok) throw new Error();

  const result = await response.json();

  if (result.error) throw new Error(result.message);

  return result;
}

export async function deletePost(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });

  if (!response.ok) throw new Error();

  const result = await response.json();

  if (result.error) throw new Error(result.message);

  revalidatePath("/my-posts");
}

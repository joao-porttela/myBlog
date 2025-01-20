"use server";

import {revalidatePath} from "next/cache";

export async function createCategory(name: string, authorId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/category/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      authorId,
    }),
  });

  if (!response.ok) throw new Error();

  const result = await response.json();

  if (result.error) throw new Error();

  revalidatePath("/my-posts");

  return result.message;
}

export async function getAuthorCategories(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/category/get-author-categories`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorId: id,
      }),
    }
  );

  if (!response.ok) throw new Error();

  const result = await response.json();

  if (result.error) throw new Error(result.message);

  return result;
}

export async function getCategory(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/category/get-category`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    }
  );

  const result = await response.json();

  return result.message;
}

export async function updateCategory(id: string, category: {name: string}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/category/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      category,
    }),
  });

  if (!response.ok) throw new Error();

  const result = await response.json();

  if (result.error) throw new Error(result.message);

  revalidatePath("/my-posts");
}

export async function deleteCategory(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/category/delete`, {
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

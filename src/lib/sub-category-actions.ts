"use server";

import {revalidatePath} from "next/cache";

export async function createSubCategory(
  name: string,
  authorId: string,
  categoryId: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/sub-category/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        authorId,
        categoryId,
      }),
    }
  );

  if (!response.ok) throw new Error();

  const result = await response.json();

  if (result.error) throw new Error(result.message);

  revalidatePath("/my-posts/category");

  return result.message;
}

export async function getAuthorSubCathegories(authorId: string, categoryId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/sub-category/get-author-sub-categories`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorId,
        categoryId,
      }),
    }
  );

  if (!response.ok) throw new Error();

  const result = await response.json();

  if (result.error) throw new Error();

  return result;
}

export async function getSubCategory(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/sub-category/get-sub-category`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
    }
  );

  const result = await response.json();

  return result.message;
}

export async function updateSubCategory(id: string, subCategory: {name: string}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/sub-category/update`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        subCategory,
      }),
    }
  );

  if (!response.ok) throw new Error();

  const result = await response.json();

  if (result.error) throw new Error(result.message);

  revalidatePath("/my-posts/category");
}

export async function deleteSubCategory(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/sub-category/delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    }
  );

  if (!response.ok) throw new Error();

  const result = await response.json();

  if (result.error) throw new Error(result.message);

  revalidatePath("/my-posts/category");
}

"use server";

import {IResponse} from "@/interfaces/response.type";

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

  const result: IResponse = await response.json();

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

  const result: IResponse = await response.json();

  return result.message;
}

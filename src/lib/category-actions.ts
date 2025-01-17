"use server";

import {IResponse} from "@/interfaces/response.type";

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

  const result: IResponse = await response.json();

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


  const result: IResponse = await response.json();

  return result.message;
}

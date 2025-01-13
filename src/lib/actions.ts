"use server";

export async function createPost(body: {
  authorId: string;
  published: boolean;
  title: string;
  content?: string;
  category?: string;
  subCategory?: string;
  tags?: string[];
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/create-post`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) throw new Error();

  const result = await response.json();

  if (result.error) throw new Error(result.message);

  return result;
}

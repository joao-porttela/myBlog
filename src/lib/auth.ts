"use server";

async function authFactory(
  url: string,
  body: {
    username?: string;
    email: string;
    password: string;
  }
) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Something went wrong. Please, try again later.");
  }

  const result = await response.json();

  if (result.error) throw new Error(result.message);

  return result;
}

export async function signUp(values: {
  username: string;
  email: string;
  password: string;
}) {
  return await authFactory("sign-up", {
    username: values.username,
    email: values.email,
    password: values.password,
  });
}

export async function login(values: {email: string; password: string}) {
  return await authFactory("login", {
    email: values.email,
    password: values.password,
  });
}

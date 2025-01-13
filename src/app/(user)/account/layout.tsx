"use client";

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";

type Props = {children: React.ReactNode};

export default function Layout({children}: Props) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("__refresh_token__");

    const verifyToken = async () => {
      if (!token) {
        router.push("/auth/login");
        return;
      }

      try {
        const response = await fetch("/api/auth/verify-token", {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Token validation failed");
        }

        const data = await response.json();
        if (!data.valid) {
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Token validation error:", error);
        router.push("/auth/login");
      }
    };

    verifyToken();
  }, [router]);

  return <div>{children}</div>;
}

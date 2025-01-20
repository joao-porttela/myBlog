"use client";

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";

// Lib Actions
import {verifyToken} from "@/lib/auth";

type Props = {
  children: React.ReactNode;
};

export default function Layout({children}: Props) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("__refresh_token__")!;

    const vToken = async () => {
      if (!token) {
        console.log("NO token");
        router.push("/auth/login");
        return;
      }

      const isValid = verifyToken(token);

      if (!isValid) return router.push("/auth/login");
    };

    vToken();
  }, [router]);

  return <div className="py-4 md:mx-40">{children}</div>;
}

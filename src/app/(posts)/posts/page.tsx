"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";

import {useAuth} from "@/hooks/use-auth";

import {Button} from "@/components/ui/button";

import {Filter} from "lucide-react";

export default function Home() {
  const [isValidToken, setIsValidToken] = useState(false);

  const {token} = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsValidToken(false);
        return;
      }

      try {
        // Call the server-side token validation endpoint
        const response = await fetch("/api/auth/verify-token", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsValidToken(data.valid); // Update state based on the server's response
        } else {
          setIsValidToken(false); // Invalid or expired token
        }
      } catch (error) {
        console.error("Token validation error:", error);
        setIsValidToken(false); // Handle validation errors
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="py-4 mx-4 md:mx-40">
      <div className="flex gap-4 items-center justify-end">
        <Button>
          <Link href={isValidToken ? "/posts/create-post" : "/auth/login"}>
            Create a post
          </Link>
        </Button>

        <Filter
          className="text-primary border-2 border-primary rounded-lg p-2"
          size={40}
        />
      </div>
    </div>
  );
}

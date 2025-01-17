"use client";

// React/Next
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";

// Hooks
import {useAuth} from "@/hooks/use-auth";
import {toast} from "@/hooks/use-toast";

type Props = {children: React.ReactNode};

export default function Layout({children}: Props) {
  const {state} = useAuth(); // Access token from AuthContext
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      if (!state.token) {
        return; // No token available, skip validation
      }

      try {
        // Call the server-side validation endpoint
        const response = await fetch("/api/auth/verify-token", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${state.token}`, // Include the token in the Authorization header
          },
        });

        if (response.ok) {
          console.log("RESPONSE OK");
          const data = await response.json();
          if (data.valid) {
            // Check token expiration on the server response (optional, if server doesn't handle it)
            const tokenExpiration = new Date(0).setUTCSeconds(data.payload.exp);
            if (tokenExpiration > Date.now()) {
              router.push("/"); // Redirect to the home page if the token is valid
            }
          } else {
            toast({title: "Invalid or expired token"});
            router.push("/auth/login"); // Redirect to the login page
          }
        } else {
          throw new Error("Failed to validate token");
        }
      } catch (error) {
        console.error("Token validation error:", error);
        router.push("/auth/login"); // Redirect to login if validation fails
      }
    };

    verifyToken();
  }, [state.token, router]);

  return <div className="py-16 px-4">{children}</div>;
}

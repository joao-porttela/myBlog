import React, {useEffect, useState} from "react";
import Link from "next/link";

import {Button} from "../ui/button";
import {Filter, Plus, SearchIcon} from "lucide-react";

type ControlPanelProps = {
  categoryId?: string;
  subCategoryId?: string;
};

export default function PostControlPanel({categoryId, subCategoryId}: ControlPanelProps) {
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("__refresh_token__");

    const vToken = async () => {
      if (!token) {
        setIsValidToken(false);
        return;
      }

      try {
        const response = await fetch("/api/auth/verify-token", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsValidToken(data.valid);
        } else {
          setIsValidToken(false);
        }
      } catch (error) {
        console.error("Token validation error:", error);
        setIsValidToken(false);
      }
    };

    vToken();
  }, []);

  return (
    <>
      <Button variant="secondary" size="icon">
        <SearchIcon />
      </Button>

      <Button size="icon">
        <Link
          href={
            isValidToken
              ? `/my-posts/create-post${
                  categoryId
                    ? `?categoryId=${categoryId}&${
                        subCategoryId ? `subCategoryId=${subCategoryId}` : ""
                      }`
                    : ""
                }`
              : "/auth/login"
          }
        >
          <Plus />
        </Link>
      </Button>

      <Button size="icon" variant="outline" className="flex items-center gap-2">
        <Filter size={20} />
      </Button>
    </>
  );
}

import React from "react";
import {useRouter} from "next/navigation";

import {Button} from "../ui/button";
import {ChevronLeftIcon} from "lucide-react";

interface ReturnButtonProps {
  categoryId?: string;
}

export default function ReturnButton({categoryId}: ReturnButtonProps) {
  const router = useRouter();

  const url = categoryId ? `/my-posts/category/${categoryId}` : "/my-posts/";

  return (
    <Button size="sm" className="mb-4" onClick={() => router.push(url)}>
      <ChevronLeftIcon />
    </Button>
  );
}

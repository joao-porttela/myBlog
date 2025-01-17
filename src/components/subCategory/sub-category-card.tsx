import React from "react";
import Link from "next/link";

// Shadcn UI Components
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

import {ISubCategory} from "@/interfaces/subCategory.interface";

interface SubCategoryCardProps {
  subCategory: ISubCategory;
}

export default function SubCategoryCard({subCategory}: SubCategoryCardProps) {
  return (
    <Card className="hover:shadow-lg dark:hover:shadow-slate-800 transition-shadow duration-200">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-bold">
          <Button className="p-0" variant="link">
            <Link href={`/my-posts/sub-category/${subCategory.id}`}>
              {subCategory.name}
            </Link>
          </Button>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

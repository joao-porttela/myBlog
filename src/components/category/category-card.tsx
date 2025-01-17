import React from "react";
import Link from "next/link";

// Shadcn UI Components
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

import {ICategory} from "@/interfaces/category.interface";

interface CategoryCardProps {
  category: ICategory;
}

export default function CategoryCard({category}: CategoryCardProps) {
  return (
    <Card className="hover:shadow-lg dark:hover:shadow-slate-800 transition-shadow duration-200">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-bold">
          <Button className="p-0" variant="link">
            <Link href={`/my-posts/category/${category.id}`}>{category.name}</Link>
          </Button>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
